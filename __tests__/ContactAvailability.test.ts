/** Background checks are advisory; only a current, confirmed conflict blocks registration. */
import { act, renderHook } from '@testing-library/react-native';
import { checkContactAvailability } from '@/src/features/auth/api';
import {
  canSubmitRegistration,
  contactAvailabilityError,
  type ContactCheck,
} from '@/src/features/auth/contactAvailability';
import { useContactAvailability } from '@/src/features/auth/hooks/useContactAvailability';

jest.mock('@/src/features/auth/api', () => ({
  checkContactAvailability: jest.fn(),
}));

const email = 'ada@example.com';
const values = { email, phone: '' };

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((complete) => {
    resolve = complete;
  });
  return { promise, resolve };
}

describe('registration submit availability rules', () => {
  it('allows a valid form with no background response', () => {
    expect(canSubmitRegistration(true, false, values, {})).toBe(true);
  });

  it.each<ContactCheck['status']>(['checking', 'unknown', 'available'])(
    'allows submission while availability is %s',
    (status) => {
      expect(
        canSubmitRegistration(true, false, values, {
          email: { value: email, status },
        }),
      ).toBe(true);
    },
  );

  it('blocks a confirmed conflict only for the current contact value', () => {
    const checks = { email: { value: email, status: 'unavailable' as const } };
    expect(canSubmitRegistration(true, false, values, checks)).toBe(false);
    expect(
      canSubmitRegistration(
        true,
        false,
        { ...values, email: 'other@example.com' },
        checks,
      ),
    ).toBe(true);
  });

  it('allows a buyer to remove a conflicting optional contact and keep the other', () => {
    expect(
      canSubmitRegistration(
        true,
        false,
        { email, phone: '' },
        {
          phone: { value: '+390000000001', status: 'unavailable' },
        },
      ),
    ).toBe(true);
  });

  it('still blocks invalid forms and duplicate submissions', () => {
    expect(canSubmitRegistration(false, false, values, {})).toBe(false);
    expect(canSubmitRegistration(true, true, values, {})).toBe(false);
  });
});

describe('useContactAvailability', () => {
  beforeEach(() => jest.resetAllMocks());

  it('leaves submission enabled while a blur request is unanswered', async () => {
    const request = deferred<{ available: boolean }>();
    jest.mocked(checkContactAvailability).mockReturnValue(request.promise);
    const { result } = renderHook(() => useContactAvailability());
    let pending!: Promise<void>;

    act(() => {
      pending = result.current.check('email', email);
    });

    expect(result.current.checks.email?.status).toBe('checking');
    expect(
      canSubmitRegistration(true, false, values, result.current.checks),
    ).toBe(true);
    await act(async () => {
      request.resolve({ available: true });
      await pending;
    });
    expect(result.current.checks.email?.status).toBe('available');
  });

  it('keeps submission enabled after a failed availability request', async () => {
    jest
      .mocked(checkContactAvailability)
      .mockRejectedValue(new Error('Network unavailable'));
    const { result } = renderHook(() => useContactAvailability());

    await act(async () => {
      await result.current.check('email', email);
    });

    expect(result.current.checks.email?.status).toBe('unknown');
    expect(
      canSubmitRegistration(true, false, values, result.current.checks),
    ).toBe(true);
  });

  it('does not mistake a malformed response for an occupied contact', async () => {
    jest
      .mocked(checkContactAvailability)
      .mockResolvedValue({} as { available: boolean });
    const { result } = renderHook(() => useContactAvailability());

    await act(async () => {
      await result.current.check('email', email);
    });

    expect(result.current.checks.email?.status).toBe('unknown');
    expect(result.current.hasConflict(values)).toBe(false);
  });

  it('shows a conflict only after an explicit unavailable response', async () => {
    jest
      .mocked(checkContactAvailability)
      .mockResolvedValue({ available: false });
    const { result } = renderHook(() => useContactAvailability());

    await act(async () => {
      await result.current.check('email', email);
    });

    expect(
      canSubmitRegistration(true, false, values, result.current.checks),
    ).toBe(false);
    expect(
      contactAvailabilityError('email', email, result.current.checks),
    ).toContain('Увійдіть');
  });

  it('discards an old response when the user changes the field', async () => {
    const request = deferred<{ available: boolean }>();
    jest.mocked(checkContactAvailability).mockReturnValue(request.promise);
    const { result } = renderHook(() => useContactAvailability());
    let pending!: Promise<void>;
    act(() => {
      pending = result.current.check('email', email);
    });

    act(() => {
      result.current.clear('email');
    });
    await act(async () => {
      request.resolve({ available: false });
      await pending;
    });

    expect(result.current.checks.email).toBeUndefined();
  });

  it('ignores a pending blur response after final submission reports a conflict', async () => {
    const request = deferred<{ available: boolean }>();
    jest.mocked(checkContactAvailability).mockReturnValue(request.promise);
    const { result } = renderHook(() => useContactAvailability());
    let pending!: Promise<void>;
    act(() => {
      pending = result.current.check('email', email);
    });

    act(() => {
      result.current.reportConflicts(values, ['email']);
    });
    await act(async () => {
      request.resolve({ available: true });
      await pending;
    });

    expect(result.current.checks.email?.status).toBe('unavailable');
    expect(result.current.hasConflict(values)).toBe(true);
  });

  it('normalizes contacts and skips repeat requests for unchanged values', async () => {
    jest
      .mocked(checkContactAvailability)
      .mockResolvedValue({ available: true });
    const { result } = renderHook(() => useContactAvailability());

    await act(async () => {
      await result.current.check('email', ' ADA@EXAMPLE.COM ');
    });
    await act(async () => {
      await result.current.check('email', email);
    });

    expect(checkContactAvailability).toHaveBeenCalledTimes(1);
    expect(checkContactAvailability).toHaveBeenCalledWith(
      'email',
      email,
      expect.anything(),
    );
  });

  it('does not send requests for empty or malformed contacts', async () => {
    const { result } = renderHook(() => useContactAvailability());

    await act(async () => {
      await result.current.check('phone', '');
      await result.current.check('email', 'invalid-email');
    });

    expect(checkContactAvailability).not.toHaveBeenCalled();
  });
});

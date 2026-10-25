import { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { checkContactAvailability } from '@/src/features/auth/api';
import { isE164Phone } from '@/src/utils/phone';
import {
  contactAvailabilityError,
  normalizeRegistrationContact,
  type ContactChannel,
  type ContactChecks,
  type RegistrationContacts,
} from '../contactAvailability';

/** Blur checks never hold up submission; generation IDs discard stale responses after edits. */
export function useContactAvailability() {
  const [checks, setChecks] = useState<ContactChecks>({});
  const current = useRef<ContactChecks>({});
  const requests = useRef<Partial<Record<ContactChannel, AbortController>>>({});
  const versions = useRef({ email: 0, phone: 0 });

  const commit = useCallback((next: ContactChecks) => {
    current.current = next;
    setChecks(next);
  }, []);

  const cancel = useCallback((channel: ContactChannel) => {
    versions.current[channel] += 1;
    requests.current[channel]?.abort();
    delete requests.current[channel];
  }, []);

  useEffect(
    () => () => {
      // Abort without updating React state when the registration screen unmounts.
      for (const channel of ['email', 'phone'] as const) {
        versions.current[channel] += 1;
        requests.current[channel]?.abort();
      }
    },
    [],
  );

  const clear = useCallback(
    (channel: ContactChannel) => {
      cancel(channel);
      commit({ ...current.current, [channel]: undefined });
    },
    [cancel, commit],
  );

  const cancelPending = useCallback(() => {
    const next = { ...current.current };
    for (const channel of ['email', 'phone'] as const) {
      cancel(channel);
      const previous = next[channel];
      if (previous?.status === 'checking')
        next[channel] = { ...previous, status: 'unknown' };
    }
    commit(next);
  }, [cancel, commit]);

  const check = useCallback(
    async (channel: ContactChannel, raw?: string | null) => {
      const value = normalizeRegistrationContact(channel, raw);
      const valid =
        value &&
        (channel === 'email'
          ? Yup.string().email().isValidSync(value)
          : isE164Phone(value));
      if (!valid) {
        clear(channel);
        return;
      }
      const previous = current.current[channel];
      if (previous?.value === value && previous.status !== 'unknown') return;
      cancel(channel);
      const version = versions.current[channel];
      const controller = new AbortController();
      requests.current[channel] = controller;
      commit({ ...current.current, [channel]: { value, status: 'checking' } });
      try {
        const result = await checkContactAvailability(
          channel,
          value,
          controller.signal,
        );
        if (versions.current[channel] !== version) return;
        if (typeof result.available !== 'boolean')
          throw new Error('Invalid availability response');
        commit({
          ...current.current,
          [channel]: {
            value,
            status: result.available ? 'available' : 'unavailable',
          },
        });
      } catch {
        if (versions.current[channel] !== version) return;
        // A timeout or network failure leaves availability unknown; final submission still works.
        commit({ ...current.current, [channel]: { value, status: 'unknown' } });
      }
    },
    [cancel, clear, commit],
  );

  const reportConflicts = useCallback(
    (values: RegistrationContacts, channels: ContactChannel[]) => {
      cancelPending();
      const next = { ...current.current };
      for (const channel of channels) {
        next[channel] = {
          value: normalizeRegistrationContact(channel, values[channel]),
          status: 'unavailable',
        };
      }
      commit(next);
    },
    [cancelPending, commit],
  );

  const hasConflict = (values: RegistrationContacts) =>
    !!contactAvailabilityError('email', values.email, current.current) ||
    !!contactAvailabilityError('phone', values.phone, current.current);

  return { checks, check, clear, cancelPending, reportConflicts, hasConflict };
}

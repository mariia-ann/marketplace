/** Checks in-memory session replacement and complete cleanup on sign-out. */
import { useAuthStore } from '@/src/state/useAuthStore';
import type { RegistrationState } from '@/src/features/auth/registration';

const pendingState: RegistrationState = {
  accountStatus: 'PENDING_VERIFICATION',
  accountType: 'buyer',
  contacts: { email: 'PENDING', phone: 'MISSING' },
  contactHints: { email: 'a***@example.com', phone: null },
  requiredContactChannels: ['email'],
  removedContactChannels: [],
  nextAction: 'VERIFY_EMAIL',
  expiresAt: '2026-10-25T12:00:00.000Z',
};

// Unsigned fixtures are only decoded for display/session metadata in the mobile store.
const tokenFor = (userId: string, exp: number) =>
  `header.${btoa(JSON.stringify({ userId, exp }))}.signature`;

describe('in-memory mobile auth store', () => {
  beforeEach(() => useAuthStore.getState().onSignOut());
  afterEach(() => useAuthStore.getState().onSignOut());

  it('replaces the access token, user ID, and expiry after token rotation', () => {
    useAuthStore
      .getState()
      .applyAccessToken(tokenFor('old-user', 1_800_000_000));
    const rotatedToken = tokenFor('current-user', 1_800_000_900);

    useAuthStore.getState().applyAccessToken(rotatedToken);

    expect(useAuthStore.getState()).toMatchObject({
      access_token: rotatedToken,
      userId: 'current-user',
      access_token_expireAt: new Date(1_800_000_900_000),
    });
  });

  it('keeps the latest backend registration state for route guards', () => {
    useAuthStore.getState().setRegistrationState(pendingState);
    expect(useAuthStore.getState().registrationState).toEqual(pendingState);

    const activeState: RegistrationState = {
      ...pendingState,
      accountStatus: 'ACTIVE',
      contacts: { email: 'VERIFIED', phone: 'MISSING' },
      nextAction: 'REGISTRATION_COMPLETE',
      expiresAt: null,
    };
    useAuthStore.getState().setRegistrationState(activeState);

    expect(useAuthStore.getState().registrationState).toEqual(activeState);
  });

  it('clears access credentials, registration state, and contact context on sign-out', () => {
    useAuthStore.getState().applyAccessToken(tokenFor('user-1', 1_800_000_000));
    useAuthStore.getState().setRegistrationState(pendingState);
    useAuthStore.getState().setVerification({
      email: 'a***@example.com',
      phone: null,
      isEmailValidated: false,
      isPhoneValidated: false,
      source: 'signup',
    });

    useAuthStore.getState().onSignOut();

    expect(useAuthStore.getState()).toMatchObject({
      access_token: null,
      access_token_expireAt: null,
      userId: null,
      verification: null,
      registrationState: null,
    });
  });
});

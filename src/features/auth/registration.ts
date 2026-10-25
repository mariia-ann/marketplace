/** Shared API state distinguishes lost/missing contacts from candidates awaiting OTP. */
export type ContactState = 'MISSING' | 'PENDING' | 'VERIFIED';
export type RegistrationAction =
  | 'VERIFY_EMAIL'
  | 'VERIFY_PHONE'
  | 'ADD_CONTACT'
  | 'REMOVE_UNVERIFIED_CONTACT'
  | 'REGISTRATION_COMPLETE'
  | 'REGISTRATION_EXPIRED';

/** Backend state drives registration navigation, requirements, and the inactivity message. */
export type RegistrationState = {
  accountStatus: 'PENDING_VERIFICATION' | 'ACTIVE' | 'EXPIRED';
  accountType: 'buyer' | 'seller';
  contacts: { email: ContactState; phone: ContactState };
  contactHints: { email: string | null; phone: string | null };
  requiredContactChannels: ('email' | 'phone')[];
  removedContactChannels: ('email' | 'phone')[];
  nextAction: RegistrationAction;
  expiresAt: string | null;
};

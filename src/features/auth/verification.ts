import {
  getUserById,
  LoginDto,
  LoginResponse,
  type getUserByIdRepsonse,
} from '@/src/features/auth/api';
import { normalizeIdentifier } from '@/src/features/auth/schemas/login.schema';
import { normalizePhoneToE164 } from '@/src/utils/phone';

export type VerificationMethod = 'sms' | 'email';

export type VerificationContext = {
  email: string | null;
  phone: string | null;
  isEmailValidated: boolean;
  isPhoneValidated: boolean;
  source: 'signup' | 'login';
};

export function getAvailableVerificationMethods(
  context: VerificationContext | null,
): VerificationMethod[] {
  if (!context) return [];

  const methods: VerificationMethod[] = [];
  if (context.phone && !context.isPhoneValidated) methods.push('sms');
  if (context.email && !context.isEmailValidated) methods.push('email');
  return methods;
}

export function hasPendingVerification(context: VerificationContext | null) {
  return getAvailableVerificationMethods(context).length > 0;
}

export function getDefaultVerificationMethod(
  context: VerificationContext | null,
): VerificationMethod | null {
  return getAvailableVerificationMethods(context)[0] ?? null;
}

export function buildSignupVerificationContext(args: {
  email: string;
  phone: string;
}): VerificationContext {
  return {
    email: args.email.trim().toLowerCase(),
    phone: normalizePhoneToE164(args.phone),
    isEmailValidated: false,
    isPhoneValidated: false,
    source: 'signup',
  };
}

export function buildUserVerificationContext(
  user: Pick<
    getUserByIdRepsonse,
    'email' | 'phone' | 'isEmailValidated' | 'isPhoneValidated'
  >,
  source: VerificationContext['source'] = 'login',
): VerificationContext {
  return {
    email: user.email,
    phone: normalizePhoneToE164(user.phone),
    isEmailValidated: !!user.isEmailValidated,
    isPhoneValidated: user.isPhoneValidated,
    source,
  };
}

export function mergeUserIntoVerificationContext(
  context: VerificationContext,
  user: Partial<
    Pick<
      getUserByIdRepsonse,
      'email' | 'phone' | 'isEmailValidated' | 'isPhoneValidated'
    >
  >,
): VerificationContext {
  return {
    ...context,
    email: user.email ?? context.email,
    phone: user.phone ? normalizePhoneToE164(user.phone) : context.phone,
    isEmailValidated: user.isEmailValidated ?? context.isEmailValidated,
    isPhoneValidated: user.isPhoneValidated ?? context.isPhoneValidated,
  };
}

export function markVerificationMethodComplete(
  context: VerificationContext,
  method: VerificationMethod,
): VerificationContext {
  if (method === 'email') {
    return { ...context, isEmailValidated: true };
  }

  return { ...context, isPhoneValidated: true };
}

export async function hydrateVerificationContext(
  context: VerificationContext,
  userId?: string | null,
) {
  if (!userId) return context;

  try {
    const user = await getUserById(userId);
    return mergeUserIntoVerificationContext(context, user);
  } catch (error) {
    console.warn(
      'Unable to hydrate verification context:',
      error instanceof Error ? error.message : String(error),
    );
    return context;
  }
}

export async function buildLoginVerificationContext(
  response: LoginResponse,
  dto: LoginDto,
  userId?: string | null,
) {
  const identifier = normalizeIdentifier(dto.identifier);
  const isEmailLogin = identifier.includes('@');

  const baseContext: VerificationContext = {
    email: isEmailLogin ? identifier : null,
    phone: isEmailLogin ? null : normalizePhoneToE164(identifier),
    isEmailValidated: response.isEmailValidated,
    isPhoneValidated: response.isPhoneValidated,
    source: 'login',
  };

  const shouldHydrate =
    (!baseContext.email && !baseContext.isEmailValidated) ||
    (!baseContext.phone && !baseContext.isPhoneValidated);

  if (!shouldHydrate) return baseContext;

  return hydrateVerificationContext(baseContext, userId);
}

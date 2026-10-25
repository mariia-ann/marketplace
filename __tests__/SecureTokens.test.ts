/** Isolates native secure storage so session persistence can be checked without a device. */
import * as SecureStore from 'expo-secure-store';
import {
  clearRefreshToken,
  getRefreshToken,
  saveRefreshToken,
} from '@/src/features/auth/secureTokens';

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe('mobile refresh-token storage', () => {
  const tokenKey = 'marketplace.refreshToken';

  beforeEach(() => jest.resetAllMocks());

  it('replaces the stored refresh token after rotation using the same key', async () => {
    await saveRefreshToken('original-refresh');
    await saveRefreshToken('rotated-refresh');

    expect(SecureStore.setItemAsync).toHaveBeenNthCalledWith(
      1,
      tokenKey,
      'original-refresh',
    );
    expect(SecureStore.setItemAsync).toHaveBeenNthCalledWith(
      2,
      tokenKey,
      'rotated-refresh',
    );
  });

  it('reads the stored refresh credential when restoring the app', async () => {
    jest.mocked(SecureStore.getItemAsync).mockResolvedValue('saved-refresh');

    await expect(getRefreshToken()).resolves.toBe('saved-refresh');
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith(tokenKey);
  });

  it('returns null when the device has no saved session', async () => {
    jest.mocked(SecureStore.getItemAsync).mockResolvedValue(null);

    await expect(getRefreshToken()).resolves.toBeNull();
  });

  it('removes the saved credential on logout', async () => {
    await clearRefreshToken();

    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(tokenKey);
  });

  it('propagates storage failures so callers cannot assume the session was saved', async () => {
    jest
      .mocked(SecureStore.setItemAsync)
      .mockRejectedValue(new Error('Secure storage unavailable'));

    await expect(saveRefreshToken('refresh-token')).rejects.toThrow(
      'Secure storage unavailable',
    );
  });
});

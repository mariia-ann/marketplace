import { RequireAuth, RestoreGate } from '@/src/features/auth/guards';
import { asyncStoragePersister } from '@/src/lib/persistor';
import { queryClient } from '@/src/lib/queryClient';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function SellerProfilelayout() {
  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <RestoreGate>
          <RequireAuth to='/auth/login'>
            <Stack>
              <Stack.Screen name='index' options={{ headerShown: false }} />
            </Stack>
          </RequireAuth>
        </RestoreGate>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}

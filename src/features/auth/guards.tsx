// src/features/auth/guards.tsx
import { Redirect, Slot } from "expo-router";
import type { Href } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "@/src/state/useAuthStore";

function BlockingSplash() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}

export function RestoreGate({ children }: { children?: React.ReactNode }) {
  const isRestoring = useAuthStore((s) => s.isRestoring);
  if (isRestoring) return <BlockingSplash />;
  return <>{children}</>;
}

type GuardProps = {
  to?: Href;
  children?: React.ReactNode; // ✅ allow wrapping usage
};

/** Allow only authenticated users; otherwise redirect to login */
export function RequireAuth({ to = "/auth/login", children }: GuardProps) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Redirect href={to} />;

  // If used as a layout, render nested routes via Slot; if wrapped, render children.
  return children ? <>{children}</> : <Slot />;
}

/** Allow only guests; otherwise redirect to tabs/home */
export function RequireGuest({ to = "/(tabs)", children }: GuardProps) {
  const token = useAuthStore((s) => s.token);
  if (token) return <Redirect href={to} />;

  return children ? <>{children}</> : <Slot />;
}

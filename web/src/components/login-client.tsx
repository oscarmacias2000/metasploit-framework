'use client';

import { useState } from 'react';
import { SplashScreen } from './splash-screen';
import { LoginScreen } from './login-screen';

// Orquesta el flujo [SplashScreen] -> [LoginScreen] del spec.
export function LoginClient() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return <LoginScreen />;
}

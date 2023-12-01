'use client';

import theme from '@/theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as Provider } from '@mui/material/styles';
import * as React from 'react';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <Provider theme={theme}>
        <CssBaseline />
        {children}
      </Provider>
    </NextAppDirEmotionCacheProvider>
  );
}
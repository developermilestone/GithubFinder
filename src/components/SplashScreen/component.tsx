"use client";
import { Box, LinearProgress, styled } from '@mui/material';
import type { FC } from 'react';
import { Logo } from '..';

const SplashScreenWrapper = styled(Box)({
    alignItems: 'center',
    backgroundColor: 'background.paper',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    left: 0,
    p: 3,
    position: 'fixed',
    top: 0,
    width: '100vw',
    zIndex: 1400,
});

export const SplashScreen: FC = () => (
    <SplashScreenWrapper>
        <Logo clickable={false} />
        <Box sx={{ width: '100%' }}>
         <LinearProgress />
        </Box>
    </SplashScreenWrapper>
);

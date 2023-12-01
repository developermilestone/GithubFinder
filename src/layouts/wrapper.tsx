"use client";
import StoreProvider from "@/providers/StoreProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import '@/theme/globals.css';
import { type FC, type ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}

export const LayoutWrapper: FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  
  return (
    <StoreProvider>
      <ThemeProvider>
          {children}
      </ThemeProvider>
    </StoreProvider>
  )
};

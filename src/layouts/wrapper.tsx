"use client";
import { SplashScreen } from "@/components";
import { paths } from "@/configs/paths";
import '@/i18n';
import StoreProvider from "@/providers/StoreProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import '@/theme/globals.css';
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect, type FC, type ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}

export const LayoutWrapper: FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  const router = useRouter();
  const { user, isLoading } = useUser();
  
    useEffect(() => {
      if(!isLoading && !user){
          window.location.replace(paths.api.auth.login);
      }
  }, [router, isLoading]);

  return (  
    <StoreProvider>
      <ThemeProvider>
          {(!user || isLoading) ? <SplashScreen /> : children}
      </ThemeProvider>
    </StoreProvider>
  )
};

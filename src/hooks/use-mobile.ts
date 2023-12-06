import { Theme, useMediaQuery } from "@mui/material";

export default function useMobile() {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
}

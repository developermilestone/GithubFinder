"use client";

import { globalConfig } from '@/configs';
import { paths } from '@/configs/paths';
import { menuToggle } from '@/store/slices/settingsSlice';
import { useDispatch, useSelector } from '@/store/store';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Link, Stack, SvgIcon, Typography, styled } from '@mui/material';
import { LanguageMenuItem } from '../LanguageMenuItem';
import { UserMenuItem } from '../UserMenuItem';

const NavBarStructure = styled('header')({
  color: 'darkslategray',
  padding: 8,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  backdropFilter: 'blur(6px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  position: 'fixed',
  top: 0,
  height: '3rem',
  zIndex: '1100',
  borderBottomColor: '#F2F4F7',
  borderBottomStyle: 'solid',
  borderBottomWidth: 1,
});

export default function NavBar() {

  const { menuOpened } = useSelector(state => state.settings);
  const dispatch = useDispatch();

  return (
    <NavBarStructure>
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
      >
       
        <Box
          component={Link}
          href={paths.main}
          sx={{
            display: 'flex',
            p: '4px',
            textDecoration: 'none'
          }}
        >
          <SvgIcon >
            <FindInPageIcon />
          </SvgIcon>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              color="inherit"
              variant="h6"
            >
              {globalConfig.appName}
            </Typography>
          </Box>
        </Box>
       
        {!menuOpened && (
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <Button variant="text" sx={{ color: '#6C737F', fontSize: 12, fontWeight: 700, lineHeight: 1.66, textTransform: 'uppercase', }} onClick={() => dispatch(menuToggle())}>
              <SvgIcon >
                <MenuIcon />
              </SvgIcon>
            </Button>
          </Box>
        )}
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        spacing={1}
      >
        <LanguageMenuItem />
        <UserMenuItem />
      </Stack>

    </NavBarStructure>
  )
}

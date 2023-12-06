"use client";
import { paths } from '@/configs/paths';
import { useUser } from '@auth0/nextjs-auth0/client';
import Logout from '@mui/icons-material/Logout';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

export default function UserMenuItem() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useUser();
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={user?.picture!} />
          </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
        <MenuItem onClick={() => window.location.replace(paths.api.auth.logout)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('menu__logout')}
        </MenuItem>
      </Menu>
    </>
  );
}
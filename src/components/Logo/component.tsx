import { globalConfig } from '@/configs';
import { paths } from '@/configs/paths';
import { useTheme } from '@emotion/react';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { Box, Stack, SvgIcon, Typography } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  clickable?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const LogoComponent: FC<Props> = ({clickable = true, size = 'small'}) => {

  const sizeMap = {
    small: {icon: '1.8rem', text: '1rem'},
    medium: {icon: '3.2rem', text: '1.6rem'},
    large: {icon: '6rem', text: '6rem'},
  }

  return (
    <Stack
    alignItems="center"
    direction="row"

  >
    <Box
      sx={{
        display: 'flex',
        p: '4px',
        width: sizeMap[size].icon,
        height: sizeMap[size].icon,
      }}
      component={clickable ? Link : 'div'}
      href={paths.main}
    >
      <SvgIcon sx={{width: '100%', height: '100%'}}>
        <FindInPageIcon />
      </SvgIcon>
    </Box>
    <Stack
      alignItems="center"
      direction="row"
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          color="inherit"
          variant="h6"
          sx={{
            fontSize: sizeMap[size].text,
          }}
        >
          {globalConfig.appName}
        </Typography>
      </Box>
    </Stack>
  </Stack>
  )
}

export default LogoComponent
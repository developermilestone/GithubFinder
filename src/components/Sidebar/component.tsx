"use client"
import { menu } from '@/configs/paths';
import { useMobile } from '@/hooks';
import { menuToggle } from '@/store/slices/settingsSlice';
import { useDispatch, useSelector } from '@/store/store';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Sidebar() {
    const { menuOpened } = useSelector(state => state.settings);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();
    const isMobile = useMobile();

    const list = () => (
        <Box
            sx={{ width: '16rem', height: 'calc(100% - 3rem)', top: '3rem' }}
            role="presentation"
        >
            <Stack justifyContent="space-between">
                <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
                    <Button variant="text" sx={{ color: '#6C737F', fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.66, textTransform: 'uppercase', }} onClick={() => dispatch(menuToggle())}>
                        <CloseIcon />
                    </Button>
                </Box>
                <Stack alignItems="center" justifyContent="space-between" direction="row" spacing={2}>

                    <Box
                        component="p"
                        sx={{
                            color: '#6C737F',
                            fontSize: 12,
                            fontWeight: 700,
                            lineHeight: 1.66,
                            mb: 2,
                            mr: 2,
                            textTransform: 'uppercase',
                        }}
                    >
                        Menu
                    </Box>

                </Stack>
                <Divider sx={{ mb: 3, mt: 1 }} />
            </Stack>
            <List>
                {menu.map(({session, path}, index) => (
                    <Box
                        key={`menu-${session}-${index}`}
                        onClick={() => router.push(path)}
                        sx={{
                            display: 'flex',
                            p: '4px',
                            textDecoration: 'none',
                        }}
                    >
                        <ListItem disablePadding>
                            <ListItemButton  selected={path === pathname} disabled={path === pathname} >
                               <ListItemText primary={t(`menu__${session}`)} />
                            </ListItemButton>
                        </ListItem>
                    </Box>

                ))}
            </List>
        </Box>
    );

    return (

        <Drawer
            open={menuOpened}
            variant={isMobile ? "temporary" : "persistent"}
            onClose={() => dispatch(menuToggle())}
            sx={{ '& .MuiDrawer-paper': { height: isMobile ? '100%' : 'calc(100% - 3rem)' , top: isMobile ? '0' : '3rem', p: 3, backgroundColor: '#fafafa'} }}
        >
            {list()}
        </Drawer>
    );
}
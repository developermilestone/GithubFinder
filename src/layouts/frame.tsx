'use client';
import { NavBar } from '@/components';
import { Sidebar } from '@/components/Sidebar';
import { useMobile } from '@/hooks';

import { useFetchBulkRepositoriesQuery } from '@/store/services/repositories';
import { addListFavorite } from '@/store/slices/favoritesSlice';
import { useDispatch, useSelector } from '@/store/store';
import { Box, Stack, styled } from '@mui/material';
import { FC, use, useEffect } from 'react';
const MainWrapper = styled(Stack)({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    padding: 3,
    width: '100%',
    marginTop: '3rem',
})

interface Props {
    children: React.ReactNode
}

const Frame: FC<Props> = ({ children }) => {
    const { menuOpened } = useSelector(state => state.settings);
    const isMobile = useMobile();
    const { data } = useFetchBulkRepositoriesQuery('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (data) {
            dispatch(addListFavorite(data));
        }

    }, [data]);
    return (
        <Stack direction="column" justifyContent="top">

            <NavBar />
            <MainWrapper>
                <Sidebar />
                <Box sx={{ width: '100%', minHeight: 'calc(100vh - 3.5rem)', ml: (menuOpened && !isMobile) ? '19rem' : '0', p: '1.5rem' }}>
                    {children}
                </Box>
            </MainWrapper>
        </Stack>
    )
}

export default Frame
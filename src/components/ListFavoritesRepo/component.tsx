"use client";
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RepoCard } from '..';

type Language = {
    name: string;
    color?: string;
};
interface Repository {
    name?: string;
    url?: string;
    rating?: number;
    id?: string;
    description?: string;
    languages?: Language[];
}

interface Props {
    favorites: Repository[];
    favoritesHandler: (isFavorite: boolean, repositoryInfo: Repository) => void;
}

const ListFavoriteReposComponent: React.FC<Props> = ({ favorites, favoritesHandler }) => {
    const { t } = useTranslation();

    return (
        <Box component="section">
            {favorites.length === 0 && <Typography variant="h6" component="h6">{t('favorites_page__empty')}</Typography>}
            {favorites.map((repo) => (
                <RepoCard key={repo.url} repositoryInfo={repo} isFavorite={true} handler={favoritesHandler} />
            ))}
        </Box>
    );
};

export default ListFavoriteReposComponent;

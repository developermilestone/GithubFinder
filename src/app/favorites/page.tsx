"use client";
import { ListFavoriteReposContainer } from '@/components/ListFavoritesRepo';
import { Seo } from '@/components/SeoHandler';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';


export default function FavotitePage() {

  const { t } = useTranslation();

  return (
    <>
      <Seo title="Favorites" />
      <Stack direction="column" spacing={3}>

        <Typography variant="h3" >{t('favorites_page__title')}</Typography>

        <ListFavoriteReposContainer />
      </Stack>
    </>
  )
}

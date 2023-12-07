
"use client";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { Box, Button, Card, CardContent, Rating, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { RatingModal } from '../RatingModal';
import { RepoCardProps } from '@/types';


const RepoCard: React.FC<RepoCardProps> = ({ repositoryInfo, isFavorite, handler }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { name, url, rating, description } = repositoryInfo;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddToFavorites = (newRating: number) => {
    handler(false, { ...repositoryInfo, rating: newRating });
  };

  return (
    <Card variant="outlined" style={{ marginBottom: 10 }}>
      <CardContent>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Stack direction="column" justifyContent="space-between" spacing={1}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h6" component="h2">
                <Link href={url ?? ''} target="_blank" rel="noopener noreferrer">{name}</Link>
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {description}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} >
              {repositoryInfo.languages && repositoryInfo.languages.map((language, idx) => {
                return (
                  <Box key={`${idx}-${language.name.toLowerCase().replace(' ', '-')}`} sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                    <Box sx={{ width: '0.5rem', height: '0.5rem', backgroundColor: language?.color ?? '#ccc', mr: '0.2rem', borderRadius: '50%' }} />
                    <Typography variant='subtitle2' color="textSecondary">
                      {language?.name}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
          <Stack direction="column" spacing={2} alignItems="center">
            {isFavorite && (
              <>
                <Rating name="read-only" value={rating ?? 0} readOnly />
              </>
            )}
            <Button sx={{ minWidth: '6rem' }} onClick={() => isFavorite ? handler(isFavorite, repositoryInfo) : handleOpenModal()}>
              {isFavorite ? <BookmarkRemoveIcon fontSize='large' /> : <BookmarkAddIcon fontSize='large' />}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
      {!isFavorite && (<RatingModal open={openModal} onClose={handleCloseModal} onSubmit={handleAddToFavorites} />)}
    </Card>
  );
};

export default RepoCard;

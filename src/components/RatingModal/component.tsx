"use client";
import { RatingModalProps } from '@/types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RatingModal: React.FC<RatingModalProps> = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const { t } = useTranslation();

  const handleSubmit = () => {
    onSubmit(rating);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('ratingModal__title')}</DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <Rating
          name="rating-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue ?? 0);
          }}
        />
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onClose} color="primary">
          {t('ratingModal__cancel')}
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {t('ratingModal__add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RatingModal;

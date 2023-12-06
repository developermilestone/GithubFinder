"use client";
import { useAddFavoriteRepositoryMutation, useRemoveFavoriteRepositoryMutation } from '@/store/services/repositories';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import { RootState } from '@/store/store'; // Adjust the import based on your actual file structure
import { Repository } from '@/types'; // Adjust the import based on your actual file structure
import { useDispatch, useSelector } from 'react-redux';
import SearchBarComponent from './component';

const SearchBarContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [addFavoriteRepository] = useAddFavoriteRepositoryMutation();
  const [removeFavoriteRepository] = useRemoveFavoriteRepositoryMutation();
  const favorites = useSelector((state: RootState) => state.favorites);

  const handleFavorite = (isFavorite: boolean, repo: Repository) => {

    if (isFavorite) {
      removeFavoriteRepository(repo)
        .unwrap()
        .then(() => {
          dispatch(removeFavorite(repo));
        }).catch((error: Error) => {
          console.error(error);
        });
    } else {
      addFavoriteRepository(repo)
        .unwrap()
        .then(() => {
          dispatch(addFavorite(repo));
        }).catch((error: Error) => {
          console.error(error);
        });
    }
  }

  return (
    <SearchBarComponent favorites={favorites} favoritesHandler={handleFavorite} />
  );
};

export default SearchBarContainer;
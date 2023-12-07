import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import ListFavoriteReposComponent from './component';
import { Repository } from '@/types';


const ListFavoriteReposContainer = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const favorites: Repository[] = useSelector((state: RootState) => state.favorites);

  const handleFavorite = (isFavorite: boolean, repo: Repository) => {
    if (isFavorite) {
      dispatch(removeFavorite(repo));
    } else {
      dispatch(addFavorite(repo));
    }
  };

  return (
    <ListFavoriteReposComponent favorites={favorites} favoritesHandler={handleFavorite} />
  );
};

export default ListFavoriteReposContainer;

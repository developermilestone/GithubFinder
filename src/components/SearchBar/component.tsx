import { useMobile } from '@/hooks';
import { useFetchRepositoriesQuery } from '@/store/services/repositories';
import { useSelector } from '@/store/store';
import { Box, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RepoCard } from '..';
import { InfiniteScroll } from '../InfiniteScroll';
import { Repository } from '@/types';


interface SearchBarComponentProps {
    favorites: any[];
    favoritesHandler: (isFavorite: boolean, repo: Repository) => void;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({ favorites, favoritesHandler }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [listRepositories, setListRepositories] = useState<any[]>([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [nextPageHash, setNextPageHash] = useState(null);
    const { data, isLoading, isFetching } = useFetchRepositoriesQuery(
        { searchTerm: debouncedSearchTerm, first: 10, after: nextPageHash },
        { skip: debouncedSearchTerm.trim().length === 0 }
    );
    const { menuOpened } = useSelector(state => state.settings);
    const isMobile = useMobile();
    const { t } = useTranslation();
    useEffect(() => {
        if (data?.data) {
            setListRepositories(prevRepos => [...prevRepos, ...data.data]);
        }
    }, [data]);

    const debounceSearchTermUpdate = useCallback(debounce((searchValue) => {
        setListRepositories([]);
        setDebouncedSearchTerm(searchValue);
    }, 500), []);


    useEffect(() => {
        debounceSearchTermUpdate(searchTerm);

        return () => {
            debounceSearchTermUpdate.cancel();
        };
    }, [searchTerm, debounceSearchTermUpdate]);

    const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        setSearchTerm(event.target.value);
    }, []);

    const loadMoreItems = () => {

        if ((!isLoading && !isFetching)) {
            setNextPageHash(data?.pagination?.endCursor);
        }
    };


    const renderRepoCards = useCallback(() => (
        listRepositories.map((repo, idx) => {
            const favoriteRepository = favorites.find(favRepo => favRepo.id === repo.id);
            const repositoryInfo = { ...repo, rating: favoriteRepository?.rating };

            return (
                <RepoCard
                    key={`repo-card-${repo.id}-${idx}`}
                    repositoryInfo={repositoryInfo}
                    isFavorite={!!favoriteRepository}
                    handler={favoritesHandler}
                />
            );
        })
    ), [listRepositories, favorites, favoritesHandler]);

    return (
        <>
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: (menuOpened && !isMobile) ? '19rem' : 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: 'white',
                padding: '10px',
                paddingTop: '5rem'
            }}>
                <TextField
                    label={t(`main_page__search__label`)}
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ mb: 2 }}
                />
            </Box>
            <Box sx={{ marginTop: '5rem' }}>
                <InfiniteScroll
                    hasMore={data?.pagination?.hasNextPage}
                    loadMore={loadMoreItems}
                    isLoading={(isLoading || isFetching)}
                >
                    {renderRepoCards()}

                </InfiniteScroll>

            </Box>
        </>
    );
};

export default SearchBarComponent;

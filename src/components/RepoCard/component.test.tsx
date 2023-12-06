import '@/i18n';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import RepoCard from './component';


describe('RepoCard', () => {
    const mockHandler = jest.fn();
    const mockRepositoryInfo = {
        name: 'Test Repo',
        url: 'http://testrepo.com',
        description: 'This is a test repository',
        languages: [{ name: 'JavaScript', color: 'yellow' }],
    };

    test('renders RepoCard with repository information', () => {
        render(
            <RepoCard
                repositoryInfo={mockRepositoryInfo}
                isFavorite={false}
                handler={mockHandler}
            />
        );
        expect(screen.getByText('Test Repo')).toBeInTheDocument();
        expect(screen.getByText('This is a test repository')).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    test('opens rating modal when add to favorites button is clicked', () => {
        render(
            <RepoCard
                repositoryInfo={mockRepositoryInfo}
                isFavorite={false}
                handler={mockHandler}
            />
        );

        const addButton = screen.getByRole('button');
        fireEvent.click(addButton);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    test('handleAddToFavorites is called with correct parameters', () => {
        render(
            <RepoCard
                repositoryInfo={mockRepositoryInfo}
                isFavorite={false}
                handler={mockHandler}
            />
        );

        // Simulate opening the modal and submitting a new rating
        const addButton = screen.getByRole('button');
        fireEvent.click(addButton); // Adjust as per your button's text or aria-label
        fireEvent.click(screen.getByText('Add'));

        // Expect the handler to be called with the new rating
        expect(mockHandler).toHaveBeenCalledWith(true, { ...mockRepositoryInfo, rating: 0 });
    });
    test('calls handler with correct arguments when removing from favorites', () => {
        render(
            <RepoCard
                repositoryInfo={mockRepositoryInfo}
                isFavorite={true}
                handler={mockHandler}
            />
        );

        const removeButton = screen.getByRole('button');
        fireEvent.click(removeButton);

        expect(mockHandler).toHaveBeenCalledWith(true, mockRepositoryInfo);
    });

    test('opens rating modal on add to favorites button click', () => {
        render(
            <RepoCard
                repositoryInfo={mockRepositoryInfo}
                isFavorite={false}
                handler={mockHandler}
            />
        );

        const addButton = screen.getByRole('button');
        fireEvent.click(addButton);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });



});

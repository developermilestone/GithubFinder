import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { RatingModal } from '.';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('RatingModal', () => {
    const mockOnClose = jest.fn();
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly when open', () => {
        render(
            <RatingModal open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );

        expect(screen.getByText('ratingModal__title')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'ratingModal__add' })).toBeInTheDocument();
    });

    test('does not render when not open', () => {
        render(
            <RatingModal open={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );

        expect(screen.queryByText('ratingModal__title')).not.toBeInTheDocument();
    });

    test('calls onClose when cancel button is clicked', () => {
        render(
            <RatingModal open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );

        fireEvent.click(screen.getByText('ratingModal__cancel'));
        expect(mockOnClose).toHaveBeenCalled();
    });

    test('calls onSubmit with the correct rating', () => {
        render(
            <RatingModal open={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );

        fireEvent.mouseOver(screen.getByLabelText('2 Stars'));
        fireEvent.click(screen.getByLabelText('2 Stars'));
        fireEvent.click(screen.getByText('ratingModal__add'));

        expect(mockOnSubmit).toHaveBeenCalledWith(2);
    });

});

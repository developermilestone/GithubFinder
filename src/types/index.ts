type Language = {
    name: string;
    color?: string;
  };
export interface Repository {
    name?: string;
    url?: string;
    rating?: number;
    id?: string;
    description?: string;
    languages?: Language[];
  }


export type LanguageSelector = {
    value: string;
    label: string;
  };

export interface RatingModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (rating: number) => void;
  }
export type RepositoryInfo = {
  name?: string;
  url?: string;
  rating?: number;
  description?: string;
  languages?: Language[];
};

export type RepoCardProps = {
  repositoryInfo: RepositoryInfo;
  isFavorite: boolean;
  handler: (isFavorite: boolean, repositoryInfo: RepositoryInfo) => void;
};


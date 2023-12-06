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



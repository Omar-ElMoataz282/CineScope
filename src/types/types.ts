export interface Movies {
  id: number;
  genre_ids: number[];
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Actors {
  cast_id: number;
  profile_path: string;
  name: string;
  character: string;
}

export interface Pagination {
  setPage: (page: number) => void;
  page: number;
  itemsPerPage: number;
  total: number;
}

export type Genre = {
  id: number;
  name: string;
};

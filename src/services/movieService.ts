const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface ApiMovie {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    original_language: string;
}

export const fetchMoviesByQuery = async (
    searchQuery: string,
    page = 1,
    signal?: AbortSignal
): Promise<ApiMovie[]> => {
    if (!API_KEY) {
        throw new Error('Не вказано VITE_TMDB_API_KEY у файлі .env');
    }

    const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
    const trimmed = searchQuery.trim();
    const endpoint = trimmed
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=uk-UA&query=${encodeURIComponent(trimmed)}&page=${safePage}`
        : `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=uk-UA&page=${safePage}`;

    const response = await fetch(endpoint, { signal });

    if (!response.ok) {
        throw new Error(`Помилка TMDB API (${response.status})`);
    }

    const payload = await response.json();
    return Array.isArray(payload.results) ? payload.results : [];
};
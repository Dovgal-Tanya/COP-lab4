import React, { useCallback, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { fetchMoviesByQuery, type ApiMovie } from '../services/movieService';
import {
    INITIAL_FILTERS,
    MovieFilterPanel,
    type MovieFiltersState,
} from './MovieFilterPanel';
import { MovieDashboardView } from './MovieDashboardView';

export interface DashboardKpis {
    totalCount: number;
    highRatedSharePct: string;
    avgRating: string;
    avgRatingPct: string;
    maxPopularity: number;
    topPopularitySharePct: string;
}

export const MovieDashboardContainer: React.FC = () => {
    const [filters, setFilters] = useState<MovieFiltersState>(INITIAL_FILTERS);
    const debouncedQuery = useDebounce(filters.query, 400);

    const fetcher = useCallback(
        (signal: AbortSignal) => fetchMoviesByQuery(debouncedQuery, filters.page, signal),
        [debouncedQuery, filters.page]
    );

    const { data: movies, loading, error } = useFetch<ApiMovie[]>(
        fetcher,
        [],
        [fetcher]
    );

    const handleResetFilters = () => {
        setFilters(INITIAL_FILTERS);
    };

    const minRatingNum = Number(filters.minRating) || 0;

    const filteredMovies = movies.filter((movie) => {
        const matchesRating = movie.vote_average >= minRatingNum;
        const matchesLanguage =
            filters.language === 'all' || movie.original_language === filters.language;
        return matchesRating && matchesLanguage;
    });

    const sortedMovies = [...filteredMovies].sort((a, b) => {
        if (filters.sortField === 'title') {
            return filters.sortOrder === 'asc'
                ? a.title.localeCompare(b.title, 'uk')
                : b.title.localeCompare(a.title, 'uk');
        }

        const diff = a[filters.sortField] - b[filters.sortField];
        return filters.sortOrder === 'asc' ? diff : -diff;
    });

    const totalCount = sortedMovies.length;
    const highRatedCount = sortedMovies.filter((m) => m.vote_average >= 7.0).length;
    const highRatedSharePct =
        totalCount > 0
            ? `${((highRatedCount / totalCount) * 100).toFixed(1)}% з рейтингом ≥ 7.0`
            : '0.0% з рейтингом ≥ 7.0';

    const avgRatingNum =
        totalCount > 0
            ? sortedMovies.reduce((sum, item) => sum + item.vote_average, 0) / totalCount
            : 0;
    const avgRating = totalCount > 0 ? avgRatingNum.toFixed(1) : '0.0';
    const avgRatingPct = `${((avgRatingNum / 10) * 100).toFixed(1)}% від макс. балу`;

    const maxPopularity =
        totalCount > 0
            ? Math.round(Math.max(...sortedMovies.map((item) => item.popularity)))
            : 0;
    const totalPopularity = sortedMovies.reduce((sum, item) => sum + item.popularity, 0);
    const topPopularitySharePct =
        totalPopularity > 0
            ? `${((maxPopularity / totalPopularity) * 100).toFixed(1)}% частка лідера`
            : '0.0% частка лідера';

    const kpis: DashboardKpis = {
        totalCount,
        highRatedSharePct,
        avgRating,
        avgRatingPct,
        maxPopularity,
        topPopularitySharePct,
    };

    return (
        <div>
            <MovieFilterPanel
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
            />

            <MovieDashboardView
                movies={sortedMovies}
                loading={loading}
                error={error}
                kpis={kpis}
                onResetFilters={handleResetFilters}
            />
        </div>
    );
};
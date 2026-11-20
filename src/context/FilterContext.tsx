import React, { createContext, useContext, useState } from 'react';

export type SortField = 'vote_average' | 'popularity' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface MovieFiltersState {
    query: string;
    minRating: string;
    language: string;
    page: number;
    sortField: SortField;
    sortOrder: SortOrder;
}

export const INITIAL_FILTERS: MovieFiltersState = {
    query: '',
    minRating: '0',
    language: 'all',
    page: 1,
    sortField: 'vote_average',
    sortOrder: 'desc',
};

interface FilterContextValue {
    filters: MovieFiltersState;
    setFilterField: <K extends keyof MovieFiltersState>(
        field: K,
        value: MovieFiltersState[K]
    ) => void;
    toggleSortOrder: () => void;
    resetFilters: () => void;
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filters, setFilters] = useState<MovieFiltersState>(INITIAL_FILTERS);

    const setFilterField = <K extends keyof MovieFiltersState>(
        field: K,
        value: MovieFiltersState[K]
    ) => {
        setFilters((prev) => {
            if (field === 'query') {
                return { ...prev, query: value as string, page: 1 };
            }
            return { ...prev, [field]: value };
        });
    };

    const toggleSortOrder = () => {
        setFilters((prev) => ({
            ...prev,
            sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
        }));
    };

    const resetFilters = () => {
        setFilters(INITIAL_FILTERS);
    };

    return (
        <FilterContext.Provider
            value={{ filters, setFilterField, toggleSortOrder, resetFilters }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export function useFilters(): FilterContextValue {
    const ctx = useContext(FilterContext);
    if (!ctx) {
        throw new Error('useFilters має використовуватися всередині FilterProvider');
    }
    return ctx;
}
import React from 'react';
import { MovieDashboardContainer } from '../components/MovieDashboardContainer';
import { MovieStepper } from '../components/MovieStepper';
import { FilteredMovieList } from '../components/FilteredMovieList';

export const DashboardPage: React.FC = () => {
    return (
        <div>
            <MovieDashboardContainer />

            <section
                style={{
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginTop: '24px',
                }}
            >
                <MovieStepper />
            </section>

            <section style={{ marginTop: '24px' }}>
                <FilteredMovieList />
            </section>
        </div>
    );
};
import React, { useState } from 'react';
import { MovieDashboardContainer } from './components/MovieDashboardContainer';
import { MovieStepper } from './components/MovieStepper';
import { ViewToggle } from './components/ViewToggle';
import { FilteredMovieList } from './components/FilteredMovieList';

export const App: React.FC = () => {
    const [isLightTheme, setIsLightTheme] = useState<boolean>(false);

    return (
        <div
            style={{
                minHeight: '100vh',
                padding: '36px 20px',
                background: isLightTheme
                    ? 'linear-gradient(135deg, #f8f5ff 0%, #fce7f3 100%)'
                    : '#0f0a1a',
                color: isLightTheme ? '#1e1b4b' : '#e2d9f3',
                transition: 'background 0.25s ease, color 0.25s ease',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header
                    style={{
                        marginBottom: '28px',
                        borderBottom: isLightTheme
                            ? '1px solid rgba(147, 51, 234, 0.2)'
                            : '1px solid rgba(168, 85, 247, 0.25)',
                        paddingBottom: '16px',
                    }}
                >
                    <h1
                        style={{
                            margin: '0 0 6px 0',
                            color: isLightTheme ? '#2e1065' : '#f3e8ff',
                            fontSize: '26px',
                            fontWeight: 700,
                        }}
                    >
                        Кіно-Аналітика{' '}
                        <span style={{ color: isLightTheme ? '#be185d' : '#f472b6' }}>
              Dashboard
            </span>
                    </h1>

                </header>

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
                    <ViewToggle
                        isLightTheme={isLightTheme}
                        onToggleTheme={() => setIsLightTheme((prev) => !prev)}
                    />
                </section>

                <section style={{ marginTop: '24px' }}>
                    <FilteredMovieList />
                </section>
            </div>
        </div>
    );
};

export default App;
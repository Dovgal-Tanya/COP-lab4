import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { type ApiMovie } from '../services/movieService';
import { type DashboardKpis } from './MovieDashboardContainer';
import { useTheme } from '../context/ThemeContext';
import { KpiCard } from './KpiCard';

interface MovieDashboardViewProps {
    movies: ApiMovie[];
    loading: boolean;
    error: string | null;
    kpis: DashboardKpis;
    onResetFilters: () => void;
}

export const MovieDashboardView: React.FC<MovieDashboardViewProps> = ({
                                                                          movies,
                                                                          loading,
                                                                          error,
                                                                          kpis,
                                                                          onResetFilters,
                                                                      }) => {
    const navigate = useNavigate();
    const { isLightTheme } = useTheme();

    const boxStyle: React.CSSProperties = {
        background: isLightTheme
            ? 'rgba(253, 242, 248, 0.9)'
            : 'rgba(30, 20, 56, 0.75)',
        border: isLightTheme
            ? '1px solid rgba(216, 180, 254, 0.65)'
            : '1px solid rgba(168, 85, 247, 0.25)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: isLightTheme
            ? '0 8px 24px rgba(192, 132, 252, 0.12)'
            : '0 8px 32px rgba(15, 10, 26, 0.3)',
    };

    const stateStyle: React.CSSProperties = {
        padding: '28px',
        textAlign: 'center',
        color: isLightTheme ? '#6b21a8' : '#d8b4fe',
        fontSize: '15px',
    };

    const resetBtnStyle: React.CSSProperties = {
        padding: '8px 16px',
        borderRadius: '10px',
        border: isLightTheme
            ? '1px solid rgba(219, 39, 119, 0.45)'
            : '1px solid rgba(244, 114, 182, 0.5)',
        background: isLightTheme ? '#fbcfe8' : 'rgba(219, 39, 119, 0.2)',
        color: isLightTheme ? '#831843' : '#fbcfe8',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
    };

    const thStyle: React.CSSProperties = {
        padding: '10px',
    };

    const tdStyle: React.CSSProperties = {
        padding: '12px 10px',
        fontSize: '14px',
        color: isLightTheme ? '#3b0764' : '#e2d9f3',
    };

    return (
        <div>
            <section style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <KpiCard
                    title="Фільмів у вибірці"
                    value={loading ? '—' : kpis.totalCount}
                    trend={loading ? 'Завантаження...' : kpis.highRatedSharePct}
                    isPositive={true}
                />
                <KpiCard
                    title="Середній рейтинг"
                    value={loading ? '—' : kpis.avgRating}
                    trend={loading ? 'Завантаження...' : kpis.avgRatingPct}
                    isPositive={true}
                />
                <KpiCard
                    title="Макс. популярність"
                    value={loading ? '—' : kpis.maxPopularity}
                    trend={loading ? 'Завантаження...' : kpis.topPopularitySharePct}
                    isPositive={true}
                />
            </section>

            <div style={boxStyle}>
                <h2
                    style={{
                        margin: '0 0 16px 0',
                        color: isLightTheme ? '#4c1d95' : '#f3e8ff',
                        fontSize: '18px',
                    }}
                >
                    Результати запиту та фільтрації (клікніть на фільм для деталей)
                </h2>

                {loading && <div style={stateStyle}>Завантаження даних...</div>}

                {!loading && error && (
                    <div
                        style={{
                            ...stateStyle,
                            color: isLightTheme ? '#9d174d' : '#fda4af',
                        }}
                    >
                        Помилка: {error}
                    </div>
                )}

                {!loading && !error && movies.length === 0 && (
                    <div style={stateStyle}>
                        <p style={{ margin: '0 0 12px 0' }}>
                            За заданими параметрами фільмів не знайдено.
                        </p>
                        <button type="button" onClick={onResetFilters} style={resetBtnStyle}>
                            Скинути фільтри
                        </button>
                    </div>
                )}

                {!loading && !error && movies.length > 0 && (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                            <tr
                                style={{
                                    borderBottom: isLightTheme
                                        ? '1px solid rgba(192, 132, 252, 0.45)'
                                        : '1px solid rgba(168, 85, 247, 0.3)',
                                    color: isLightTheme ? '#7e22ce' : '#c4b5fd',
                                    fontSize: '13px',
                                }}
                            >
                                <th style={thStyle}>Назва</th>
                                <th style={thStyle}>Дата релізу</th>
                                <th style={thStyle}>Мова</th>
                                <th style={thStyle}>Рейтинг</th>
                                <th style={thStyle}>Популярність</th>
                            </tr>
                            </thead>
                            <tbody>
                            {movies.map((movie) => (
                                <tr
                                    key={movie.id}
                                    onClick={() => navigate(`/movie/${movie.id}`)}
                                    style={{
                                        borderBottom: isLightTheme
                                            ? '1px solid rgba(216, 180, 254, 0.35)'
                                            : '1px solid rgba(168, 85, 247, 0.12)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <td style={{ ...tdStyle, fontWeight: 600 }}>
                                        <Link
                                            to={`/movie/${movie.id}`}
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                color: isLightTheme ? '#3b0764' : '#f3e8ff',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            {movie.title} →
                                        </Link>
                                    </td>
                                    <td style={tdStyle}>{movie.release_date || '—'}</td>
                                    <td style={tdStyle}>{movie.original_language.toUpperCase()}</td>
                                    <td
                                        style={{
                                            ...tdStyle,
                                            color: isLightTheme ? '#be185d' : '#f472b6',
                                            fontWeight: 700,
                                        }}
                                    >
                                        ★ {movie.vote_average.toFixed(1)}
                                    </td>
                                    <td style={tdStyle}>{Math.round(movie.popularity)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
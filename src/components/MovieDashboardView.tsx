import React from 'react';
import { type ApiMovie } from '../services/movieService';
import { type DashboardKpis } from './MovieDashboardContainer';
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
                <h2 style={{ margin: '0 0 16px 0', color: '#f3e8ff', fontSize: '18px' }}>
                    Результати запиту та фільтрації
                </h2>

                {loading && <div style={stateStyle}>Завантаження даних...</div>}

                {!loading && error && (
                    <div style={{ ...stateStyle, color: '#fda4af' }}>
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
                                    borderBottom: '1px solid rgba(168, 85, 247, 0.3)',
                                    color: '#c4b5fd',
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
                                    style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.12)' }}
                                >
                                    <td style={{ ...tdStyle, color: '#f3e8ff', fontWeight: 600 }}>
                                        {movie.title}
                                    </td>
                                    <td style={tdStyle}>{movie.release_date || '—'}</td>
                                    <td style={tdStyle}>{movie.original_language.toUpperCase()}</td>
                                    <td style={{ ...tdStyle, color: '#f472b6', fontWeight: 700 }}>
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

const boxStyle: React.CSSProperties = {
    background: 'rgba(30, 20, 56, 0.75)',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    borderRadius: '16px',
    padding: '20px',
};

const stateStyle: React.CSSProperties = {
    padding: '28px',
    textAlign: 'center',
    color: '#d8b4fe',
    fontSize: '15px',
};

const resetBtnStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '10px',
    border: '1px solid rgba(244, 114, 182, 0.5)',
    background: 'rgba(219, 39, 119, 0.2)',
    color: '#fbcfe8',
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
    color: '#e2d9f3',
};
import React, { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchMovieDetailsById, type ApiMovieDetails } from '../services/movieService';
import { useTheme } from '../context/ThemeContext';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export const MovieDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { isLightTheme } = useTheme();

    const fetcher = useCallback(
        (signal: AbortSignal) => {
            if (!id) {
                return Promise.reject(new Error('Не вказано ID фільму'));
            }
            return fetchMovieDetailsById(id, signal);
        },
        [id]
    );

    const { data: movie, loading, error } = useFetch<ApiMovieDetails | null>(
        fetcher,
        null,
        [fetcher]
    );

    const formatMoney = (amount: number) =>
        amount > 0 ? `$${amount.toLocaleString('en-US')}` : 'Не вказано';

    const posterUrl = movie?.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null;

    const cardStyle: React.CSSProperties = {
        background: isLightTheme
            ? 'rgba(253, 242, 248, 0.92)'
            : 'rgba(30, 20, 56, 0.82)',
        border: isLightTheme
            ? '1px solid rgba(216, 180, 254, 0.65)'
            : '1px solid rgba(168, 85, 247, 0.28)',
        borderRadius: '16px',
        padding: '24px',
    };

    const backLinkStyle: React.CSSProperties = {
        display: 'inline-block',
        padding: '8px 14px',
        borderRadius: '10px',
        border: isLightTheme
            ? '1px solid rgba(219, 39, 119, 0.45)'
            : '1px solid rgba(244, 114, 182, 0.45)',
        background: isLightTheme ? '#fbcfe8' : 'rgba(147, 51, 234, 0.25)',
        color: isLightTheme ? '#831843' : '#f5d0fe',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 600,
    };

    const statusStyle: React.CSSProperties = {
        padding: '32px',
        textAlign: 'center',
        color: isLightTheme ? '#6b21a8' : '#d8b4fe',
        fontSize: '15px',
    };

    const metaItemStyle: React.CSSProperties = {
        background: isLightTheme
            ? 'rgba(243, 232, 255, 0.8)'
            : 'rgba(15, 10, 26, 0.65)',
        border: isLightTheme
            ? '1px solid rgba(216, 180, 254, 0.6)'
            : '1px solid rgba(168, 85, 247, 0.2)',
        borderRadius: '12px',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    };

    const metaLabelStyle: React.CSSProperties = {
        fontSize: '12px',
        color: isLightTheme ? '#7e22ce' : '#c4b5fd',
    };

    const metaValueStyle: React.CSSProperties = {
        fontSize: '15px',
        color: isLightTheme ? '#3b0764' : '#f3e8ff',
    };

    return (
        <div style={cardStyle}>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/" style={backLinkStyle}>
                    ← Назад до дашборду
                </Link>
            </div>

            {loading && <div style={statusStyle}>Завантаження деталей фільму...</div>}

            {!loading && (error || !movie) && (
                <div
                    style={{
                        ...statusStyle,
                        color: isLightTheme ? '#9d174d' : '#fda4af',
                    }}
                >
                    <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Фільм не знайдено</h2>
                    <p style={{ margin: 0 }}>{error || 'Запис із таким ідентифікатором відсутній.'}</p>
                </div>
            )}

            {!loading && !error && movie && (
                <div>
                    <h2
                        style={{
                            margin: '0 0 6px 0',
                            color: isLightTheme ? '#4c1d95' : '#f3e8ff',
                            fontSize: '26px',
                        }}
                    >
                        {movie.title}
                    </h2>
                    {movie.tagline && (
                        <p
                            style={{
                                margin: '0 0 16px 0',
                                color: isLightTheme ? '#be185d' : '#f472b6',
                                fontStyle: 'italic',
                            }}
                        >
                            «{movie.tagline}»
                        </p>
                    )}

                    <p
                        style={{
                            margin: '0 0 22px 0',
                            color: isLightTheme ? '#3b0764' : '#e2d9f3',
                            lineHeight: 1.6,
                            fontSize: '15px',
                        }}
                    >
                        {movie.overview || 'Опис українською наразі відсутній.'}
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '12px',
                        }}
                    >
                        <div style={metaItemStyle}>
                            <span style={metaLabelStyle}>Статус релізу</span>
                            <strong style={metaValueStyle}>{movie.status || '—'}</strong>
                        </div>
                        <div style={metaItemStyle}>
                            <span style={metaLabelStyle}>Дата прем'єри</span>
                            <strong style={metaValueStyle}>{movie.release_date || '—'}</strong>
                        </div>
                        <div style={metaItemStyle}>
                            <span style={metaLabelStyle}>Тривалість</span>
                            <strong style={metaValueStyle}>
                                {movie.runtime ? `${movie.runtime} хв` : '—'}
                            </strong>
                        </div>
                        <div style={metaItemStyle}>
                            <span style={metaLabelStyle}>Рейтинг та голоси</span>
                            <strong style={metaValueStyle}>
                                ★ {movie.vote_average.toFixed(1)} ({movie.vote_count})
                            </strong>
                        </div>
                        <div style={metaItemStyle}>
                            <span style={metaLabelStyle}>Бюджет</span>
                            <strong style={metaValueStyle}>{formatMoney(movie.budget)}</strong>
                        </div>
                        <div style={metaItemStyle}>
                            <span style={metaLabelStyle}>Касові збори</span>
                            <strong style={metaValueStyle}>{formatMoney(movie.revenue)}</strong>
                        </div>
                    </div>

                    <div
                        style={{
                            marginTop: '20px',
                            color: isLightTheme ? '#6b21a8' : '#c4b5fd',
                            fontSize: '14px',
                        }}
                    >
                        <strong>Жанри:</strong>{' '}
                        {movie.genres && movie.genres.length > 0
                            ? movie.genres.map((g) => g.name).join(', ')
                            : 'Не вказано'}
                    </div>

                    {/* Постер фільму знизу */}
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                        {posterUrl ? (
                            <img
                                src={posterUrl}
                                alt={`Постер фільму «${movie.title}»`}
                                style={{
                                    maxWidth: '280px',
                                    width: '100%',
                                    borderRadius: '14px',
                                    border: isLightTheme
                                        ? '1px solid rgba(192, 132, 252, 0.55)'
                                        : '1px solid rgba(168, 85, 247, 0.35)',
                                    boxShadow: isLightTheme
                                        ? '0 10px 24px rgba(168, 85, 247, 0.16)'
                                        : '0 12px 28px rgba(0, 0, 0, 0.45)',
                                }}
                            />
                        ) : (
                            <div style={statusStyle}>Постер для цього фільму відсутній.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
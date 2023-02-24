import './MoviesList.css';
import MovieItem from '../MovieItem/MovieItem';
import { useState, useEffect } from 'react';
import { MAX_WIDTH, MID_WIDTH, MAX_CURNUM, MID_CURNUM, MIN_CURNUM, MAX_MORENUM, MID_MORENUM, MIN_MORENUM } from '../../utils/consts';

function MoviesList({
    filteredMovies,
    isButtonMoreUnvisible,
    isSaveButtonTypeDelete,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
    windowWidth,
    errorMessage,
}) {

    const [moviesList, setMoviesList] = useState(filteredMovies);
    const [params, setParams] = useState({ curNum: MAX_CURNUM, moreNum: MAX_MORENUM });

    function handleMore() {
        if ((filteredMovies.length - moviesList.length) > 0) {
            const addMovies = filteredMovies.slice(
                moviesList.length,
                moviesList.length + params.moreNum,
            );
            setMoviesList([ ...moviesList, ...addMovies ]);
        };
    };

    useEffect(() => {
        if (windowWidth > MAX_WIDTH) {
            setParams({
                curNum: MAX_CURNUM,
                moreNum: MAX_MORENUM,
            });
        }
        if (windowWidth > MID_WIDTH && windowWidth <= MAX_WIDTH) {
            setParams({
                curNum: MID_CURNUM,
                moreNum: MID_MORENUM,
            });
        }
        if (windowWidth <= MID_WIDTH) {
            setParams({
                curNum: MIN_CURNUM,
                moreNum: MIN_MORENUM,
            });
        };
    }, [windowWidth, params.curNum] );

    // Re-render hook
    useEffect(() => {
        if (filteredMovies) {
            const list = filteredMovies.filter((m, i) => params.curNum > i );
            setMoviesList(list);
        };
    }, [savedMovies, filteredMovies, params.curNum] );

    return (
        <section className='movies-list__container'>
            <ul className='movies-list'>
                {moviesList.map(movie => (
                    <MovieItem
                        movie={movie}
                        key={movie.id || movie._id}
                        isSaveButtonTypeDelete={isSaveButtonTypeDelete}
                        savedMovies={savedMovies}
                        onSaveMovie={onSaveMovie}
                        onDeleteMovie={onDeleteMovie}
                    />
                ))}
            </ul>
            <p className='movies-list__error'>
                {moviesList.length === 0 && errorMessage !== '' ?
                    'Ничего не найдено'
                    :
                    ''
                }
            </p>
            <button 
                className={`movies-list__more ${(isButtonMoreUnvisible || moviesList.length === 0 || moviesList.length === filteredMovies.length) ? 'movies-list__more_unvisible' : ''}`}
                type='button'
                aria-label="Ещё"
                onClick={handleMore}
            >
                Ещё
            </button>
        </section>
    );

};

export default MoviesList;

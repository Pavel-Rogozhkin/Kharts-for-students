import './MovieItem.css';
import { MOVIES_API_URL } from '../../utils/consts';

function MovieItem({
    movie,
    isSaveButtonTypeDelete,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
}) {

    const savedMovie = savedMovies.find(m => m.nameEN === movie.nameEN);

    function handleDeleteMovie(e) {
        e.preventDefault();
        onDeleteMovie(savedMovie);
    };

    function handleSaveMovie(e) {
        e.preventDefault();
        onSaveMovie(movie);
    };

    return (
        <li 
            className='movie-item'
            key={movie.id || movie._id}
        >
            <a
                href={movie.trailerLink}
                className="movie-item movie-item__link"
                target="blank"
            >
                <div className='movie-item__info'>
                    <h3 className='movie-item__title'>
                        {movie.title || movie.nameRU}
                    </h3>
                    <p className='movie-item__duration'>
                        {`${movie.duration} минут`}
                    </p>
                </div>
                <img
                    className='movie-item__img'
                    src={isSaveButtonTypeDelete ? `${movie.image}` : `${MOVIES_API_URL}${movie.image.url}`}
                    alt={movie.title || movie.nameRU}
                />
                <button
                    className={`
                        movie-item__button
                        ${(savedMovie && !isSaveButtonTypeDelete) ? 'movie-item__button_active' : ''}
                        movie-item__button_type_${isSaveButtonTypeDelete ? 'delete' : 'save'}
                    `}
                    type='button'
                    onClick={savedMovie || isSaveButtonTypeDelete ? handleDeleteMovie : handleSaveMovie}
                >
                    Сохранить
                </button>
            </a>
        </li>
    );

};

export default MovieItem;

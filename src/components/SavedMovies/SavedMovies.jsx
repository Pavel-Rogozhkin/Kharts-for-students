import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import { useState, useEffect } from "react";
import { SHORT_MOVIES_DURATION } from '../../utils/consts';

function SavedMovies({
    savedMovies,
    onDeleteMovie,
    windowWidth,
}) {

    const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
    const [searchTask, setSearchTask] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function changeCheckbox() {
        setIsChecked(!isChecked);
    };

    function handleFilteredSavedMovies(movies, isChecked, task) {
        const moviesToFilter = movies.filter(m => m.nameRU.toLowerCase().includes(task.toLowerCase()) || m.nameEN.toLowerCase().includes(task.toLowerCase()));
        setFilteredSavedMovies(isChecked ?
            moviesToFilter.filter(m => m.duration < SHORT_MOVIES_DURATION)
            :
            moviesToFilter
        );
    };

    function handleSubmitSearch(searchTask) {
        if (searchTask) {
            setErrorMessage(' ');
            setSearchTask(searchTask);
            handleFilteredSavedMovies(savedMovies, isChecked, searchTask);
        } else {
            setErrorMessage('Нужно ввести ключевое слово');
        };
    };

    // Re-render hook
    useEffect(() => {
        handleFilteredSavedMovies(savedMovies, isChecked, searchTask);
    }, [isChecked, searchTask, savedMovies] );

    return (
        <>
            <SearchForm
                onSubmitSearch={handleSubmitSearch}
                changeCheckbox={changeCheckbox}
                isChecked={isChecked}
                isPageSave={true}
                errorMessage={errorMessage}
            />
            <MoviesList
                filteredMovies={filteredSavedMovies}
                isButtonMoreUnvisible={true}
                isSaveButtonTypeDelete={true}
                savedMovies={savedMovies}
                onDeleteMovie={onDeleteMovie}
                windowWidth={windowWidth}
                errorMessage={errorMessage}
            />
        </>
    );

};

export default SavedMovies;

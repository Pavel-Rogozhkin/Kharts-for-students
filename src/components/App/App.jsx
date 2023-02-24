import './App.css';
import { Switch, Route, useHistory, Redirect  } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import MainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import useWindowSize from '../../utils/useWindowSize';
import { MOVIES_API_URL } from '../../utils/consts';

function App() {

    // consts, states and etc:
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));
    const [loading,  setLoading] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    const windowWidth = useWindowSize().width;

    const history = useHistory();

    // hooks:

    useEffect( () => {
        if (loggedIn) {

            MainApi.getSavedMovies()
            .then(data => {
                setLoading(true);
                localStorage.setItem('savedMovies', JSON.stringify(data));
                setSavedMovies(data);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
            
        localStorage.setItem('searchTask', localStorage.getItem('searchTask') || '');
        localStorage.setItem('isChecked', localStorage.getItem('isChecked') || false);

        };
    }, [loggedIn, currentUser] );

    useEffect( () => {

        MainApi.getUserInfo()
        .then(( userProfile ) => {
            console.log(userProfile);
            setLoading(true);
            setCurrentUser({
                name: userProfile.name,
                email: userProfile.email,
            });
            setLoggedIn(true);
            localStorage.setItem('loggedIn', true);
        })
        .catch(error => {
            console.log('errr');
            console.log(error);
            setLoggedIn(false);
            setCurrentUser({});
            localStorage.clear();
            setLoading(false);
        })
        .finally(() => {
            setLoading(false);
            console.log('final');
        });

    }, [] );

    // functions:
    function handleSetUserInfo(data) {
        setLoading(true);
        MainApi.setUserInfo(data)
            .then(user => {
                setCurrentUser(user);
                setErrorMessage(' ');
            })
            .catch(error => {
                console.log(error);
                setErrorMessage('При обновлении профиля произошла ошибка.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    function handleSingOut() {
        MainApi.signOut()
            .then(() => {
                setLoggedIn(false);
                setCurrentUser({});
                setSavedMovies([]);
                localStorage.clear();
                history.push('/');
                console.clear();
            })
            .catch(error => {
                console.log(error);
            });
    };

    function saveMovie(movie) {
        let movieOUT = {
            _id: movie.movieId,
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            trailerLink: movie.trailerLink,
            movieId: movie.id,
            image: `${MOVIES_API_URL}${movie.image.url}`,
            thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
        };
        MainApi.setSavedMovies(movieOUT)
            .then(i => {
                setSavedMovies([ i, ...savedMovies ]);
            })
            .catch(error => {
                console.log(error);
            });
    };

    function deleteMovie(movie) {
        const foo = savedMovies.filter((m) => m.nameEN === movie.nameEN);

        foo.forEach(element => {
            MainApi.deleteMovie(element._id)
                .then(() => {
                    const moviesList = savedMovies.filter((m) => m._id !== element._id);
                    setSavedMovies(moviesList);
                })
                .catch(error => {
                    console.log(error);
                });
        })
    };

    function handleRegister({ name, email, password}) {
        setLoading(true);
        MainApi.register({ name, email, password })
            .then(() => {
                setErrorMessage(' ');
                handleAuth({
                    name,
                    email,
                    password,
                });
            })
            .catch(error => {
                console.log(error);
                setErrorMessage('При регистрации пользователя произошла ошибка.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    function handleAuth({ email, password }) {
        setLoading(true);
        MainApi.auth({ email, password })
            .then(res => {
                setErrorMessage(' ');
                setCurrentUser({
                    name: res.data.name,
                    email: res.data.email,
                });
                setLoggedIn(true);
                localStorage.setItem('loggedIn', true);
                history.push('/movies');
            })
            .catch(error => {
                console.log(error);
                setErrorMessage('При авторизации произошла ошибка.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // render:
    return (

        <CurrentUserContext.Provider 
            value={currentUser}
        >

            <Header 
                loggedIn={loggedIn}
            />

            <main className='main'>

                <Switch>

                    <Route exact path='/'>
                        <Main />
                    </Route>

                    <ProtectedRoute
                        exact
                        path='/movies'
                        component={Movies}
                        loggedIn={loggedIn}
                        savedMovies={savedMovies}
                        onSaveMovie={saveMovie}
                        onDeleteMovie={deleteMovie}
                        loading={loading}
                        setLoading={setLoading}
                        windowWidth={windowWidth}
                    />

                    <ProtectedRoute
                        exact
                        path='/saved-movies'
                        component={SavedMovies}
                        loggedIn={loggedIn}
                        savedMovies={savedMovies}
                        onDeleteMovie={deleteMovie}
                        windowWidth={windowWidth}
                    />

                    <ProtectedRoute
                        exact
                        path='/profile'
                        component={Profile}
                        loggedIn={loggedIn}
                        loading={loading}
                        onSetUserInfo={handleSetUserInfo}
                        onSignOut={handleSingOut}
                        errorMessage={errorMessage}
                    />

                    <Route path='/signup'>
                        {loggedIn ?
                            <Redirect to='/movies' />
                            :
                            <Register
                                onRegister={handleRegister}
                                loading={loading}
                                errorMessage={errorMessage}
                            />
                        }
                    </Route>

                    <Route path='/signin'>
                        {loggedIn ?
                            <Redirect to='/movies' />
                            :
                            <Login
                                onLogin={handleAuth}
                                loading={loading}
                                errorMessage={errorMessage}
                            />
                        }
                    </Route>

                    <Route
                        path='*'
                        component={NotFound}
                    />

                    <Route>
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
                    </Route>

                </Switch>

            </main>

            <Footer />

        </CurrentUserContext.Provider>

    );

};

export default App;

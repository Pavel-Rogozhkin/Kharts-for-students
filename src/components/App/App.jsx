import './App.css';
import { Switch, Route, useHistory, Redirect  } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import MainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

    // consts, states and etc:
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));
    const [loading,  setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    // hooks:

    useEffect( () => {

        MainApi.getUserInfo()
        .then(( userProfile ) => {
            setLoading(true);
            setCurrentUser({
                name: userProfile.name,
                email: userProfile.email,
            });
            setLoggedIn(true);
            localStorage.setItem('loggedIn', true);
        })
        .catch(error => {
            console.log(error);
            setLoggedIn(false);
            setCurrentUser({});
            localStorage.clear();
            setLoading(false);
        })
        .finally(() => {
            setLoading(false);
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
                localStorage.clear();
                history.push('/');
                console.clear();
            })
            .catch(error => {
                console.log(error);
            });
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
                history.push('/');
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
                            <Redirect to='/' />
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
                            <Redirect to='/' />
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

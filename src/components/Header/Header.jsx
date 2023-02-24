import './Header.css';
import { Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

function Header({ loggedIn }) {

    const paths = [
        '/movies',
        '/saved-movies',
        '/profile',
    ];

    return (
        <>
            <Route path={paths}>
                <>
                    <header className='header'>
                        <Logo />
                        <h1 className='header__title'>Kharts</h1>
                        <Navigation 
                            loggedIn={loggedIn}
                            isPageMain={false}
                        />
                    </header>
                </>
            </Route>

            <Route exact path='/'>
                <>
                    <header className='header header__main-page'>
                        <Logo />
                        <h1 className='header__title'>Kharts</h1>
                        <Navigation
                            loggedIn={loggedIn}
                            isPageMain={true}
                        />
                    </header>
                </>
            </Route>
        </>
    );

};

export default Header;

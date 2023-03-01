import './Navigation.css';
import { useState } from 'react';
import AuthNav from '../AuthNav/AuthNav';
import Burger from '../Burger/Burger';
import Menu from '../Menu/Menu';

function Navigation({ isPageMain, loggedIn }) {

    const [isClicked, setIsClicked] = useState(false);
    
    const handleMenuClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <nav className={`navigation ${(isPageMain && !loggedIn) ? 'navigation__main-page' : ''}`}>
            {(!loggedIn && isPageMain) ?
                <AuthNav />
            :
                <>
                    <Menu
                        isClicked={isClicked}
                    />
                    <Burger
                        isClicked={isClicked}
                        onMenuClick={handleMenuClick}
                    />
                </>
            }
        </nav>
    );

};

export default Navigation;

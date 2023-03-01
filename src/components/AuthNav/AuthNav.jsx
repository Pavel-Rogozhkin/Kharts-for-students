import './AuthNav.css';
import { Link } from 'react-router-dom';

function AuthNav() {
    return (
        <ul className="auth-nav">
            <li>
                <Link
                    className="auth-nav__link auth-nav__link_type_sign-up"
                    to="/signup"
                >
                    Регистрация
                </Link>
            </li>
            <li>
                <Link
                    className="auth-nav__link auth-nav__link_type_sign-in"
                    to="/signin"
                >
                    Войти
                </Link>
            </li>
        </ul>
    );
};

export default AuthNav;

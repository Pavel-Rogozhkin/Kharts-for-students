import './NotFound.css';
import { useHistory } from 'react-router-dom';

function NotFound() {

    const history = useHistory();

    function handleClick() {
        history.goBack();
    };

    return (
        <div className='not-found'>
            <h2 className='not-found__code'>
                404
            </h2>
            <p className='not-found__description'>
                Страница не найдена
            </p>
            <button
                className='not-found__button'
                type='button'
                onClick={handleClick}
            >
                Назад
            </button>
        </div>
    );

};

export default NotFound;

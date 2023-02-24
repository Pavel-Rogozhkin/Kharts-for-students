import './Portfolio.css';
import PortfolioItem from '../PortfolioItem/PortfolioItem';

function Portfolio() {

    return (
        <div className='portfolio'>
            <h4 className='portfolio__title'>Портфолио</h4>
            <ul className='portfolio__list'>
                <PortfolioItem 
                    link='https://github.com/Pavel-Rogozhkin/how-to-learn'
                    text='Статичный сайт'
                />
                <PortfolioItem 
                    link='https://github.com/Pavel-Rogozhkin/russian-travel'
                    text='Адаптивный сайт'
                />
                <PortfolioItem 
                    link='https://github.com/Pavel-Rogozhkin/react-mesto-api-full'
                    text='Одностраничное приложение'
                />
            </ul>
        </div>
    );

};

export default Portfolio;

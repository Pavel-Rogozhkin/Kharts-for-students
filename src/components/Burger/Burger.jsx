import './Burger.css';

const Burger = ({ isClicked, onMenuClick }) => {

    return (
        <button
            className={`burger ${isClicked && 'burger__close'}`}
            type="button"
            onClick={onMenuClick}
            aria-label="Меню навигации по сайту"
        >
        </button>
    );
    
};

export default Burger;

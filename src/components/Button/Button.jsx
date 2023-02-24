import './Button.css';

function Button({
    place,
    buttonText,
    isValid,
    type,
    onClick,
}) {

    return (
        <button
            className={`button button_place_${place} ${(isValid || (place === 'search')) ? '' : 'button_disabled'}`}
            aria-label={buttonText}
            type={type || 'submit'}
            disabled={!isValid}
            onClick={onClick}
        >
            {buttonText}
        </button>
    );

};

export default Button;

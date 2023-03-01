import './Input.css';

function Input({
    place,
    name,
    label,
    type,
    value,
    placeholder,
    onChange,
    pattern,
    errorMessage,
}) {

    return (
        <div className='input__container'>
            <label
                className={`input__label ${place ? `input__label_place_${place}` : ''}`}
                htmlFor={name}
            >
                {label}
            </label>
            <input
                className={`input ${errorMessage ? `input_type_error` : ''} ${place ? `input_place_${place}` : ''}`}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                pattern={pattern || '.*'}
                required
            />
            <span className={`input__error ${place ? `input__error_place_${place}` : ''}`}>
                {errorMessage}
            </span>
        </div>
    );

};

export default Input;

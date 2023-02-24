import './Checkbox.css';

function Checkbox({
    changeCheckbox,
    isChecked,
}) {

    return (
        <div className='checkbox__container'>
            <input
                className='checkbox'
                type='checkbox'
                checked={isChecked}
                onChange={changeCheckbox}
                id='shortMoviesFilter'
            />
            <label
                className='checkbox__label'
                htmlFor='shortMoviesFilter'
            />
            <p className='checkbox__text'>
                Короткометражки
            </p>
        </div>
    );

};

export default Checkbox;

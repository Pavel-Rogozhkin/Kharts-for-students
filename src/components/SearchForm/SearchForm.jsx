import './SearchForm.css';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import useFormWithValidation from '../../utils/useFormWithValidation';
import { useEffect } from 'react';

function SearchForm({
    onSubmitSearch,
    changeCheckbox,
    isChecked,
    isPageSave,
    errorMessage,
}) {

    const {
        values,
        handleChange,
        setValues,
        isValid,
    } = useFormWithValidation();

    function handleSubmitSearch(e) {
        e.preventDefault();
        onSubmitSearch(values.search);
    };

    useEffect(() => {
        if (!isPageSave) {
            const task = localStorage.getItem('searchTask');
            if (task) {
                setValues({ search: task });
            };
        };
    }, [setValues, isPageSave] );

    return (
        <section className='search'>
            <div className='search__container'>
                <Form
                    place='search'
                    buttonText='Поиск'
                    onSubmit={handleSubmitSearch}
                    isValid={true}
                    forValidation={!isValid}
                    isSearchform={true}
                    errorMessage={errorMessage}
                >
                    <Input
                        type="text"
                        name="search"
                        place="search"
                        placeholder="Фильм"
                        value={values.search || ''}
                        onChange={handleChange}
                    />
                </Form>
                <Checkbox
                    changeCheckbox={changeCheckbox}
                    isChecked={isChecked}
                />

            </div>
        </section>
    );

};

export default SearchForm;

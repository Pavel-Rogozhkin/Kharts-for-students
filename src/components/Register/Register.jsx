import './Register.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useFormWithValidation from '../../utils/useFormWithValidation';
import { NAME_REGEX, EMAIL_REGEX } from '../../utils/consts';

function Register({
    onRegister,
    loading,
    errorMessage,
}) {

    const {
        values,
        handleChange,
        errors,
        isValid,
        resetForm,
    } = useFormWithValidation();

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    function handleSubmitRegister(e) {
        e.preventDefault();
        onRegister(values)
    };

    return (
        <div className='register'>
            <Logo />
            <h2 className='register__title'>
                Добро пожаловать!
            </h2>
            <Form
                onSubmit={handleSubmitRegister}
                isValid={isValid && !loading}
                name='register'
                place='register'
                buttonText={loading ?
                    'Регистрация...'
                    :
                    'Зарегистрироваться'
                }
                errorMessage={errorMessage}
            >
                <Input 
                    place='register'
                    name='name'
                    label='Имя'
                    type='text'
                    value={values.name || ''}
                    placeholder='Имя'
                    errorMessage={errors.name}
                    onChange={handleChange}
                    pattern={NAME_REGEX}
                    minLength={2}
                    maxLength={30}
                />
                <Input 
                    place='register'
                    name='email'
                    label='E-mail'
                    type='email'
                    value={values.email || ''}
                    placeholder='E-mail'
                    errorMessage={errors.email}
                    onChange={handleChange}
                    pattern={EMAIL_REGEX}
                />
                <Input 
                    place='register'
                    name='password'
                    label='Пароль'
                    type='password'
                    value={values.password || ''}
                    placeholder='Пароль'
                    errorMessage={errors.password}
                    onChange={handleChange}
                />
            </Form>
            <div className='register__flex'>
                <span className='register__caption register__text'>
                    Уже зарегистрированы?
                </span>
                <Link
                    className='register__link register__text'
                    to='/signin'
                >
                    Войти
                </Link>
            </div>
        </div>
    );

};

export default Register;

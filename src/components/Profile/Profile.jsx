import './Profile.css';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../utils/useFormWithValidation';
import { NAME_REGEX, EMAIL_REGEX } from '../../utils/consts';

function Profile({
    loading,
    onSetUserInfo,
    onSignOut,
    errorMessage,
}) {

    const currentUser = useContext(CurrentUserContext);
    const {
        values,
        setValues,
        handleChange,
        errors,
        isValid,
        setIsValid,
    } = useFormWithValidation();

    useEffect(() => {
        setIsValid(true);
    }, [setIsValid] );

    useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email,
        });
    }, [setValues, currentUser]);    

    function handleInputChange(e) {
        handleChange(e);
    };

    function handleSubmitProfile(e) {
        e.preventDefault();
        if (e.target.checkValidity()) {
            onSetUserInfo(values);
        };
    };

    const isValidProfile = (isValid
        &&
            (values.name !== currentUser.name
        ||
             values.email !== currentUser.email)
    );
  
    
    return (
        <div className='profile'>
            <h2 className='profile__welcome'>
                {`Привет, ${currentUser.name}!`}
            </h2>
            <Form
                name='profile'
                place='profile'
                buttonText={loading ?
                    'Редактирование...'
                    :
                    'Редактировать'
                }
                onSubmit={handleSubmitProfile}
                isValid={isValidProfile && !loading}
                errorMessage={errorMessage}
            >
                <Input 
                    place='profile'
                    name='name'
                    label='Имя'
                    type='text'
                    value={values.name || ''}
                    placeholder='Имя'
                    onChange={handleInputChange}
                    pattern={NAME_REGEX}
                    errorMessage={errors.name}
                />
                <Input 
                    place='profile'
                    name='email'
                    label='E-mail'
                    type='email'
                    value={values.email || ''}
                    placeholder='E-mail'
                    onChange={handleInputChange}
                    pattern={EMAIL_REGEX}
                    errorMessage={errors.email}
                />
            </Form>
            <Button
                type='button'
                place='logout'
                buttonText='Выйти из аккаунта'
                onClick={onSignOut}
                isValid={isValid}
            />
        </div>
    );

};

export default Profile;

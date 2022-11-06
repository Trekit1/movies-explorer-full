import Form from "../Form/Form";
import {useEffect} from 'react';

function Login({authorization, useFormWithValidation, textErrorApiLogin, errorSumbit}) {
    const toRegister = '/signup'

    const {values, handleChange, errors, isValid, resetForm, isValidEmail} = useFormWithValidation();

    useEffect(() => {
      resetForm();
    },[])

    function handleSubmit(evt) {
      evt.preventDefault();
      authorization(values.email, values.password);
      resetForm();
    }

    return(
        <Form title='Рады видеть!' buttonName='Войти' question ='Еще не зарегистрированы?' 
        linkName='Регистрация' to={toRegister} handleSubmit={handleSubmit} handleChange={handleChange} isValid={isValid} errors={errors} textErrorApiLogin={textErrorApiLogin} isValidEmail={isValidEmail} errorSumbit={errorSumbit}/>
    )
}

export default Login
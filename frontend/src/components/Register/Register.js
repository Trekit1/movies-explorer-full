import Form from "../Form/Form";
import {useState} from 'react';

function Register({userRegister}) {
    const toLogin = '/signin'

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
      }
    
      function handleChangePassword(e) {
        setPassword(e.target.value);
      }

      function handleChangeName(e) {
        setName(e.target.value);
      }

      function handleSubmit(evt) {
        evt.preventDefault();
        userRegister(email, password, name);
      }

    return(
        <Form title='Добро пожаловать!' buttonName='Зарегистрироваться' question ='Уже зарегистрированы?' linkName='Войти' 
        to={toLogin} handleChangeEmail={handleChangeEmail} handleChangePassword={handleChangePassword} handleSubmit={handleSubmit}>
            <>
            <p className='form__input-name'>Имя</p>
            <input className='form__input form__input_name' minLength="2" maxLength="40" required onChange={handleChangeName}></input>
            </>
        </Form>
    )
}

export default Register
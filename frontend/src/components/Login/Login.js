import Form from "../Form/Form";
import {useState} from 'react';

function Login({userAuthorization}) {
    const toRegister = '/signup'

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
      }
    
      function handleChangePassword(e) {
        setPassword(e.target.value);
      }

      function handleSubmit(evt) {
        evt.preventDefault();
        userAuthorization(email, password);
      }

    return(
        <Form title='Рады видеть!' buttonName='Войти' question ='Еще не зарегистрированы?' 
        linkName='Регистрация' to={toRegister} handleChangeEmail={handleChangeEmail} handleChangePassword={handleChangePassword} handleSubmit={handleSubmit}/>
    )
}

export default Login
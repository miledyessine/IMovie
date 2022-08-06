import { useState } from "react";
import "./signup.scss";
import FormInput from "./FormInput";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { Link ,BrowserRouter} from 'react-router-dom';

import logo from '../../assets/logo.png';

import bg from '../../assets/footer-bg.jpg';




const Login = (props) => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const [token,setToken]=useCookies(["user-token"]);



    const inputs = [
        {
        id: 1,
        name: "username",
        type: "text",
        placeholder: "Username",
        errorMessage:
            "Username should be 3-16 characters and shouldn't include any special character!",
        label: "Username",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
        },
        {
        id: 2,
        name: "password",
        type: "password",
        placeholder: "Password",
        errorMessage:
            "Password should be 8-20 characters and include at least 1 letter and 1 number!",
        label: "Password",
        pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        required: true,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    

    const submit = (e) => {
        // Request API.
        axios
        .post('http://localhost:1337/api/auth/local', {
            identifier: values.username,
            password: values.password,
        })
        .then((response) => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
            setToken("user-token",response.data.jwt);
        })
        .catch((error) => {
            // Handle error.
            console.log('An error occurred:', error.response);
        });
    }


    return (
            
            <div className="Signup" style={{backgroundImage: `url(${bg})`}}>
                <div className="info">
                    <img src={logo} alt="Logo Imovie" className="logoAuth"/>
                    <p>Welcome to IMovie</p>
                </div>
                
                <form className="formLog" onSubmit={handleSubmit}>
                    <h1 className="titreLog">Log In</h1>
                    {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                    ))}
                    <button className="btnSub" onClick={submit}>Submit</button>
                    <p className="newSign">New to IMovie? <button className="aSign" 
                        onClick={()=>{props.newUser(false)}} >Sign up Now</button>.</p>
                </form>
            </div>
        
    );
};

export default Login;
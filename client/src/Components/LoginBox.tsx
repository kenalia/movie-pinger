import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "antd";
import {addNewWatcher, loginWatcher, testAuth} from "../Utils/API";
import './LoginBox.scss';

export const LoginBox = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const { register, handleSubmit, watch, errors} = useForm();

    const receiveLogin = (data: any) => {
        if(data.reason) {
            setErrMsg(data.reason);
        }

        if(!data.token)
            return;

        sessionStorage.setItem('authtoken', data.token);

        testAuth();
    };

    const receiveAccount = (data: any) => {

    }

    const onLogin = (data: any) => loginWatcher(data.userField, data.passField, receiveLogin);
    const onCreateAccount = (data: any) => addNewWatcher(data.userField, data.passField, receiveAccount)

    return (
        <div className='loginBox'>
            <h1>Movie Pinger</h1>
            {showLogin && <form className='loginForm' onSubmit={handleSubmit(onLogin)}>
                <input type="text" name='userField' ref={register({required: true})}/>
                {errors.userField && <span>Username is required</span>}
                <input type='password' name='passField' ref={register({required: true})}/>
                {errors.passField && <span>Password is required</span>}
                <Button>Login</Button>
            </form>}
            {!showLogin && <form className='createForm' onSubmit={handleSubmit(onCreateAccount)}>
                <input type="text" name='userField' placeholder='username' ref={register({required: true})}/>
                {errors.userField && <span>Username is required</span>}
                <input type='password' name='passField' placeholder='password' ref={register({required: true})}/>
                {errors.passField && <span>Password is required</span>}
                <input type='password' name='confirmPassField' placeholder='confirm password' ref={register({required: true})}/>
                <Button>Create Account</Button>
            </form>}
            <div className='boxFooter'>
                <img src={process.env.PUBLIC_URL + '/chevron.svg'} className='btnChevron left'/>
                {showLogin && <p onClick={() => setShowLogin(false)} className='accBtn'>Create Account</p>}
                {!showLogin && <p onClick={() => setShowLogin(true)} className='accBtn'>Login</p>}
                <img src={process.env.PUBLIC_URL + '/chevron.svg'} className='btnChevron right'/>
            </div>
        </div>
    );
}
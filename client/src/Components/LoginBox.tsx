import React, {useState} from 'react';
import { useForm } from 'react-hook-form';

export const LoginBox = () => {
    const [showLogin, setShowLogin] = useState(true);
    const { register, handleSubmit, watch, errors} = useForm();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (data: any) => console.log(data);

    return (
        <div className='loginBox'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name='userField' defaultValue={username} ref={register({ required: true})}/>
                { errors.userField && <span>Username is required</span>}
                <input type='password' name='passField' defaultValue={password} ref={register({ required: true})}/>
                { errors.passField && <span>Password is required</span>}
                <input type="submit"/>
            </form>
        </div>
    );
}
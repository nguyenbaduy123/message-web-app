import React, { useState } from "react";
import styles from './Auth.css'

export const Register = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    
    return (
        <div className="authForm">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />

                <label htmlFor="email">Email</label>
                <input value={email} type="email" id='email' placeholder='abc@gmail.com' name='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input value={password} type="password" id='password' placeholder='********' name='password' onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>

            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>

        </div>
    )
}
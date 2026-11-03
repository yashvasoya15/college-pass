import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import API from '../services/api';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    async function handleLogin(e) {

        e.preventDefault();

        try {

            const res = await API.post('/users/login', {
                email,
                password
            });

            localStorage.setItem(
                'user',
                JSON.stringify(res.data.user)
            );

            if (res.data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/destination');
            }

        } catch (error) {

            alert(error.response?.data?.message || 'Login failed');

        }

    }

    return (

        <div className="auth-page">

            <form className="form-box" onSubmit={handleLogin}>

                <h2>College Bus Pass</h2>

                <p>Login to your account</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

                <p>
                    New Student?
                    <Link to="/register"> Register</Link>
                </p>

            </form>

        </div>

    );

}

export default Login;
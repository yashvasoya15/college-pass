import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import API from '../services/api';

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: '',
        email: '',
        password: ''

    });

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleRegister(e) {

        e.preventDefault();

        try {

            const res = await API.post('/users/register', form);

            alert(res.data.message);

            navigate('/');

        } catch (error) {

            alert(error.response?.data?.message || 'Registration failed');

        }

    }

    return (

        <div className="auth-page">

            <form className="form-box" onSubmit={handleRegister}>

                <h2>Student Registration</h2>

                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                />

                <button type="submit">Register</button>

                <p>
                    Already registered?
                    <Link to="/"> Login</Link>
                </p>

            </form>

        </div>

    );

}

export default Register;
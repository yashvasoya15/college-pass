import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import API from '../services/api';

function Destination() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const [form, setForm] = useState({

        source: '',
        destination: '',
        busNumber: '',
        duration: ''

    });

    const [passId, setPassId] = useState('');

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const res = await API.post('/passes/apply', {

                ...form,

                studentId: user.id,

                studentName: user.name

            });

            setPassId(res.data.pass._id);

            localStorage.setItem(
                'passId',
                res.data.pass._id
            );

            alert('Destination submitted successfully');

            navigate('/payment');

        } catch (error) {
    console.log('Application Error:', error);

    console.log('Server Response:', error.response?.data);

    alert(
        error.response?.data?.message ||
        error.message ||
        'Application failed'
    );
}

    }

    return (

        <div className="page">

            <form className="form-box" onSubmit={handleSubmit}>

                <h2>Select Bus Destination</h2>

                <input
                    placeholder="Starting Point"
                    value={form.source}
                    onChange={(e) => setForm({
                        ...form,
                        source: e.target.value
                    })}
                    required
                />

                <input
                    placeholder="College Destination"
                    value={form.destination}
                    onChange={(e) => setForm({
                        ...form,
                        destination: e.target.value
                    })}
                    required
                />

                <select
                    value={form.busNumber}
                    onChange={(e) => setForm({
                        ...form,
                        busNumber: e.target.value
                    })}
                    required
                >

                    <option value="">Select Bus Route</option>

                    <option value="Bus 101">Bus 101</option>

                    <option value="Bus 102">Bus 102</option>

                    <option value="Bus 103">Bus 103</option>

                </select>

                <select
                    value={form.duration}
                    onChange={(e) => setForm({
                        ...form,
                        duration: e.target.value
                    })}
                    required
                >

                    <option value="">Select Duration</option>

                    <option value="Monthly">Monthly - ₹500</option>

                    <option value="Quarterly">Quarterly - ₹1400</option>

                    <option value="Yearly">Yearly - ₹5000</option>

                </select>

                <button type="submit">
                    Continue to Payment
                </button>

            </form>

        </div>

    );

}

export default Destination;
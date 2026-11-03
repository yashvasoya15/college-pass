import { useEffect, useState } from 'react';

import API from '../services/api';

function MyPass() {

    const user = JSON.parse(localStorage.getItem('user'));

    const [passes, setPasses] = useState([]);

    useEffect(() => {

        async function getPasses() {

            try {

                const res = await API.get(
                    `/passes/my/${user.id}`
                );

                setPasses(res.data);

            } catch (error) {

                alert('Unable to load passes');

            }

        }

        getPasses();

    }, []);

    return (

        <div className="page">

            <div className="card">

                <h2>My Bus Pass</h2>

                {passes.length === 0 ? (

                    <p>No bus pass found.</p>

                ) : (

                    <div className="list-grid">

                        {passes.map((pass) => (

                            <div className="pass-item" key={pass._id}>

                                <h3>{pass.busNumber}</h3>

                                <p>Student: {pass.studentName}</p>

                                <p>From: {pass.source}</p>

                                <p>To: {pass.destination}</p>

                                <p>Duration: {pass.duration}</p>

                                <p>Amount: ₹{pass.amount}</p>

                                <p>
                                    Payment: {pass.paymentStatus}
                                </p>

                                <span className={`status-badge ${pass.status.toLowerCase()}`}>
                                    {pass.status}
                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default MyPass;
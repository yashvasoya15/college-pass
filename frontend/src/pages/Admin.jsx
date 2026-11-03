import { useEffect, useState } from 'react';

import API from '../services/api';

function Admin() {

    const [requests, setRequests] = useState([]);

    async function getRequests() {

        try {

            const res = await API.get('/passes/all');

            setRequests(res.data);

        } catch (error) {

            alert('Unable to load requests');

        }

    }

    useEffect(() => {

        getRequests();

    }, []);

    async function updateStatus(id, status) {

        try {

            const res = await API.put(
                `/passes/status/${id}`,
                { status }
            );

            alert(res.data.message);

            getRequests();

        } catch (error) {

            alert(error.response?.data?.message || 'Update failed');

        }

    }

    return (

        <div className="page">

            <div className="card">

                <h2>Admin - Bus Pass Requests</h2>

                <div className="list-grid">

                    {requests.map((request) => (

                        <div className="pass-item" key={request._id}>

                            <h3>{request.studentName}</h3>

                            <p>From: {request.source}</p>

                            <p>Destination: {request.destination}</p>

                            <p>Bus: {request.busNumber}</p>

                            <p>Duration: {request.duration}</p>

                            <p>Payment: {request.paymentStatus}</p>

                            <span className={`status-badge ${request.status.toLowerCase()}`}>
                                {request.status}
                            </span>

                            <div className="form-actions">

                                {request.paymentStatus === 'Paid' &&
                                 request.status === 'Pending' ? (

                                    <>

                                        <button
                                            className="approve"
                                            onClick={() => updateStatus(
                                                request._id,
                                                'Approved'
                                            )}
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="reject"
                                            onClick={() => updateStatus(
                                                request._id,
                                                'Rejected'
                                            )}
                                        >
                                            Reject
                                        </button>

                                    </>

                                ) : request.paymentStatus !== 'Paid' ? (

                                    <p>Waiting for payment</p>

                                ) : (

                                    <p>Request processed</p>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default Admin;
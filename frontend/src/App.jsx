import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Destination from './pages/Destination';
import Payment from './pages/Payment';
import MyPass from './pages/MyPass';
import Admin from './pages/Admin';

function App() {

    const user = JSON.parse(
        localStorage.getItem('user') || 'null'
    );

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem('user');

        localStorage.removeItem('passId');

        navigate('/');

    }

    return (

        <>

            {user && (

                <nav className="navbar">

                    <h2>College Bus Pass</h2>

                    <div>

                        {user.role === 'student' && (

                            <>
                                <Link to="/destination">Apply Pass</Link>

                                <Link to="/my-pass">My Pass</Link>
                            </>

                        )}

                        {user.role === 'admin' && (

                            <Link to="/admin">Admin Requests</Link>

                        )}

                        <button onClick={logout}>Logout</button>

                    </div>

                </nav>

            )}

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/destination"
                    element={
                        user?.role === 'student'
                            ? <Destination />
                            : <Navigate to="/" />
                    }
                />

                <Route
                    path="/payment"
                    element={
                        user?.role === 'student'
                            ? <Payment />
                            : <Navigate to="/" />
                    }
                />

                <Route
                    path="/my-pass"
                    element={
                        user?.role === 'student'
                            ? <MyPass />
                            : <Navigate to="/" />
                    }
                />

                <Route
                    path="/admin"
                    element={
                        user?.role === 'admin'
                            ? <Admin />
                            : <Navigate to="/" />
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />

            </Routes>

        </>

    );

}

export default App;
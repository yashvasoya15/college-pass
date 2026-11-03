
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Payment() {
    const navigate = useNavigate();

    const passId = localStorage.getItem('passId');

    const [amount, setAmount] = useState(0);
    const [method, setMethod] = useState('UPI');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getAmount() {
            try {
                if (!passId) {
                    alert('Pass ID not found. Please apply again.');
                    navigate('/destination');
                    return;
                }

                const res = await API.get(`/passes/single/${passId}`);

                setAmount(res.data.amount);
            } catch (error) {
                console.log('Amount Error:', error);
                console.log('Server Response:', error.response?.data);

                alert(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        }

        getAmount();
    }, []);

    async function handlePayment() {
        try {
            const res = await API.put(`/passes/payment/${passId}`);

            alert(res.data.message);

            localStorage.removeItem('passId');

            navigate('/my-pass');
        } catch (error) {
            console.log('Payment Error:', error);
            console.log('Server Response:', error.response?.data);

            alert(error.response?.data?.message || error.message);
        }
    }

    if (loading) return <h2>Loading payment...</h2>;

    return (
        <div className="page">
            <div className="form-box">
                <h2>Bus Pass Payment</h2>

                <h1>₹{amount}</h1>

                <p>Select Payment Method</p>

                <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                >
                    <option value="UPI">UPI</option>
                    <option value="Card">Debit / Credit Card</option>
                    <option value="Cash">Cash</option>
                </select>

                <button
                    type="button"
                    onClick={handlePayment}
                    disabled={!amount}
                >
                    Pay ₹{amount}
                </button>

                <p className="muted">
                    Demo payment only. No actual money is charged.
                </p>
            </div>
        </div>
    );
}

export default Payment;

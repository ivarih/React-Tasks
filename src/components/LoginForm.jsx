import { useState } from 'react';
import useForm from '../hooks/useForm';
import { postLogin } from '../hooks/apiHooks';

const LoginForm = ({ onLoginSuccess }) => {
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const doLogin = async (formValues) => {
        setStatusMessage('');
        setErrorMessage('');
        setSubmitting(true);

        try {
            const result = await postLogin({
                username: formValues.username,
                password: formValues.password,
            });

            if (result.token) {
                localStorage.setItem('token', result.token);
            }
            if (result.user) {
                localStorage.setItem('user', JSON.stringify(result.user));
            }

            setStatusMessage(result.message || 'Logged in successfully.');
            if (onLoginSuccess) {
                onLoginSuccess(result);
            }
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(
        {
            username: '',
            password: '',
        },
        doLogin
    );

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div>
                <label htmlFor="login-username">Username</label>
                <input
                    id="login-username"
                    name="username"
                    type="text"
                    value={inputs.username}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="login-password">Password</label>
                <input
                    id="login-password"
                    name="password"
                    type="password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <button type="submit" disabled={submitting}>
                {submitting ? 'Logging in...' : 'Login'}
            </button>

            {statusMessage && <p>{statusMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
};

export default LoginForm;

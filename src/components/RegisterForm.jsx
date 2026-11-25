import { useState } from 'react';
import useForm from '../hooks/useForm';
import { useUser } from '../hooks/apiHooks';

const RegisterForm = ({ onRegisterSuccess }) => {
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { postUser } = useUser();

    const doRegister = async (formValues) => {
        setStatusMessage('');
        setErrorMessage('');
        setSubmitting(true);

        try {
            const result = await postUser({
                username: formValues.username,
                email: formValues.email,
                password: formValues.password,
            });

            resetForm();
            setStatusMessage(result.message || 'Registration successful.');
            if (onRegisterSuccess) {
                onRegisterSuccess(result);
            }
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const { inputs, handleInputChange, handleSubmit, resetForm } = useForm(
        {
            username: '',
            email: '',
            password: '',
        },
        doRegister
    );

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <div>
                <label htmlFor="register-username">Username</label>
                <input
                    id="register-username"
                    name="username"
                    type="text"
                    value={inputs.username}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="register-email">Email</label>
                <input
                    id="register-email"
                    name="email"
                    type="email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="register-password">Password</label>
                <input
                    id="register-password"
                    name="password"
                    type="password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <button type="submit" disabled={submitting}>
                {submitting ? 'Registering...' : 'Register'}
            </button>

            {statusMessage && <p>{statusMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
};

export default RegisterForm;
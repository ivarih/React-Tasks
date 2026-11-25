import useForm from '../hooks/useForm';
import { useUserContext } from '../hooks/contextHooks';

const LoginForm = () => {
    const { handleLogin } = useUserContext();

    const doLogin = async () => {
        try {
            await handleLogin(inputs);
        } catch (e) {
            alert(e.message);
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

            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;

import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Profile = () => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <section>
            <h1>Profile</h1>

            {user ? (
                <div>
                    <p>Logged in as: {user.username || user.email}</p>
                    <button type="button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <p>User profile page.</p>
            )}

            <LoginForm
                onLoginSuccess={(result) => {
                    if (result.user) {
                        setUser(result.user);
                    } else {
                        setUser({ username: 'Authenticated user' });
                    }
                }}
            />

            <RegisterForm />
        </section>
    );
};

export default Profile;

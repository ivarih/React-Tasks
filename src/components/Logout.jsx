import { useUserContext } from '../hooks/contextHooks';

const Logout = () => {
    const { handleLogout } = useUserContext();

    return (
        <button type="button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;

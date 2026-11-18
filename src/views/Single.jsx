import { useLocation, useNavigate } from 'react-router';

const Single = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const item = state;

    if (!item) {
        return (
            <div>
                <p>No media item selected.</p>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>Go back</button>
            <h3>{item.title}</h3>
            <p>Owner: {item.username}</p>
            {item.media_type.includes('video') ? (
                <video src={item.filename} controls />
            ) : (
                <img src={item.filename} alt={item.title} />
            )}
            <p>{item.description}</p>
        </div>
    );
};

export default Single;

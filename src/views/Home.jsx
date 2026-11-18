import { useState, useEffect } from 'react';
import MediaRow from '../components/MediaRow';
import { fetchData } from '../utils/fetchData';

const Home = () => {
    const [mediaArray, setMediaArray] = useState([]);

    useEffect(() => {
        const getMedia = async () => {
            try {
                const mediaItems = await fetchData(
                    import.meta.env.VITE_MEDIA_API + '/media'
                );

                const itemsWithUsers = await Promise.all(
                    mediaItems.map(async (item) => {
                        const user = await fetchData(
                            `${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`
                        );
                        return { ...item, username: user.username };
                    })
                );

                setMediaArray(itemsWithUsers);
            } catch (error) {
                console.error('Error fetching media or users:', error);
            }
        };

        getMedia();
    }, []);

    return (
        <>
            <h2>My Media</h2>
            <table>
                <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Size</th>
                    <th>Type</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                {mediaArray.map((item) => (
                    <MediaRow key={item.media_id} item={item} />
                ))}
                </tbody>
            </table>
        </>
    );
};

export default Home;

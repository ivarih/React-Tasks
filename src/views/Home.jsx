import {useState} from 'react';
import {useMedia} from '../hooks/apiHooks';
import Single from './Single';
import MediaRow from '../components/MediaRow';

const Home = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const {mediaArray} = useMedia();

    return (
        <>
            <Single item={selectedItem} setSelectedItem={setSelectedItem} />
            <table>
                <tbody>
                {mediaArray.map((mediaItem) => (
                    <MediaRow
                        key={mediaItem.media_id}
                        item={mediaItem}
                        setSelectedItem={setSelectedItem}
                    />
                ))}
                </tbody>
            </table>
        </>
    );
};

export default Home;

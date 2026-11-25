import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const getMedia = async () => {
        try {
            const mediaData = await fetchData(
                `${import.meta.env.VITE_MEDIA_API}/media`,
            );
            setMediaArray(mediaData);
        } catch (error) {
            console.error('Error fetching media:', error);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    return {mediaArray};
};

export {useMedia};

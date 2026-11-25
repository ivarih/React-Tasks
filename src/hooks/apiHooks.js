import { useEffect, useState } from 'react';

const MEDIA_API = import.meta.env.VITE_MEDIA_API;
const AUTH_API = import.meta.env.VITE_AUTH_API || MEDIA_API;
const UPLOAD_SERVER = import.meta.env.VITE_UPLOAD_SERVER;

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMedia = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${MEDIA_API}/media`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMediaArray(Array.isArray(data) ? data : data.media || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getMedia();
    }, []);

    const postMedia = async (fileData, inputs, token) => {
        const mediaPayload = {
            title: inputs.title,
            description: inputs.description,
            filename: fileData.filename || fileData.data?.filename,
            filesize: fileData.filesize || fileData.data?.filesize || file.size,
            media_type:
                fileData.media_type || fileData.data?.media_type || fileData.mimetype,
        };

        const response = await fetch(`${MEDIA_API}/media`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(mediaPayload),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create media item');
        }
        return data;
    };

    return { mediaArray, loading, error, postMedia };
};

const useFile = () => {
    const postFile = async (file, token) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${UPLOAD_SERVER}/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'File upload failed');
        }
        return data;
    };

    return { postFile };
};

const useAuthentication = () => {
    const postLogin = async (credentials) => {
        const response = await fetch(`${AUTH_API}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        return data;
    };

    return { postLogin };
};

const useUser = () => {
    const postUser = async (userData) => {
        const response = await fetch(`${AUTH_API}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        return data;
    };

    const getUserByToken = async (token) => {
        const response = await fetch(`${AUTH_API}/users/token`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to get user from token');
        }
        return data;
    };

    return { postUser, getUserByToken };
};

export { useMedia, useFile, useAuthentication, useUser };


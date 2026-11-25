import { useState } from 'react';
import useForm from '../hooks/useForm';
import { postMedia } from '../hooks/apiHooks';

const Upload = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const doUpload = async (formValues) => {
        setStatusMessage('');
        setErrorMessage('');

        if (!formValues.file) {
            setErrorMessage('Please select a file before uploading.');
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', formValues.title);
            formData.append('description', formValues.description);
            formData.append('file', formValues.file);

            const token = localStorage.getItem('token');
            const result = await postMedia(formData, token);

            resetForm();
            setStatusMessage(result.message || 'Media uploaded successfully.');
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const { inputs, handleInputChange, handleSubmit, resetForm } = useForm(
        {
            title: '',
            description: '',
            file: null,
        },
        doUpload
    );

    return (
        <section>
            <h1>Upload Media</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="upload-title">Title</label>
                    <input
                        id="upload-title"
                        name="title"
                        type="text"
                        value={inputs.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="upload-description">Description</label>
                    <textarea
                        id="upload-description"
                        name="description"
                        rows="4"
                        value={inputs.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="upload-file">File</label>
                    <input
                        id="upload-file"
                        name="file"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" disabled={submitting}>
                    {submitting ? 'Uploading...' : 'Upload'}
                </button>

                {statusMessage && <p>{statusMessage}</p>}
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </section>
    );
};

export default Upload;

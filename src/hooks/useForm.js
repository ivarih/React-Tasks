import { useState } from 'react';

const useForm = (initialValues, onSubmitCallback) => {
    const [inputs, setInputs] = useState(initialValues);

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;

        if (type === 'file') {
            setInputs((prev) => ({
                ...prev,
                [name]: files && files[0] ? files[0] : null,
            }));
            return;
        }

        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        if (onSubmitCallback) {
            await onSubmitCallback(inputs);
        }
    };

    const resetForm = () => {
        setInputs(initialValues);
    };

    return {
        inputs,
        setInputs,
        handleInputChange,
        handleSubmit,
        resetForm,
    };
};

export default useForm;

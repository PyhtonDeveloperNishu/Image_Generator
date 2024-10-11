import axios from 'axios';
import { useState, useEffect } from 'react';
import TextInput from './TextInput';
import ErrorMsz from './ErrorMsz';
import ImageDis from './ImageDis';
import style from './TextToImage.module.css'


function TextToImage() {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleGenerate = () => {
        if (!text) {
            alert('Please enter a text description.');
            return;
        }
        setShouldFetch(true); // Set to true to trigger the API call
    };

    useEffect(() => {
        const fetchImage = async () => {
            if (!shouldFetch) return;

            setError('');
            setImage(null); // Clear the previous image if any
            setLoading(true);

            const API_URL = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev';
            const API_KEY = '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';

            try {
                const response = await axios.post(
                    API_URL,
                    { inputs: text },
                    {
                        headers: {
                            Authorization: `Bearer ${API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        responseType: 'blob',
                    }
                );

                const imageUrl = URL.createObjectURL(response.data);
                setImage(imageUrl);
                setShouldFetch(false); // Reset to false after fetching

            } catch (error) {
                console.error('Error fetching image:', error);
                setError('An error occurred while generating the image.');
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [shouldFetch, text]); // Dependency array with `shouldFetch`
  
    return (
        <>
            <div className={style.img_con}>
            <TextInput value={text} onChange={handleTextChange} onGen={handleGenerate} />
            {loading && <p>Loading...</p>}
            {error && <ErrorMsz masz={error} />}
            {image && <ImageDis imgUrl={image} />}
            </div>
        </>
    );
}

export default TextToImage;

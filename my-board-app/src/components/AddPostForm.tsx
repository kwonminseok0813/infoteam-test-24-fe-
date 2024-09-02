import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPostForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);

        if (image) {
            formData.append('image', image);
        }

        const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

        try {
            const response = await axios.post('/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Post added successfully:', response.data);
            navigate('/'); // 홈으로 이동
        } catch (error) {
            console.error('Error uploading post:', error);
            alert('Failed to upload the post.');
        }
    };

    return (
        <div>
            <h2>Upload Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea 
                        value={body}
                        onChange={(e) => setBody(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                    />
                </div>
                <button type="submit">Upload Post</button>
            </form>
        </div>
    );
};

export default AddPostForm;

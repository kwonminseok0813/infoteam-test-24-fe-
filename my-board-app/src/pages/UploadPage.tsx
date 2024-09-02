
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

const UploadPage: React.FC = () => {
   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const [tags, setTags] = useState<string[]>(['defaultTag']); 
   const [image, setImage] = useState<File | null>(null);
   const navigate = useNavigate();
   const { auth, refreshAccessToken } = useAuth();

   // 고정된 board UUID
   const boardUuid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

   useEffect(() => {
       if (!auth || !auth.accessToken) {
           alert('You must be logged in to upload a post.');
           navigate('/login');
       }
   }, [auth, navigate]);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       if (e.target.files && e.target.files[0]) {
           setImage(e.target.files[0]);
       }
   };

   const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setTags(e.target.value.split(',').map(tag => tag.trim())); // 콤마로 구분된 태그 입력받기
   };

   const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();

       const token = auth?.accessToken;
       const postData = {
           title,
           body,
           tags // tags를 필드에 추가합니다.
       };

       try {
           const response = await axios.post(`/api/posts?boardUuid=${boardUuid}`, postData, {
               headers: {
                   'Authorization': `Bearer ${token}`,
                   'Content-Type': 'application/json', // JSON 형식으로 설정합니다.
               },
           });

           console.log('Post added successfully:', response.data);
           navigate('/');
       } catch (error) {
           if (axios.isAxiosError(error)) {
               if (error.response) {
                   // 서버에서 반환한 에러 메시지 상세 검토
                   console.error('Detailed server error response:', error.response.data); 
                   alert('Failed to upload the post: ' + JSON.stringify(error.response.data));
               } else {
                   console.error('Error without response:', error.message);
                   alert('Failed to upload the post: An unknown error occurred.');
               }
           }
       }
   };

   return (
       <div>
           <h2>Upload Post</h2>
           <form onSubmit={handleSubmit}>
               <div>
                   <label>Title:</label>
                   <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
               </div>
               <div>
                   <label>Body:</label>
                   <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
               </div>
               <div>
                   <label>Tags:</label>
                   <input 
                       type="text" 
                       value={tags.join(', ')} 
                       onChange={handleTagChange} 
                       placeholder="Enter tags, separated by commas" 
                       required 
                   />
               </div>
               <div>
                   <label>Image:</label>
                   <input type="file" accept="image/*" onChange={handleFileChange} />
               </div>
               <button type="submit">Upload Post</button>
           </form>
       </div>
   );
};

export default UploadPage;
export interface Credentials {
   email: string; // 사용자 이름
   accessToken: string; 
   refreshToken: string;
}





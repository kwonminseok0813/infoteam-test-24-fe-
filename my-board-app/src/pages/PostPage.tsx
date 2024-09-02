import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Post } from '../types/Post';

const fetchPostById = async (postId: string): Promise<Post> => {
    const response = await axios.get<Post>(`https://api.2024.newbies.gistory.me/posts/${postId}`);
  return response.data;
};

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // URL로부터 파라미터 가져오기


   const { data, error, isLoading } = useQuery<Post, AxiosError>(
       ['post', id],
       () => fetchPostById(id!),
      {
           enabled: !!id, // id가 존재할 때만 쿼리 실행
       }
   );

  
   if (isLoading) return <div>Loading...</div>;

   // 에러 상태 처리
   if (error) {
    }

   return (
       <div>
            <h1>{data?.title}</h1> {/* 제목 */}
           <p>{data?.body}</p>   {/* 본문 */}
        </div>
   );
};

export default PostPage;
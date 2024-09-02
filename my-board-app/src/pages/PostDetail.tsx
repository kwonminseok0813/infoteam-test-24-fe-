import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Post } from '../types/Post';

const fetchPostById = async (postId: string): Promise<Post> => {
    const response = await axios.get<Post>(`/api/posts/${postId}`);
    return response.data;
};

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // URL 파라미터에서 id 가져오기
    const { data, error, isLoading } = useQuery<Post, AxiosError>(
        ['post', id], 
        () => fetchPostById(id!), // ID가 확실하기 때문에 Non-null assertion (!) 사용
        {
            enabled: !!id, // id가 존재할 때만 쿼리 실행
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.error(error);
        return <div>Error loading post: {error.message}</div>;
    }

    return (
        <div>
            <h1>{data?.title}</h1> {/* 제목 */}
            <p>{data?.body}</p>   {/* 본문 */}
        </div>
    );
};

export default PostDetail;

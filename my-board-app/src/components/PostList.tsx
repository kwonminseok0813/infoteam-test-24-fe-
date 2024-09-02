import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Post } from '../types/Post';

const fetchPosts = async (): Promise<{ count: number; list: Post[] }> => {
    const response = await axios.get<{ count: number; list: Post[] }>('/api/posts');
    return response.data;
};

const PostList: React.FC = () => {
    const { data, error, isLoading } = useQuery<{ count: number; list: Post[] }, AxiosError>('posts', fetchPosts);

    if (isLoading) return <div>Loading...</div>;

    if (error) {
        console.error(error);
        return <div>Error loading posts: {error.message}</div>;
    }

    const posts = data?.list;

    if (!Array.isArray(posts) || posts.length === 0) {
        return <div>No posts available.</div>;
    }

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    );
};

export default PostList;




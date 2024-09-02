import React from 'react';
import PostList from '../components/PostList';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../components/AuthProvider'; 

const Home: React.FC = () => {
    const { auth, logout } = useAuth(); 

    return (
        <div>
            <h1>게시판</h1>
            {auth ? ( 
                <div>
                    <p>Hello, {auth.email}</p> 
                    <button onClick={logout}>Logout</button> {/* 로그아웃 버튼 */}
                    <Link to="/upload">Add Post</Link> {/* 게시물 추가 링크 */}
                    <PostList /> {/* 게시물 목록 */}
                </div>
            ) : (
                <div>
                    <Link to="/login">Login</Link> {/* 로그인 버튼 */}
                    <Link to="/register">Register</Link> {/* 등록 버튼 추가 */}
                </div>
            )}
        </div>
    );
};

export default Home;


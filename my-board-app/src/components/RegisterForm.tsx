import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 페이지 리디렉션을 위한 navigate 훅

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // 프록시를 사용한 요청
            const response = await axios.post('/api/auth/register', {
                nickname,
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json', // 요청 내용의 유형
                },
            });
            alert('Registration successful! You can log in now.');
            navigate('/login'); // 등록 완료 후 로그인 페이지로 이동
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error registering:', error);
                alert('Failed to register: ' + (error.response?.data.error || error.message)); // 응답 오류 메시지
            } else {
                console.error('Unexpected error:', error);
                alert('Failed to register.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button> {/* 등록 버튼 */}
        </form>
    );
};

export default RegisterForm;


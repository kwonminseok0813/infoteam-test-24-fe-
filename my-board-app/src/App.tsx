import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './components/AuthProvider';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail'; 
import UploadPage from './pages/UploadPage'; 
import NotFound from './pages/NotFound'; 
import LoginForm from './components/LoginForm'; 
import RegisterForm from './components/RegisterForm'; // RegisterForm import 추가


const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                        <Route path="/upload" element={<UploadPage />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} /> {/* 등록 페이지 경로 추가 */}
                        <Route path="*" element={<NotFound />} />
                        
                    </Routes>
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;



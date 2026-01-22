import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
// import Projects from './components/Projects';
// import Blog from './components/Blog';
import Contact from './components/Contact';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import SignInPage from './pages/SignInPage';
import AdminDashboard from './pages/AdminDashboard';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import { setupSmoothScroll } from './utils/gsap';

// Home Page Component
const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      {/* <Projects />
      <Blog /> */}
      <Contact />
      
      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Oluwaferanmi Adeniji. 
          </p>
        </div>
      </footer>
    </>
  );
};

function App() {
  useEffect(() => {
    // Setup GSAP smooth scrolling
    setupSmoothScroll();
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-black">
            <CustomCursor />
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Header />
                <HomePage />
              </>
            } />
            <Route path="/blogs" element={
              <>
                <Header />
                <BlogsPage />
              </>
            } />
            <Route path="/blog/:slug" element={
              <>
                <Header />
                <BlogDetailPage />
              </>
            } />
            <Route path="/signin" element={<SignInPage />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/create" element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/edit/:id" element={
              <ProtectedRoute>
                <EditPostPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
      </AuthProvider>
      </ErrorBoundary>
  );
}

export default App;
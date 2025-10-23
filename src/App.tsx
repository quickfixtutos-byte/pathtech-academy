import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import InstructorsPage from './pages/InstructorsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'courses':
        return <CoursesPage />;
      case 'about':
        return <AboutPage />;
      case 'instructors':
        return <InstructorsPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={setCurrentPage} />;
      case 'reset-password':
        return <ResetPasswordPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return (
          <ProtectedRoute onUnauthorized={() => setCurrentPage('login')}>
            <StudentDashboardPage />
          </ProtectedRoute>
        );
      case 'admin':
        return (
          <ProtectedRoute requireAdmin={true} onUnauthorized={() => setCurrentPage('login')}>
            <AdminDashboardPage />
          </ProtectedRoute>
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  const authPages = ['login', 'register', 'forgot-password', 'reset-password', 'dashboard', 'admin'];
  const hideHeaderFooter = authPages.includes(currentPage);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
        {!hideHeaderFooter && <Header currentPage={currentPage} onNavigate={setCurrentPage} />}
        <main>{renderPage()}</main>
        {!hideHeaderFooter && <Footer onNavigate={setCurrentPage} />}
      </div>
    </AuthProvider>
  );
}

export default App;

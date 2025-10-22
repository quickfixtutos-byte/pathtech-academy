import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import InstructorsPage from './pages/InstructorsPage';
import ContactPage from './pages/ContactPage';
import StudentDashboardPage from './pages/StudentDashboardPage';

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
      case 'dashboard':
        return <StudentDashboardPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  const isDashboard = currentPage === 'dashboard';

  return (
    <div className="min-h-screen bg-white">
      {!isDashboard && <Header currentPage={currentPage} onNavigate={setCurrentPage} />}
      <main>{renderPage()}</main>
      {!isDashboard && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;

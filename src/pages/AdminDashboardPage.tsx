import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, BookOpen, Award, TrendingUp, Settings as SettingsIcon, LogOut } from 'lucide-react';
import CourseManagement from '../components/admin/CourseManagement';

type ViewType = 'overview' | 'courses' | 'students' | 'settings';

export default function AdminDashboardPage() {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const stats = [
    { label: 'Total Students', value: 156, icon: Users, color: 'blue' },
    { label: 'Total Courses', value: 24, icon: BookOpen, color: 'green' },
    { label: 'Certificates Issued', value: 89, icon: Award, color: 'amber' },
    { label: 'Active Enrollments', value: 342, icon: TrendingUp, color: 'purple' },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
              <p className="text-slate-600">
                Welcome back, {user?.user_metadata?.full_name || 'Admin'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 text-blue-600 border-blue-200',
                  green: 'bg-green-50 text-green-600 border-green-200',
                  amber: 'bg-amber-50 text-amber-600 border-amber-200',
                  purple: 'bg-purple-50 text-purple-600 border-purple-200',
                };
                return (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-6 ${colorClasses[stat.color as keyof typeof colorClasses]} hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon className="w-8 h-8 mb-3" />
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm font-medium opacity-80">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setCurrentView('courses')}
                  className="p-6 border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-200 text-left"
                >
                  <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-1">Manage Courses</h3>
                  <p className="text-sm text-slate-600">Add, edit, or remove courses</p>
                </button>
                <button
                  onClick={() => setCurrentView('students')}
                  className="p-6 border-2 border-green-200 rounded-xl hover:bg-green-50 transition-all duration-200 text-left"
                >
                  <Users className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-1">View Students</h3>
                  <p className="text-sm text-slate-600">Manage student accounts</p>
                </button>
                <button
                  onClick={() => setCurrentView('settings')}
                  className="p-6 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200 text-left"
                >
                  <SettingsIcon className="w-8 h-8 text-slate-600 mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-1">Settings</h3>
                  <p className="text-sm text-slate-600">Configure platform settings</p>
                </button>
              </div>
            </div>
          </div>
        );
      case 'courses':
        return <CourseManagement />;
      case 'students':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Student Management</h2>
            <p className="text-slate-600">Student management interface coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Platform Settings</h2>
            <p className="text-slate-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img
                src="/no_background_white.png"
                alt="PathTech Academy"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-slate-800">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => (window.location.href = '/')}
                className="text-sm text-slate-600 hover:text-slate-800 font-medium"
              >
                View Site
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview' as ViewType, label: 'Overview' },
            { id: 'courses' as ViewType, label: 'Courses' },
            { id: 'students' as ViewType, label: 'Students' },
            { id: 'settings' as ViewType, label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                currentView === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderView()}
      </div>
    </div>
  );
}

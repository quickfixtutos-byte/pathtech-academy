import { useState } from 'react';
import { BookOpen, Clock, Star, Search, Filter, Play } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  isFavorite: boolean;
  lastAccessed: string;
}

interface MyCoursesProps {
  showAll?: boolean;
}

export default function MyCoursesSection({ showAll = false }: MyCoursesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Python Programming',
      category: 'Informatique',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 65,
      lessonsCompleted: 13,
      totalLessons: 20,
      isFavorite: true,
      lastAccessed: '2 hours ago',
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals',
      category: 'IA',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 40,
      lessonsCompleted: 8,
      totalLessons: 20,
      isFavorite: true,
      lastAccessed: '1 day ago',
    },
    {
      id: '3',
      title: 'Microsoft Excel Mastery',
      category: 'Bureautique',
      thumbnail: 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 100,
      lessonsCompleted: 15,
      totalLessons: 15,
      isFavorite: false,
      lastAccessed: '3 days ago',
    },
    {
      id: '4',
      title: 'Web Development with React',
      category: 'Informatique',
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 25,
      lessonsCompleted: 5,
      totalLessons: 20,
      isFavorite: false,
      lastAccessed: '5 days ago',
    },
    {
      id: '5',
      title: 'Data Science with Python',
      category: 'IA',
      thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 15,
      lessonsCompleted: 3,
      totalLessons: 20,
      isFavorite: false,
      lastAccessed: '1 week ago',
    },
  ];

  const categories = ['all', 'Informatique', 'IA', 'Bureautique'];

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedCourses = showAll ? filteredCourses : filteredCourses.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 sm:mb-0">My Courses</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCourses.map((course) => (
          <div
            key={course.id}
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <button
                  className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    course.isFavorite
                      ? 'bg-amber-500 text-white'
                      : 'bg-white/80 text-slate-600 hover:bg-amber-500 hover:text-white'
                  }`}
                >
                  <Star className="w-4 h-4" fill={course.isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                  {course.category}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 line-clamp-2">
                {course.title}
              </h3>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                  <span className="font-medium">{course.progress}% Complete</span>
                  <span className="text-slate-500">
                    {course.lessonsCompleted}/{course.totalLessons} lessons
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center text-sm text-slate-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.lastAccessed}
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Play className="w-4 h-4" />
                  <span className="font-medium">Continue</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">No courses found</p>
        </div>
      )}

      {!showAll && filteredCourses.length > 3 && (
        <div className="text-center mt-6">
          <button className="px-6 py-3 text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-lg transition-colors">
            View All Courses →
          </button>
        </div>
      )}
    </div>
  );
}

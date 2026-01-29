import { useState } from 'react';
import { Play, Download, User, Clock, ChevronLeft } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  duration: string;
  teacher: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  teacher: string;
  teacherBio?: string;
  videos: Video[];
}

interface CourseDetailViewProps {
  courseId: string;
  onBack: () => void;
}

const mockCourseDetails: Record<string, CourseDetail> = {
  '1': {
    id: '1',
    title: 'Introduction to Python Programming',
    description: 'Learn Python from scratch with hands-on projects and real-world examples. This comprehensive course covers basics, data structures, functions, and more.',
    teacher: 'Dr. Sarah Anderson',
    teacherBio: 'Expert software engineer with 15+ years of experience in Python development.',
    videos: [
      {
        id: 'v1',
        title: 'Getting Started with Python',
        duration: '12:45',
        teacher: 'Dr. Sarah Anderson',
        attachmentUrl: '#',
        attachmentName: 'intro-setup.pdf',
      },
      {
        id: 'v2',
        title: 'Variables and Data Types',
        duration: '18:30',
        teacher: 'Dr. Sarah Anderson',
        attachmentUrl: '#',
        attachmentName: 'datatypes-guide.pdf',
      },
      {
        id: 'v3',
        title: 'Control Flow and Loops',
        duration: '22:15',
        teacher: 'Dr. Sarah Anderson',
        attachmentUrl: '#',
        attachmentName: 'control-flow.pdf',
      },
      {
        id: 'v4',
        title: 'Functions and Scope',
        duration: '19:50',
        teacher: 'Dr. Sarah Anderson',
        attachmentUrl: '#',
        attachmentName: 'functions-scope.pdf',
      },
      {
        id: 'v5',
        title: 'Working with Lists and Dictionaries',
        duration: '25:40',
        teacher: 'Dr. Sarah Anderson',
        attachmentUrl: '#',
        attachmentName: 'collections.pdf',
      },
    ],
  },
  '2': {
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Master the fundamentals of machine learning including supervised learning, unsupervised learning, and model evaluation.',
    teacher: 'Prof. Michael Chen',
    teacherBio: 'ML researcher and educator specializing in deep learning and neural networks.',
    videos: [
      {
        id: 'v1',
        title: 'Introduction to Machine Learning',
        duration: '15:20',
        teacher: 'Prof. Michael Chen',
        attachmentUrl: '#',
        attachmentName: 'ml-intro.pdf',
      },
      {
        id: 'v2',
        title: 'Supervised Learning Basics',
        duration: '21:45',
        teacher: 'Prof. Michael Chen',
        attachmentUrl: '#',
        attachmentName: 'supervised-learning.pdf',
      },
      {
        id: 'v3',
        title: 'Unsupervised Learning',
        duration: '19:30',
        teacher: 'Prof. Michael Chen',
        attachmentUrl: '#',
        attachmentName: 'unsupervised-learning.pdf',
      },
    ],
  },
};

export default function CourseDetailView({
  courseId,
  onBack,
}: CourseDetailViewProps) {
  const course = mockCourseDetails[courseId];
  const [currentVideoId, setCurrentVideoId] = useState(course?.videos[0]?.id || '');

  if (!course) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-slate-600">Course not found</p>
      </div>
    );
  }

  const currentVideo = course.videos.find((v) => v.id === currentVideoId);

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Courses
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Video Player and Playlist */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main Video Player */}
            <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
              {currentVideo ? (
                <div className="text-center text-white space-y-4">
                  <Play className="w-16 h-16 mx-auto opacity-50" />
                  <div>
                    <p className="text-lg font-semibold">{currentVideo.title}</p>
                    <p className="text-sm text-slate-400">
                      Video player would display here
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Course Title and Description */}
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-3">
                {course.title}
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Teacher Info and Current Video Attachments */}
            {currentVideo && (
              <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {currentVideo.teacher}
                    </p>
                    {course.teacherBio && (
                      <p className="text-sm text-slate-600">{course.teacherBio}</p>
                    )}
                  </div>
                </div>

                {currentVideo.attachmentUrl && (
                  <div className="border-t border-blue-100 pt-4">
                    <p className="text-sm font-semibold text-slate-700 mb-3">
                      Attachments for this video:
                    </p>
                    <a
                      href={currentVideo.attachmentUrl}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {currentVideo.attachmentName || 'Download'}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-xl p-4 max-h-[600px] overflow-y-auto">
              <h3 className="font-bold text-slate-800 mb-4 text-lg">Playlist</h3>
              <div className="space-y-2">
                {course.videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setCurrentVideoId(video.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      currentVideoId === video.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {currentVideoId === video.id && (
                        <Play className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm line-clamp-2">
                          {video.title}
                        </p>
                        <div
                          className={`flex items-center gap-1 mt-1 text-xs ${
                            currentVideoId === video.id
                              ? 'text-blue-100'
                              : 'text-slate-500'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          {video.duration}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Playlist View */}
      <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-slate-800 mb-4 text-lg">Playlist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {course.videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setCurrentVideoId(video.id)}
              className={`p-4 rounded-lg transition-all duration-200 text-left ${
                currentVideoId === video.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <p className="font-medium text-sm line-clamp-2 mb-2">
                {video.title}
              </p>
              <div
                className={`flex items-center gap-1 text-xs ${
                  currentVideoId === video.id
                    ? 'text-blue-100'
                    : 'text-slate-500'
                }`}
              >
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

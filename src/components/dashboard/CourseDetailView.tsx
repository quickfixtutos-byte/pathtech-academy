import { useState } from 'react';
import { Play, Download, User, Clock, ChevronLeft, CheckCircle, Zap, BookOpen, FileText } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  duration: string;
  teacher: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

interface Exercise {
  id: string;
  title: string;
  type: 'video' | 'practical';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  completed?: boolean;
}

interface SummarySection {
  title: string;
  content: string;
}

interface ResumeSummary {
  keyPoints: string[];
  sections: SummarySection[];
  downloadUrl?: string;
}

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  teacher: string;
  teacherBio?: string;
  videos: Video[];
  exercises?: Exercise[];
  summary?: ResumeSummary;
}

interface CourseDetailViewProps {
  courseId: string;
  onBack: () => void;
}

type SidebarTab = 'content' | 'exercises' | 'summary';

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
    exercises: [
      {
        id: 'e1',
        title: 'Hello World & Environment Setup',
        type: 'practical',
        difficulty: 'beginner',
        duration: '15:00',
        completed: true,
      },
      {
        id: 'e2',
        title: 'Data Types Challenge',
        type: 'practical',
        difficulty: 'beginner',
        duration: '20:00',
        completed: true,
      },
      {
        id: 'e3',
        title: 'Building a Calculator',
        type: 'practical',
        difficulty: 'intermediate',
        duration: '30:00',
        completed: false,
      },
      {
        id: 'e4',
        title: 'Working with Collections',
        type: 'practical',
        difficulty: 'intermediate',
        duration: '25:00',
        completed: false,
      },
    ],
    summary: {
      keyPoints: [
        'Python is a versatile, beginner-friendly programming language',
        'Variables store data; data types determine what operations are possible',
        'Control flow structures (if/else, loops) control program execution',
        'Functions encapsulate code for reuse and organization',
        'Lists and dictionaries are essential data structures for storing collections',
      ],
      sections: [
        {
          title: 'Core Concepts',
          content: 'Python syntax, variables, data types (int, float, str, bool), and type conversion are the building blocks of any Python program.',
        },
        {
          title: 'Control Structures',
          content: 'Use if/elif/else for conditional execution and for/while loops for repetition. Understanding control flow is crucial for writing effective programs.',
        },
        {
          title: 'Functions',
          content: 'Functions are reusable blocks of code that accept parameters and return values. They help organize code and reduce repetition.',
        },
        {
          title: 'Data Structures',
          content: 'Lists are ordered, mutable collections. Dictionaries are unordered key-value stores. Both are essential for managing complex data.',
        },
      ],
      downloadUrl: '#course-summary.pdf',
    },
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
    exercises: [
      {
        id: 'e1',
        title: 'Dataset Exploration',
        type: 'practical',
        difficulty: 'beginner',
        duration: '20:00',
        completed: true,
      },
      {
        id: 'e2',
        title: 'Building Your First Classifier',
        type: 'practical',
        difficulty: 'intermediate',
        duration: '40:00',
        completed: false,
      },
    ],
    summary: {
      keyPoints: [
        'Machine Learning enables computers to learn from data without explicit programming',
        'Supervised Learning uses labeled data to train predictive models',
        'Unsupervised Learning discovers patterns in unlabeled data',
        'Proper data preprocessing is critical for model success',
        'Model evaluation metrics must be chosen based on the problem type',
      ],
      sections: [
        {
          title: 'What is Machine Learning?',
          content: 'ML is a subset of AI where algorithms learn patterns from data to make predictions or decisions.',
        },
        {
          title: 'Supervised Learning',
          content: 'Algorithms trained on labeled examples. Used for regression and classification tasks.',
        },
        {
          title: 'Unsupervised Learning',
          content: 'Algorithms discover hidden patterns in unlabeled data. Used for clustering and dimensionality reduction.',
        },
      ],
      downloadUrl: '#ml-summary.pdf',
    },
  },
};

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}

function TabButton({ icon, label, isActive, onClick, badge }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 font-medium text-sm transition-all duration-150 border-b-2 ${
        isActive
          ? 'text-blue-600 border-b-blue-600 bg-blue-50'
          : 'text-slate-600 border-b-transparent hover:bg-slate-100'
      }`}
    >
      {icon}
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="ml-1 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full font-semibold">
          {badge}
        </span>
      )}
    </button>
  );
}

interface ContentSectionProps {
  videos: Video[];
  currentVideoId: string;
  onVideoSelect: (videoId: string) => void;
  totalVideos: number;
  currentIndex: number;
}

function ContentSection({
  videos,
  currentVideoId,
  onVideoSelect,
  totalVideos,
  currentIndex,
}: ContentSectionProps) {
  return (
    <>
      <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-transparent sticky top-0 z-10">
        <p className="text-xs font-semibold text-slate-600">
          {currentIndex + 1} of {totalVideos}
        </p>
      </div>
      <div>
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => onVideoSelect(video.id)}
            className={`w-full text-left px-4 py-3.5 border-b border-slate-100 transition-all duration-150 group last:border-b-0 ${
              currentVideoId === video.id
                ? 'bg-blue-50 border-l-4 border-l-blue-600'
                : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
                  currentVideoId === video.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                }`}
              >
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium line-clamp-2 ${
                    currentVideoId === video.id
                      ? 'text-slate-800'
                      : 'text-slate-700'
                  }`}
                >
                  {video.title}
                </p>
                <div
                  className={`flex items-center gap-1.5 mt-1.5 text-xs ${
                    currentVideoId === video.id
                      ? 'text-blue-600'
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
    </>
  );
}

interface ExercisesSectionProps {
  exercises: Exercise[];
}

function ExercisesSection({ exercises }: ExercisesSectionProps) {
  if (exercises.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <Zap className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-600 font-medium">No exercises yet</p>
        <p className="text-xs text-slate-500 mt-1">
          Check back soon for practice exercises
        </p>
      </div>
    );
  }

  const completedCount = exercises.filter((e) => e.completed).length;

  return (
    <>
      <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-transparent sticky top-0 z-10">
        <p className="text-xs font-semibold text-slate-600">
          {completedCount} of {exercises.length} completed
        </p>
      </div>
      <div>
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="px-4 py-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold transition-colors ${
                  exercise.completed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                }`}
              >
                {exercise.completed ? '✓' : '○'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 line-clamp-2">
                  {exercise.title}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      exercise.difficulty === 'beginner'
                        ? 'bg-emerald-100 text-emerald-700'
                        : exercise.difficulty === 'intermediate'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {exercise.difficulty}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {exercise.duration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

interface SummarySectionProps {
  summary?: ResumeSummary;
}

function SummarySection({ summary }: SummarySectionProps) {
  if (!summary) {
    return (
      <div className="px-4 py-12 text-center">
        <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-600 font-medium">No summary available</p>
        <p className="text-xs text-slate-500 mt-1">
          Summary will be available after course completion
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {/* Key Points */}
      <div className="px-4 py-4">
        <h4 className="font-semibold text-slate-800 text-sm mb-3">Key Points</h4>
        <ul className="space-y-2">
          {summary.keyPoints.map((point, idx) => (
            <li key={idx} className="flex gap-2 text-xs text-slate-600">
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sections */}
      {summary.sections.map((section, idx) => (
        <div key={idx} className="px-4 py-4">
          <h4 className="font-semibold text-slate-800 text-sm mb-2">
            {section.title}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">{section.content}</p>
        </div>
      ))}

      {/* Download */}
      {summary.downloadUrl && (
        <div className="px-4 py-4">
          <a
            href={summary.downloadUrl}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Download Summary
          </a>
        </div>
      )}
    </div>
  );
}

export default function CourseDetailView({
  courseId,
  onBack,
}: CourseDetailViewProps) {
  const course = mockCourseDetails[courseId];
  const [currentVideoId, setCurrentVideoId] = useState(course?.videos[0]?.id || '');
  const [activeTab, setActiveTab] = useState<SidebarTab>('content');

  if (!course) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-slate-600">Course not found</p>
      </div>
    );
  }

  const currentVideo = course.videos.find((v) => v.id === currentVideoId);
  const currentVideoIndex = course.videos.findIndex((v) => v.id === currentVideoId);
  const totalDuration = course.videos.reduce((sum, v) => {
    const [minutes, seconds] = v.duration.split(':').map(Number);
    return sum + minutes * 60 + seconds;
  }, 0);
  const totalMinutes = Math.round(totalDuration / 60);

  return (
    <div className="min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Courses</span>
            </button>
            <div className="text-sm text-slate-500">
              Lesson {currentVideoIndex + 1} of {course.videos.length}
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              {course.title}
            </h1>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentVideoIndex + 1) / course.videos.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Main Learning Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video flex items-center justify-center bg-slate-950">
                {currentVideo ? (
                  <div className="text-center text-white space-y-4">
                    <Play className="w-20 h-20 mx-auto opacity-40" />
                    <div>
                      <p className="text-xl font-semibold">{currentVideo.title}</p>
                      <p className="text-sm text-slate-400 mt-2">
                        Video player integration area
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Course Meta */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-sm font-semibold text-slate-600">Total Duration</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    {totalMinutes}
                    <span className="text-lg text-slate-500"> min</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600">Total Lessons</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    {course.videos.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600">Completion</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">
                    {Math.round(((currentVideoIndex + 1) / course.videos.length) * 100)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">
                About this course
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {course.description}
              </p>
            </div>

            {/* Current Lesson Details */}
            {currentVideo && (
              <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-200">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                      Current Lesson
                    </p>
                    <h3 className="text-xl font-bold text-slate-800 mt-2">
                      {currentVideo.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{currentVideo.duration}</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span>Lesson {currentVideoIndex + 1}</span>
                    </div>
                  </div>

                  <div className="border-t border-blue-200 pt-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">
                          {course.teacher}
                        </p>
                        {course.teacherBio && (
                          <p className="text-sm text-slate-600 mt-1">
                            {course.teacherBio}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {currentVideo.attachmentUrl && (
                    <div className="border-t border-blue-200 pt-4">
                      <p className="text-sm font-semibold text-slate-700 mb-3">
                        Lesson Resources
                      </p>
                      <a
                        href={currentVideo.attachmentUrl}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        {currentVideo.attachmentName || 'Download Resources'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar with Tabs */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Tab Navigation */}
                <div className="flex border-b border-slate-200 bg-slate-50">
                  <TabButton
                    icon={<Play className="w-4 h-4" />}
                    label="Content"
                    isActive={activeTab === 'content'}
                    onClick={() => setActiveTab('content')}
                  />
                  <TabButton
                    icon={<Zap className="w-4 h-4" />}
                    label="Exercises"
                    isActive={activeTab === 'exercises'}
                    onClick={() => setActiveTab('exercises')}
                    badge={course.exercises ? course.exercises.length : 0}
                  />
                  <TabButton
                    icon={<FileText className="w-4 h-4" />}
                    label="Résumé"
                    isActive={activeTab === 'summary'}
                    onClick={() => setActiveTab('summary')}
                  />
                </div>

                {/* Tab Content */}
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  {activeTab === 'content' && (
                    <ContentSection
                      videos={course.videos}
                      currentVideoId={currentVideoId}
                      onVideoSelect={setCurrentVideoId}
                      totalVideos={course.videos.length}
                      currentIndex={currentVideoIndex}
                    />
                  )}

                  {activeTab === 'exercises' && (
                    <ExercisesSection exercises={course.exercises || []} />
                  )}

                  {activeTab === 'summary' && (
                    <SummarySection summary={course.summary} />
                  )}
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">
                      You're on track!
                    </p>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Keep up the great work
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

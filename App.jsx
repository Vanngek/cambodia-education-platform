import React, { useState } from 'react';
import { BookOpen, Video, Users, Search, Globe, CheckCircle, Clock, Star, ExternalLink, MessageCircle, Heart, Award, Zap, TrendingUp } from 'lucide-react';

const EduPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const getText = (key) => {
    const texts = {
      en: {
        appName: 'LearnHub', tagline: 'Empower Your Future', subtitle: 'Access world-class education',
        home: 'Home', courses: 'Courses', about: 'About Us', search: 'Search...', all: 'All',
        languages: 'Languages', technical: 'Tech', business: 'Business', free: '100% Free',
        students: 'students', startLearning: 'Start Learning', viewUdemy: 'View on Udemy',
        joinGroup: 'Join Study Group', contact: 'Contact', aboutCourse: 'About Course',
        advancedOptions: 'Advanced Options', close: 'Close', send: 'Send', name: 'Name',
        email: 'Email', message: 'Message', focus: 'Focus: Cambodia & Southeast Asia',
        explore: 'Explore Courses', trending: 'Trending Now', popular: 'Popular Topics',
        aboutTitle: 'About LearnHub', ourMission: 'Our Mission',
        missionText: 'LearnHub provides free, high-quality education to learners in Cambodia and Southeast Asia.',
        ourVision: 'Our Vision', visionText: 'To empower learners with the skills they need to succeed.',
        whyChooseUs: 'Why Choose Us', reason1: 'Completely Free', reason1Text: 'All courses are 100% free',
        reason2: 'Expert Instructors', reason2Text: 'Learn from professionals',
        reason3: 'Flexible Learning', reason3Text: 'Study at your own pace',
        reason4: 'Global Community', reason4Text: 'Connect with learners worldwide',
        joinCommunity: 'Join Our Community', startJourney: 'Start your learning journey',
        backToCourses: 'Back to Courses'
      },
      ja: {
        appName: 'LearnHub', tagline: '未来を切り開く', subtitle: '世界クラスの教育',
        home: 'ホーム', courses: 'コース', about: '私たちについて', search: '検索...', all: 'すべて',
        languages: '言語', technical: '技術', business: 'ビジネス', free: '完全無料',
        students: '受講生', startLearning: '学習開始', viewUdemy: 'Udemyで見る',
        joinGroup: '勉強会参加', contact: '問合せ', aboutCourse: 'コース概要',
        advancedOptions: '上級オプション', close: '閉じる', send: '送信', name: '名前',
        email: 'メール', message: 'メッセージ', focus: '重点：カンボジア・東南アジア',
        explore: 'コースを探す', trending: 'トレンド', popular: '人気トピック',
        aboutTitle: 'LearnHubについて', ourMission: '私たちの使命',
        missionText: 'カンボジアおよび東南アジアに無料で高品質な教育を提供します。',
        ourVision: 'ビジョン', visionText: '学習者にスキルと知識を提供すること。',
        whyChooseUs: '選ばれる理由', reason1: '完全無料', reason1Text: 'すべて100%無料',
        reason2: '専門講師', reason2Text: 'プロから学ぶ',
        reason3: '柔軟な学習', reason3Text: '自分のペースで',
        reason4: 'グローバル', reason4Text: '世界中とつながる',
        joinCommunity: 'コミュニティに参加', startJourney: '学習を始めましょう',
        backToCourses: 'コース一覧に戻る'
      },
      km: {
        appName: 'LearnHub', tagline: 'ពង្រឹងអនាគត', subtitle: 'ការអប់រំពិភពលោក',
        home: 'ទំព័រដើម', courses: 'វគ្គសិក្សា', about: 'អំពីយើង', search: 'ស្វែងរក...', all: 'ទាំងអស់',
        languages: 'ភាសា', technical: 'បច្ចេកទេស', business: 'អាជីវកម្ម', free: 'ឥតគិតថ្លៃ',
        students: 'សិស្ស', startLearning: 'ចាប់ផ្តើម', viewUdemy: 'Udemy',
        joinGroup: 'ចូលក្រុម', contact: 'ទំនាក់ទំនង', aboutCourse: 'អំពីវគ្គ',
        advancedOptions: 'ជម្រើស', close: 'បិទ', send: 'ផ្ញើ', name: 'ឈ្មោះ',
        email: 'អ៊ីមែល', message: 'សារ', focus: 'ផ្តោត: កម្ពុជា',
        explore: 'រកមើល', trending: 'ពេញនិយម', popular: 'ប្រធានបទ',
        aboutTitle: 'អំពី LearnHub', ourMission: 'បេសកកម្ម',
        missionText: 'ផ្តល់ការអប់រំឥតគិតថ្លៃ', ourVision: 'ចក្ខុវិស័យ', visionText: 'ផ្តល់ជំនាញ',
        whyChooseUs: 'ហេតុអ្វី', reason1: 'ឥតគិតថ្លៃ', reason1Text: '100% ឥតគិតថ្លៃ',
        reason2: 'គ្រូជំនាញ', reason2Text: 'រៀនពីអ្នកជំនាញ',
        reason3: 'រៀនបត់បែន', reason3Text: 'គ្រប់ពេលវេលា',
        reason4: 'សហគមន៍', reason4Text: 'ភ្ជាប់ពិភពលោក',
        joinCommunity: 'ចូលរួម', startJourney: 'ចាប់ផ្តើមថ្ងៃនេះ', backToCourses: 'ត្រលប់'
      }
    };
    return texts[language][key] || key;
  };

  const courses = [
    { id: 1, title: language === 'km' ? 'ភាសាអង់គ្លេស' : language === 'ja' ? '英会話' : 'English', category: 'languages', instructor: 'Sarah', students: 2543, rating: 4.9, lessons: 24, hours: 8, thumbnail: '🗣️', description: 'Learn English', enrolled: false, progress: 0, udemyUrl: 'https://www.udemy.com/course/english/' },
    { id: 2, title: language === 'km' ? 'ភាសាជប៉ុន' : language === 'ja' ? '日本語' : 'Japanese', category: 'languages', instructor: 'Tanaka', students: 1876, rating: 4.8, lessons: 30, hours: 12, thumbnail: '🇯🇵', description: 'Learn Japanese', enrolled: true, progress: 35, udemyUrl: 'https://www.udemy.com/course/japanese/' },
    { id: 3, title: language === 'km' ? 'កុំព្យូទ័រ' : language === 'ja' ? 'コンピュータ' : 'Computer', category: 'technical', instructor: 'David', students: 3421, rating: 4.9, lessons: 20, hours: 10, thumbnail: '💻', description: 'Computer skills', enrolled: false, progress: 0, udemyUrl: 'https://www.udemy.com/course/computer/' },
    { id: 4, title: language === 'km' ? 'អាជីវកម្ម' : language === 'ja' ? 'ビジネス' : 'Business', category: 'business', instructor: 'Maria', students: 1234, rating: 4.7, lessons: 18, hours: 9, thumbnail: '💼', description: 'Small business', enrolled: true, progress: 60 }
  ];

  const categories = [
    { id: 'all', name: getText('all'), icon: '📚' },
    { id: 'languages', name: getText('languages'), icon: '🌍' },
    { id: 'technical', name: getText('technical'), icon: '💻' },
    { id: 'business', name: getText('business'), icon: '💼' }
  ];

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'all' || c.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{getText('contact')}</h3>
              <button onClick={() => setShowContactForm(false)} className="text-gray-500">✕</button>
            </div>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Message sent!'); setShowContactForm(false); }}>
              <input type="text" placeholder={getText('name')} className="w-full px-4 py-2 border rounded-lg" required />
              <input type="email" placeholder={getText('email')} className="w-full px-4 py-2 border rounded-lg" required />
              <textarea placeholder={getText('message')} className="w-full px-4 py-2 border rounded-lg" rows={4} required />
              <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                {getText('send')}
              </button>
            </form>
          </div>
        </div>
      )}

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold">{getText('appName')}</span>
            </div>
           <nav className="hidden md:flex gap-6 items-center">
  <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}>
    {getText('home')}
  </button>
  <button onClick={() => setCurrentPage('courses')} className={currentPage === 'courses' || currentPage === 'detail' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}>
    {getText('courses')}
  </button>
  <button onClick={() => setCurrentPage('about')} className={currentPage === 'about' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}>
    {getText('about')}
  </button>
  <a 
    href="https://www.youtube.com/@vanngekli374" 
    target="_blank" 
    rel="noopener noreferrer"
    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
  >
    <Video className="w-5 h-5" />
    YouTube
  </a>
</nav>
            <div className="flex gap-2">
              <button onClick={() => setLanguage('en')} className={language === 'en' ? 'px-3 py-1 bg-blue-600 text-white rounded' : 'px-3 py-1 text-gray-600'}>EN</button>
              <button onClick={() => setLanguage('ja')} className={language === 'ja' ? 'px-3 py-1 bg-blue-600 text-white rounded' : 'px-3 py-1 text-gray-600'}>日本語</button>
              <button onClick={() => setLanguage('km')} className={language === 'km' ? 'px-3 py-1 bg-blue-600 text-white rounded' : 'px-3 py-1 text-gray-600'}>ខ្មែរ</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div>
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-24 px-8 rounded-3xl mb-16">
              <Heart className="w-8 h-8 fill-white mb-4" />
              <h1 className="text-6xl font-bold mb-6">{getText('tagline')}</h1>
              <p className="text-2xl mb-10">{getText('subtitle')}</p>
              <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100" onClick={() => setCurrentPage('courses')}>{getText('explore')}</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center"><Users className="w-16 h-16 mx-auto mb-4 text-blue-600" /><p className="text-4xl font-bold text-blue-600">12K+</p><p className="text-gray-600">{getText('students')}</p></div>
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center"><BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-600" /><p className="text-4xl font-bold text-purple-600">4+</p><p className="text-gray-600">{getText('courses')}</p></div>
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center"><Star className="w-16 h-16 mx-auto mb-4 text-yellow-500" /><p className="text-4xl font-bold text-yellow-600">4.8</p><p className="text-gray-600">Rating</p></div>
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center"><Award className="w-16 h-16 mx-auto mb-4 text-green-600" /><p className="text-4xl font-bold text-green-600">100%</p><p className="text-gray-600">{getText('free')}</p></div>
            </div>
            <h2 className="text-4xl font-bold mb-8">{getText('popular')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map(c => (
                <div key={c.id} className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer" onClick={() => { setSelectedCourse(c); setCurrentPage('detail'); }}>
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-36 flex items-center justify-center text-6xl">{c.thumbnail}</div>
                  <div className="p-5"><h3 className="font-bold text-xl mb-2">{c.title}</h3><p className="text-sm text-gray-600">{c.instructor}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20 px-8 rounded-3xl mb-16 text-center">
              <h1 className="text-6xl font-bold mb-6">{getText('aboutTitle')}</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              <div className="bg-white p-10 rounded-3xl shadow-xl"><h2 className="text-4xl font-bold mb-6">{getText('ourMission')}</h2><p className="text-lg text-gray-700">{getText('missionText')}</p></div>
              <div className="bg-white p-10 rounded-3xl shadow-xl"><h2 className="text-4xl font-bold mb-6">{getText('ourVision')}</h2><p className="text-lg text-gray-700">{getText('visionText')}</p></div>
            </div>
          </div>
        )}

        {currentPage === 'courses' && (
          <div>
            <h1 className="text-5xl font-bold mb-10">{getText('courses')}</h1>
            <div className="mb-10 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
                <input type="text" placeholder={getText('search')} className="w-full pl-14 pr-4 py-4 border-2 rounded-xl" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <select className="px-6 py-4 border-2 rounded-xl font-semibold" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.map(c => (
                <div key={c.id} className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer" onClick={() => { setSelectedCourse(c); setCurrentPage('detail'); }}>
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-36 flex items-center justify-center text-6xl">{c.thumbnail}</div>
                  <div className="p-5"><h3 className="font-bold text-xl mb-2">{c.title}</h3><p className="text-sm text-gray-600">{c.instructor}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'detail' && selectedCourse && (
          <div>
            <button onClick={() => setCurrentPage('courses')} className="mb-8 text-blue-600 font-bold">← {getText('backToCourses')}</button>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-12 rounded-3xl mb-12">
              <div className="text-8xl mb-6">{selectedCourse.thumbnail}</div>
              <h1 className="text-6xl font-bold mb-6">{selectedCourse.title}</h1>
              <button className="bg-white text-blue-600 px-12 py-5 rounded-xl font-bold hover:bg-gray-100">{getText('startLearning')}</button>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6">{getText('aboutCourse')}</h2>
              <p className="text-lg text-gray-700 mb-6">{selectedCourse.description}</p>
              {selectedCourse.udemyUrl && (
                <a href={selectedCourse.udemyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-purple-600 font-semibold">
                  <ExternalLink className="w-5 h-5" /> {getText('viewUdemy')}
                </a>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EduPlatform; 　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　

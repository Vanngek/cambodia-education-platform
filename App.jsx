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
            <nav className="hidden md:flex gap-6">
              <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'text-blue-600 font-semibold' : 'text-gray-700'}>{getText('home')}</button>
              <button onClick={() => setCurrentPage('courses')} className={currentPage === 'courses' || currentPage === 'detail' ? 'text-blue-600 font-semibold' : 'text-gray-700'}>{getText('courses')}</button>
              <button onClick={() => setCurrentPage('about')} className={currentPage === 'about' ? 'text-blue-600 font-semibold' : 'text-gray-700'}>{getText('about')}</button>
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

公開プロセス：　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　ホームページを公開する方法について、無料と有料のメリット・デメリット、そしてコンテンツ投稿の方法をご説明します。
無料公開 vs 有料公開
無料ホスティング（推奨オプション）
メリット:
完全無料で始められる
素早く公開できる
ドメイン費用も不要
小規模〜中規模のトラフィックに対応
デメリット:
独自ドメインが制限される場合がある
ストレージ容量に制限
広告が表示される場合がある（サービスによる）
サーバーの細かいカスタマイズができない
おすすめ無料サービス:
Netlify - 最もおすすめ
Vercel
GitHub Pages
Google Firebase Hosting
有料ホスティング
メリット:
独自ドメイン使用可能
大容量ストレージ
より高速なサーバー
広告なし
専門的なサポート
デメリット:
月額費用（$5-20程度）
管理が少し複雑
YouTubeビデオの統合方法
現在のウェブサイトにYouTubeビデオを追加する方法を作成しました：
1. YouTube埋め込み方式（推奨）
YouTubeのビデオページで「共有」→「埋め込む」をクリック
表示されるコードをコピー
ウェブサイトに貼り付け
2. ビュー数カウントについて
重要: YouTubeに埋め込まれたビデオを再生すると、自動的にYouTubeのビュー数にカウントされます。特別な設定は不要です。
ただし、ビュー数にカウントされる条件：
30秒以上視聴される
同じユーザーの繰り返し視聴は制限される
ボットではない実際のユーザー
学習資料の投稿方法
おすすめの構成:
YouTube動画 - メイン教材
Google Drive - PDF、ドキュメント、補足資料
GitHub - コード、プロジェクトファイル
作成したサンプルページには以下の機能を含めました：
YouTubeビデオの埋め込み
補足資料へのリンク
クイズ機能
進捗トラッキング
次のステップ
Leeさんの教育プラットフォームに最適な構成は：
無料で始める: Netlifyで公開
YouTube: 教育ビデオをアップロード
ウェブサイト: YouTubeビデオを埋め込み
Google Drive: 補足資料を保存・共有
この方法なら：
完全無料で運営可能
YouTubeの広告収益も得られる
ビュー数も正確にカウント
拡張性も高い
具体的な実装方法や、現在のウェブサイトへのYouTube統合について、サポートが必要でしたらお知らせください！

Netlify無料版 セットアップガイド
ステップ1：アカウント作成（5分）
https://www.netlify.com にアクセス
「Sign up」をクリック
登録方法を選択：
GitHub（推奨）
GitLab
Bitbucket
メールアドレス
推奨：GitHubアカウントで登録
理由：自動デプロイが簡単
GitHubアカウントがない場合は作成（無料）

ステップ2：サイトのデプロイ方法
方法A：ドラッグ&ドロップ（最も簡単！）
1. Netlifyにログイン
2. 「Sites」→「Add new site」→「Deploy manually」
3. あなたのウェブサイトフォルダをドラッグ&ドロップ
4. 完了！
あなたのファイル構成：
my-website/
├── index.html
├── style.css
├── script.js
└── images/
    └── logo.png
このフォルダ全体をドラッグ&ドロップするだけ！

方法B：GitHub経由（推奨・自動更新）
1. GitHubにリポジトリ作成
2. ウェブサイトファイルをアップロード
3. Netlifyで「Import from Git」
4. GitHubリポジトリを選択
5. 「Deploy site」
メリット：
ファイルを更新したら自動的にサイトも更新
バージョン管理ができる
無料のバックアップ

ステップ3：無料ドメイン設定
デプロイ後、自動的に生成されます：
random-name-123.netlify.app
カスタマイズ可能：
1. Site settings → Domain management
2. 「Options」→「Edit site name」
3. 好きな名前に変更：
   例：khmer-education.netlify.app

無料ドメイン名の選び方
良い例：
✅ khmer-education.netlify.app ✅ learn-cambodian.netlify.app ✅ lee-academy.netlify.app ✅ cambodia-learning.netlify.app
避けるべき：
❌ my-awesome-site-123.netlify.app（長すぎ） ❌ test-site.netlify.app（テストっぽい） ❌ aaa-bbb-ccc.netlify.app（意味不明）
ポイント：
短く
覚えやすく
内容がわかる
ハイフン（-）でつなぐ

独自ドメイン接続（オプション）
後で独自ドメインを買った場合：
手順（5分）：
1. ドメイン購入（Namecheap, Google Domainsなど）
   例：khmer-education.com ($12/年)

2. Netlify設定：
   - Domain settings → Add custom domain
   - khmer-education.com を入力

3. DNS設定（自動ガイドあり）
   - Netlifyが指示してくれる
   - 5分で完了

4. SSL証明書（https）自動発行
   - 無料
   - 自動更新

完全無料で運営する場合の構成
推奨セットアップ：
ホスティング：Netlify（無料）
ドメイン：yoursite.netlify.app（無料）
SSL：自動（無料）
YouTube：動画ホスティング（無料）
画像：Netlify内に保存（無料）
フォーム：Netlify Forms（月100件まで無料）

月額費用：$0

アップグレードが必要になるタイミング
無料プランで十分な期間：
✅ 月間訪問者 50,000人まで
✅ 月間フォーム送信 100件まで
✅ サイト数 無制限
有料が必要になる時：
月間訪問者が50,000人超え
Pro版：$19/月（帯域幅400GB）
でもこの段階なら収益出てるはず！
チームで運営
複数人で管理したい
Pro版：$19/月
パスワード保護が必要
会員限定コンテンツ
Pro版：$19/月
Leeさんの場合：最低1-2年は無料版で十分です！

実際の手順（今すぐできる）
今から30分でサイト公開：
準備するもの：
✅ あなたのウェブサイトファイル
index.html
その他のファイル
✅ メールアドレス（Netlifyアカウント用）
手順：
5分： Netlifyアカウント作成
https://www.netlify.com
→ Sign up
→ メールまたはGitHubで登録
10分： サイトをデプロイ
→ Sites
→ Add new site
→ Deploy manually
→ フォルダをドラッグ&ドロップ
5分： ドメイン名カスタマイズ
→ Site settings
→ Change site name
→ khmer-education（例）に変更
10分： YouTube埋め込み確認
→ サイトを開く
→ YouTubeビデオが正常に表示されるか確認
完成！
https://khmer-education.netlify.app

よくある質問
Q1: 本当に完全無料ですか？
A: はい！クレジットカード登録も不要です。
Q2: 広告が表示されますか？
A: いいえ、Netlifyは広告を表示しません。
Q3: いつまで無料ですか？
A: 永久に無料です（制限内であれば）。
Q4: ファイルの更新は？
A:
ドラッグ&ドロップ：新しいバージョンをアップロード
GitHub連携：GitHubにpushするだけで自動更新
Q5: データベースは使えますか？
A: 静的サイト（HTML/CSS/JS）のみ。データベースは別サービス必要。
Q6: バックアップは？
A: すべてのデプロイ履歴が保存されます（無料）。

まとめ - Netlify完全無料版
✅ できること：
ウェブサイト公開（無制限）
高速配信（CDN）
SSL証明書（https）
月50,000訪問者まで対応
YouTube埋め込み
フォーム機能（月100件）
自動デプロイ
❌ できないこと：
複数人での管理
パスワード保護
50,000人以上の訪問者
高度な分析
💰 費用：
完全無料（$0/月）

次のステップ
Leeさん、今すぐ始めましょうか？
Netlifyアカウント作成サポートしますか？
ウェブサイトファイルの準備は完了していますか？
希望するドメイン名は決まっていますか？
例：khmer-education.netlify.app
どこから始めたいか教えてください！一緒に30分でサイトを公開しましょう！
高度な分析❌✅パスワード保護❌✅　この内容は危ないですか？
17:46
いいえ、全く危なくありません！安心してください！
詳しく説明しますね。

「高度な分析」がない = 危険？
❌ 危険ではありません
「高度な分析」とは：
詳細な訪問者データ
ユーザーの行動追跡
A/Bテスト機能
コンバージョン分析
✅ 無料版でも基本分析はできます！
Netlifyの無料分析：
📊 訪問者数
📊 ページビュー
📊 帯域幅使用量
📊 人気ページ
さらに、Google Analyticsが使えます（完全無料）：
html
<!-- あなたのHTMLに追加するだけ -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Google Analyticsで見れる情報：**
- ✅ 訪問者数（リアルタイム）
- ✅ どの国から？
- ✅ どのページが人気？
- ✅ 平均滞在時間
- ✅ 使用デバイス（スマホ・PC）
- ✅ どこからサイトに来た？（YouTube、Google検索など）

**結論：高度な分析がなくても全く

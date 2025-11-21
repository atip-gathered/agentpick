import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SwipeDeck from './components/SwipeDeck';
import ActionButtons from './components/ActionButtons';
import MatchModal from './components/MatchModal';
import AgentDetail from './components/AgentDetail';
import CompletionScreen from './components/CompletionScreen';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MenuOverlay from './components/MenuOverlay';
import MessageList from './components/MessageList';
import ChatView from './components/ChatView';
import ProfilePage from './components/ProfilePage';
import SearchPage from './components/SearchPage';
import FeaturedArticlesPage from './components/FeaturedArticlesPage';
import ArticleDetailPage from './components/ArticleDetailPage';
import AgentLoginPage from './components/agent/AgentLoginPage';
import AgentLayout from './components/agent/AgentLayout';
import AgentDashboard from './components/agent/AgentDashboard';
import AgentMessages from './components/agent/AgentMessages';
import AgentProfile from './components/agent/AgentProfile';
import AgentMatching from './components/agent/AgentMatching';
import UserProfileModal from './components/agent/UserProfileModal';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import AgentForgotPasswordPage from './components/agent/AgentForgotPasswordPage';
import AdminLoginPage from './components/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminArticles from './components/admin/AdminArticles';
import { agents } from './mockData';

function App() {
    const [matchAgent, setMatchAgent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [swipeCommand, setSwipeCommand] = useState(null);
    const [matchedAgents, setMatchedAgents] = useState([]); // Track matched agent IDs
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [messages, setMessages] = useState({}); // Store messages by agent ID
    const [currentChatAgent, setCurrentChatAgent] = useState(null);

    // Navigation State
    const [currentView, setCurrentView] = useState('landing'); // 'landing', 'swipe', 'detail', 'completion', 'login', 'register', 'messages', 'chat', 'search', 'articles', 'article-detail', 'agent-login', 'agent-dashboard'
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    
    // Agent Mode State
    const [isAgentMode, setIsAgentMode] = useState(false);
    const [agentData, setAgentData] = useState(null);
    const [agentActiveTab, setAgentActiveTab] = useState('dashboard');
    const [selectedUserProfile, setSelectedUserProfile] = useState(null);
    const [selectedMessageUserId, setSelectedMessageUserId] = useState(null);
    const [childAgents, setChildAgents] = useState([]);
    
    // Admin Mode State
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [adminActiveTab, setAdminActiveTab] = useState('dashboard');
    const [adminStats, setAdminStats] = useState({
        articles: 5,
        parentAgents: 12,
        pendingApprovals: 3,
        notifications: 8
    });
    
    // Admin Articles State
    const [adminArticles, setAdminArticles] = useState([
        {
            id: 1,
            title: '年間MVP受賞！山田明子の転職支援ストーリー',
            description: 'パーソルキャリアで支社長を務める山田明子さん。彼女の転職支援における情熱と実績に迫ります。',
            content: 'IT業界での転職支援において、圧倒的な実績を誇る山田明子さん。2023年度の年間MVPを受賞した彼女の転職支援の秘訣とは何でしょうか。',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'インタビュー',
            author: '編集部',
            date: '2024.12.15',
            isPublished: true,
            views: 1234,
            createdAt: new Date('2024-12-15').toISOString(),
            featuredAgentId: 1,
            tableOfContents: [
                '転職エージェントになったきっかけ',
                '支社長として目指すもの',
                '後輩エージェントへのメッセージ',
                'プライベートとの両立'
            ],
            sections: [
                {
                    title: '転職エージェントになったきっかけ',
                    content: '大学卒業後、人材業界とは全く縁のない金融業界でキャリアをスタートしました。お客様の資産運用のサポートをする中で、「人生の転機に寄り添い、サポートする」という仕事の面白さに気づいたんです。そこから転職支援の道に興味を持ち、25歳の時に人材サービス会社に転職しました。\n\n最初は営業として企業の採用支援に携わっていましたが、次第に求職者の方々と直接向き合う仕事がしたいと思うようになり、転職エージェントとしてのキャリアをスタートさせました。今振り返ると、自分自身が転職という大きな決断をした経験が、この仕事への情熱につながっているのだと感じます。'
                },
                {
                    title: '支社長として目指すもの',
                    content: '支社長として最も大切にしているのは、「チーム全体の成長」です。一人ひとりのエージェントが自信を持って求職者の方々をサポートできる環境を作ることが、私の使命だと考えています。\n\n具体的には、定期的な1on1ミーティングを通じて各メンバーの強みを伸ばし、課題を一緒に解決していくことを心がけています。また、成功事例を共有する文化を醸成し、お互いに学び合える組織づくりにも力を入れています。\n\n私たちの仕事は、人の人生に大きな影響を与える責任ある仕事です。だからこそ、エージェント一人ひとりが高い専門性と誠実さを持って求職者に向き合える、そんなチームを作っていきたいと思っています。'
                },
                {
                    title: '後輩エージェントへのメッセージ',
                    content: '転職エージェントとして働き始めた頃は、誰もが不安を感じるものです。私もそうでした。でも、大切なのは「求職者の人生に真摯に向き合う」という気持ちを忘れないことです。\n\n最初はうまく話せなかったり、適切なアドバイスができなかったりすることもあるかもしれません。でも、その経験一つひとつが必ず成長につながります。失敗を恐れず、常に学び続ける姿勢を持ち続けてください。\n\nそして、困った時は一人で抱え込まず、チームのメンバーや先輩に相談してください。私たちは一つのチームです。一緒に成長していきましょう。'
                },
                {
                    title: 'プライベートとの両立',
                    content: '正直に言うと、仕事とプライベートの両立は簡単ではありません。特に支社長という立場になってからは、責任も増え、時間のやりくりに苦労することもあります。\n\nでも、だからこそ意識的にメリハリをつけることを大切にしています。休日は家族との時間を最優先にし、趣味のヨガでリフレッシュする時間も確保するようにしています。オンとオフを切り替えることで、仕事でのパフォーマンスも向上すると実感しています。\n\nまた、チームメンバーにも同じことを伝えています。長時間働くことが良いことではなく、効率的に働き、自分の時間も大切にすることが、結果的に良い仕事につながると信じています。'
                }
            ]
        },
        {
            id: 2,
            title: 'IT業界への転職を成功させる5つのステップ',
            description: '未経験からIT業界へ転職を目指す方に向けて、成功のための具体的なステップを解説します。',
            content: 'IT業界への転職を考えている方へ。未経験からでも成功できる5つのステップをご紹介します。',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'ガイド',
            author: '佐藤 健太',
            date: '2024.12.10',
            isPublished: true,
            views: 892,
            createdAt: new Date('2024-12-10').toISOString(),
            featuredAgentId: null,
            tableOfContents: ['基礎知識の習得', 'ポートフォリオの作成', '業界研究', '職務経歴書の最適化', 'エージェントの活用'],
            sections: [
                { title: '基礎知識の習得', content: 'プログラミングの基礎やIT用語について学びましょう。オンライン学習サービスを活用するのがおすすめです。無料で学べるプラットフォームも多数あります。' },
                { title: 'ポートフォリオの作成', content: '学んだ知識を活かして、簡単なWebサイトやアプリを作成してみましょう。実際に動くものを作ることで、面接でのアピール材料になります。' },
                { title: '業界研究', content: 'IT業界の動向や求められるスキルについて調査しましょう。最新のトレンドを把握することで、適切なキャリアプランが立てられます。' },
                { title: '職務経歴書の最適化', content: 'これまでの経験をIT業界でどう活かせるか、明確に記載しましょう。異業種からの転職でも、マネジメント経験やコミュニケーション能力は評価されます。' },
                { title: 'エージェントの活用', content: '専門のエージェントに相談することで、効率的な転職活動が可能になります。業界知識や企業とのコネクションを活用できます。' }
            ]
        },
        {
            id: 3,
            title: '2024年 転職市場の最新トレンド',
            description: '2024年の転職市場における注目のトレンドと、求職者が知っておくべきポイントをまとめました。',
            content: '2024年の転職市場は、リモートワークの定着やDXの加速により、大きく変化しています。',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'ニュース',
            author: '編集部',
            date: '2024.12.05',
            isPublished: true,
            views: 1567,
            createdAt: new Date('2024-12-05').toISOString(),
            featuredAgentId: null,
            tableOfContents: ['ハイブリッドワークの普及', 'DX人材の需要増加', 'ウェルビーイング重視の企業文化'],
            sections: [
                { title: 'ハイブリッドワークの普及', content: 'リモートワークとオフィスワークを組み合わせたハイブリッドワークが、多くの企業で標準となっています。柔軟な働き方が求められる時代です。' },
                { title: 'DX人材の需要増加', content: 'データサイエンティスト、AIエンジニア、プロダクトマネージャーなどのDX関連職種で、引き続き高い需要が見込まれています。' },
                { title: 'ウェルビーイング重視の企業文化', content: '従業員の健康と幸福を重視する企業が増加。ワークライフバランスや心理的安全性が重要な評価基準になっています。' }
            ]
        },
        {
            id: 4,
            title: '面接で差をつける！効果的な自己PRの作り方',
            description: '採用担当者の心をつかむ自己PRの作り方を、具体例とともに解説します。',
            content: '面接で最も重要な自己PR。効果的な自己PRを作るためのポイントをご紹介します。',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'コラム',
            author: '田中 美咲',
            date: '2024.11.28',
            isPublished: true,
            views: 743,
            createdAt: new Date('2024-11-28').toISOString(),
            featuredAgentId: null,
            tableOfContents: ['強みの明確化', '企業ニーズとの結びつけ', 'ストーリー化', '簡潔にまとめる'],
            sections: [
                { title: '強みの明確化', content: 'まずは自分の強みを3つ挙げてみましょう。具体的なエピソードと共に説明できることが重要です。抽象的な表現ではなく、実際の経験に基づいた強みを挙げることがポイントです。' },
                { title: '企業ニーズとの結びつけ', content: '応募企業が求めている人物像と、自分の強みをどう結びつけるか考えます。企業研究をしっかり行い、求められるスキルや価値観を理解しましょう。' },
                { title: 'ストーリー化', content: 'STAR法（Situation, Task, Action, Result）を使って、説得力のあるストーリーを作りましょう。状況、課題、行動、結果を明確に伝えることで、採用担当者に具体的なイメージを持ってもらえます。' },
                { title: '簡潔にまとめる', content: '1分程度で話せる長さにまとめることが大切です。長すぎると要点がぼやけ、短すぎると印象に残りません。何度も練習して、自然に話せるようにしましょう。' }
            ]
        },
        {
            id: 5,
            title: '転職フェア2025 開催のお知らせ',
            description: '来年2月に開催される転職フェアの詳細情報をお届けします。参加企業100社以上！',
            content: '2025年2月に開催される大規模転職フェアのお知らせです。',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'イベント',
            author: '編集部',
            date: '2024.11.20',
            isPublished: false,
            views: 456,
            createdAt: new Date('2024-11-20').toISOString(),
            featuredAgentId: null,
            tableOfContents: ['イベント概要', '参加企業ジャンル', '事前登録について'],
            sections: [
                { title: 'イベント概要', content: '日時：2025年2月15日（土）10:00-18:00\n場所：東京ビッグサイト\n\n参加企業：100社以上\n参加費：無料（事前登録制）\n\n当日は企業ブースでの説明会に加え、転職セミナーや個別相談会も開催予定です。' },
                { title: '参加企業ジャンル', content: 'IT・Web系企業、コンサルティングファーム、メーカー、金融機関、スタートアップ企業など、多様な業界から100社以上が参加予定です。あなたに合った企業がきっと見つかります。' },
                { title: '事前登録について', content: '事前登録は12月20日より開始します。詳細は公式サイトをご確認ください。事前登録者には当日の特典もご用意しております。' }
            ]
        }
    ]);
    
    // Child Agent Management Handlers
    const handleCreateChildAgent = (childData) => {
        const newChild = {
            id: `child-${Date.now()}`,
            ...childData,
            status: 'active',
            createdAt: new Date().toISOString(),
            assignedUsers: []
        };
        setChildAgents(prev => [...prev, newChild]);
    };

    const handleUpdateChildAgent = (childId, updatedData) => {
        setChildAgents(prev => 
            prev.map(child => 
                child.id === childId ? { ...child, ...updatedData } : child
            )
        );
    };

    const handleDeleteChildAgent = (childId) => {
        setChildAgents(prev => prev.filter(child => child.id !== childId));
    };
    
    // Admin Article Management Handlers
    const handleCreateArticle = (articleData) => {
        setAdminArticles(prev => [articleData, ...prev]);
        setAdminStats(prev => ({ ...prev, articles: prev.articles + 1 }));
    };
    
    const handleUpdateArticle = (articleId, updatedData) => {
        setAdminArticles(prev => 
            prev.map(article => 
                article.id === articleId ? updatedData : article
            )
        );
    };
    
    const handleDeleteArticle = (articleId) => {
        setAdminArticles(prev => prev.filter(article => article.id !== articleId));
        setAdminStats(prev => ({ ...prev, articles: prev.articles - 1 }));
    };

    const handleAssignUserToChild = (userId, childId) => {
        setChildAgents(prev =>
            prev.map(child =>
                child.id === childId
                    ? { ...child, assignedUsers: [...(child.assignedUsers || []), userId] }
                    : child
            )
        );
    };
    
    // Mock matched users data for agent
    const [matchedUsers, setMatchedUsers] = useState([
        { 
            id: 1, 
            name: '田中 太郎', 
            position: 'ソフトウェアエンジニア',
            email: 'tanaka@example.com',
            phone: '090-1234-5678',
            status: 'before_first_meeting',
            matchedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            desiredPosition: 'シニアエンジニア',
            hasProfileAccess: false,
            resume: 'Tanaka_履歴書.pdf',
            workHistory: 'Tanaka_職務経歴書.pdf',
            birthDate: '1995/03/15',
            age: '29歳',
            gender: '男性',
            location: '東京都',
            education: '早稲田大学 理工学部 卒業',
            assignedChildAgent: null // 親アカウントが直接担当
        },
        { 
            id: 2, 
            name: '佐藤 花子', 
            position: 'プロジェクトマネージャー',
            email: 'sato@example.com',
            phone: '090-2345-6789',
            status: 'in_progress',
            matchedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            desiredPosition: 'シニアPM',
            hasProfileAccess: true,
            resume: 'Sato_履歴書.pdf',
            workHistory: 'Sato_職務経歴書.pdf',
            birthDate: '1992/07/20',
            age: '32歳',
            gender: '女性',
            location: '神奈川県',
            education: '慶應義塾大学 商学部 卒業',
            assignedChildAgent: null // 親アカウントが直接担当
        }
    ]);
    const activeTab = currentView === 'swipe' ? 'swipe' :
        currentView === 'search' ? 'search' :
            currentView === 'detail' || currentView === 'completion' || currentView === 'articles' || currentView === 'article-detail' ? 'detail' :
                currentView === 'messages' || currentView === 'chat' ? 'messages' :
                    'profile';

    const handleSwipe = (direction, agent) => {
        console.log(`Swiped ${direction} on ${agent.name} `);
    };

    const handleMatch = (agent) => {
        setMatchAgent(agent); // Keep this for reference
        // Removed: setIsModalOpen(true);
        setMatchedAgents(prev => [...prev, agent.id]);
    };

    const handleSendMessage = (agentId, text, type = 'text', sender = 'user') => {
        const newMessage = {
            sender: sender,
            text: text,
            type: type,
            timestamp: Date.now(),
            read: false
        };

        setMessages(prev => ({
            ...prev,
            [agentId]: [...(prev[agentId] || []), newMessage]
        }));

        // If user sends first message, grant profile access to agent
        if (sender === 'user') {
            setMatchedUsers(prev => 
                prev.map(user => 
                    user.id === agentId && !user.hasProfileAccess
                        ? { ...user, hasProfileAccess: true }
                        : user
                )
            );
        }

        // Simulate agent response after 1 second (only for text messages from user)
        if (type === 'text' && sender === 'user') {
            setTimeout(() => {
                const agentResponse = {
                    sender: 'agent',
                    text: 'ご連絡ありがとうございます。詳細についてお話しさせていただきます。',
                    type: 'text',
                    timestamp: Date.now(),
                    read: false
                };

                setMessages(prev => ({
                    ...prev,
                    [agentId]: [...(prev[agentId] || []), agentResponse]
                }));
            }, 1000);
        }
    };

    const handleBottomNavigation = (tabId) => {
        if (tabId === 'swipe') {
            setCurrentView('swipe');
            setSelectedAgent(null);
        } else if (tabId === 'messages') {
            setCurrentView('messages');
        } else if (tabId === 'detail') {
            // Navigate to articles page (featured articles)
            setCurrentView('articles');
        } else if (tabId === 'profile') {
            setCurrentView('profile');
        } else if (tabId === 'search') {
            setCurrentView('search');
        }
    };

    useEffect(() => {
        console.log('Matched Agents:', matchedAgents);
    }, [matchedAgents]);

    const handleNavigateToChat = (agentId) => {
        const agent = agents.find(a => a.id === agentId);
        setCurrentChatAgent(agent);
        setCurrentView('chat');

        // Initialize messages for this agent if not exists
        if (!messages[agentId]) {
            const welcomeMessage = {
                sender: 'agent',
                text: `お問い合わせありがとうございます。${agent.name} です。キャリアデザインエージェンシーの鈴木一郎でございます。`,
                timestamp: Date.now()
            };
            setMessages(prev => ({
                ...prev,
                [agentId]: [welcomeMessage]
            }));
        }
    };

    const [previousView, setPreviousView] = useState(null);

    const handleCardClick = (agent) => {
        setSelectedAgent(agent);
        setPreviousView(currentView); // Track current view before navigating
        setCurrentView('detail');
    };

    const handleBackToSwipe = () => {
        setSelectedAgent(null);
        // If we came from search, go back to search, else swipe
        if (previousView === 'search') {
            setCurrentView('search');
        } else {
            setCurrentView('swipe');
        }
        setPreviousView(null);
    };

    const handleNavigate = (view, agent) => {
        if (view === 'detail') {
            setSelectedAgent(agent);
            setPreviousView('search');
            setCurrentView('detail');
        } else if (view === 'swipe') {
            setCurrentView('swipe');
            setSelectedAgent(null);
        } else if (view === 'search') {
            setCurrentView('search');
        }
    };

    const handleDeckEmpty = () => {
        setCurrentView('completion');
    };

    const handleReset = () => {
        // In a real app, we'd fetch more agents. 
        // Here we just force a reload or reset state (requires SwipeDeck refactor to truly reset, 
        // but for now a simple reload is easiest for MVP or we can just mount a new SwipeDeck key)
        window.location.reload();
    };

    return (
        <>
            {currentView === 'landing' && (
                <LandingPage
                    onStartSwipe={() => setCurrentView('swipe')}
                    onLogin={() => setCurrentView('login')}
                    onRegister={() => setCurrentView('register')}
                    onAgentLogin={() => setCurrentView('agent-login')}
                    onAdminLogin={() => setCurrentView('admin-login')}
                />
            )}

            <MenuOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                isLoggedIn={isLoggedIn}
                onLogin={() => {
                    setIsMenuOpen(false);
                    setCurrentView('login');
                }}
                onMyPage={() => {
                    setIsMenuOpen(false);
                    // Navigate to My Page (not implemented yet, maybe detail or profile?)
                    console.log("Navigate to My Page");
                }}
            />

            {currentView !== 'landing' && 
             currentView !== 'chat' && 
             currentView !== 'agent-login' && 
             currentView !== 'agent-dashboard' &&
             currentView !== 'agent-forgot-password' &&
             currentView !== 'forgot-password' &&
             currentView !== 'admin-login' &&
             currentView !== 'admin-dashboard' && (
                <Layout
                    activeTab={activeTab}
                    onLogoClick={() => setCurrentView('landing')}
                    onRegisterClick={() => setCurrentView('register')}
                    onMenuClick={() => setIsMenuOpen(true)}
                    onNavigate={handleBottomNavigation}
                    isLoggedIn={isLoggedIn}
                >
                    {currentView === 'swipe' && (
                        <>
                            <div style={{
                                flex: 1,
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                paddingTop: '20px'
                            }}>
                                {/* Swipe Deck */}
                                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                    <SwipeDeck
                                        agents={agents}
                                        onSwipe={handleSwipe}
                                        onMatch={handleMatch}
                                        externalSwipeCommand={swipeCommand}
                                        onCommandHandled={() => setSwipeCommand(null)}
                                        onCardClick={handleCardClick}
                                        onEmpty={handleDeckEmpty}
                                    />
                                </div>

                                {/* Floating Action Buttons */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '40px',
                                    zIndex: 10
                                }}>
                                    <ActionButtons
                                        onPass={() => setSwipeCommand('left')}
                                        onLike={() => setSwipeCommand('right')}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {currentView === 'detail' && (
                        <AgentDetail
                            agent={selectedAgent}
                            isMatched={matchedAgents.includes(selectedAgent?.id)}
                            onBack={handleBackToSwipe}
                            onLike={() => {
                                handleBackToSwipe();
                                setTimeout(() => setSwipeCommand('right'), 100);
                            }}
                            onNavigateToArticle={(articleId) => {
                                // Find the article by ID from adminArticles
                                const article = adminArticles.find(a => a.id === articleId);
                                if (article) {
                                    setSelectedArticle(article);
                                    setCurrentView('article-detail');
                                }
                            }}
                        />
                    )}

                    {currentView === 'completion' && (
                        <CompletionScreen onReset={handleReset} />
                    )}

                    {currentView === 'login' && (
                        <LoginPage
                            onLogin={() => {
                                setIsLoggedIn(true);
                                setCurrentView('swipe');
                            }}
                            onNavigateToRegister={() => setCurrentView('register')}
                        />
                    )}

                    {currentView === 'register' && (
                        <RegisterPage
                            onRegister={() => setCurrentView('swipe')}
                            onNavigateToLogin={() => setCurrentView('login')}
                        />
                    )}



                    {currentView === 'messages' && (
                        <MessageList
                            pickedAgents={agents.filter(a => matchedAgents.includes(a.id))}
                            onNavigateToChat={handleNavigateToChat}
                            messages={messages}
                        />
                    )}

                    {currentView === 'profile' && (
                        <ProfilePage onNavigate={handleNavigate} />
                    )}

                    {currentView === 'search' && (
                        <SearchPage
                            agents={agents}
                            matchedAgents={matchedAgents}
                            onPickAgent={(agent) => {
                                handleMatch(agent);
                                setSwipeCommand('right');
                            }}
                            onNavigate={(view, agent) => {
                                if (view === 'detail') {
                                    setSelectedAgent(agent);
                                    setPreviousView('search'); // Track that we came from search
                                    setCurrentView('detail');
                                }
                            }}
                        />
                    )}

                    {currentView === 'articles' && (
                        <FeaturedArticlesPage 
                            articles={adminArticles.filter(a => a.isPublished)}
                            onNavigateToDetail={(article) => {
                                setSelectedArticle(article);
                                setCurrentView('article-detail');
                            }}
                            onNavigateToSwipe={() => setCurrentView('swipe')}
                        />
                    )}

                    {currentView === 'article-detail' && (
                        <ArticleDetailPage 
                            article={selectedArticle}
                            onBack={() => setCurrentView('articles')}
                            isLoggedIn={isLoggedIn}
                            matchedAgents={matchedAgents}
                            onPickAgent={(agentId) => {
                                const agent = agents.find(a => a.id === agentId);
                                if (agent) {
                                    handleMatch(agent);
                                }
                            }}
                            onNavigateToAgent={(agentId) => {
                                const agent = agents.find(a => a.id === agentId);
                                if (agent) {
                                    setSelectedAgent(agent);
                                    setPreviousView('article-detail');
                                    setCurrentView('detail');
                                }
                            }}
                            onNavigateToRegister={() => setCurrentView('register')}
                        />
                    )}
                </Layout>
            )}

            {/* Chat View - Outside Layout to prevent bottom nav overlap */}
            {currentView === 'chat' && currentChatAgent && (
                <ChatView
                    agent={currentChatAgent}
                    onBack={() => setCurrentView('messages')}
                    messages={messages[currentChatAgent.id] || []}
                    onSendMessage={handleSendMessage}
                />
            )}

            {/* Agent Login Page - Outside Layout */}
            {currentView === 'agent-login' && (
                <AgentLoginPage
                    onLogin={(credentials) => {
                        console.log('Agent logged in:', credentials);
                        // Set agent data
                        setAgentData({
                            name: credentials.email === 'matsumoto@atip.co.jp' ? '松本 太郎' : 'エージェント',
                            email: credentials.email,
                            company: 'Atip株式会社',
                            location: '東京都',
                            specialty: ['IT・Web', 'コンサルティング', 'マーケティング'],
                            bio: 'IT業界を中心に、10年以上の転職支援実績があります。',
                            phone: '03-1234-5678',
                            image: '/api/placeholder/120/120',
                            isParentAccount: credentials.email === 'matsumoto@atip.co.jp',
                            achievements: [
                                { title: '年間MVP受賞', description: '2023年度、最優秀転職支援賞を受賞' }
                            ]
                        });
                        setIsAgentMode(true);
                        setAgentActiveTab('dashboard');
                        setCurrentView('agent-dashboard');
                    }}
                    onBack={() => setCurrentView('landing')}
                    onForgotPassword={() => setCurrentView('agent-forgot-password')}
                />
            )}

            {/* Agent Forgot Password Page - Outside Layout */}
            {currentView === 'agent-forgot-password' && (
                <AgentForgotPasswordPage
                    onBack={() => setCurrentView('agent-login')}
                />
            )}

            {/* User Forgot Password Page - Outside Layout */}
            {currentView === 'forgot-password' && (
                <ForgotPasswordPage
                    onBack={() => setCurrentView('login')}
                />
            )}

            {/* Admin Login Page */}
            {currentView === 'admin-login' && (
                <AdminLoginPage
                    onLogin={(credentials) => {
                        console.log('Admin logged in:', credentials);
                        setAdminData({
                            name: 'システム管理者',
                            email: credentials.email,
                            role: 'admin'
                        });
                        setIsAdminMode(true);
                        setAdminActiveTab('dashboard');
                        setCurrentView('admin-dashboard');
                    }}
                    onBack={() => setCurrentView('landing')}
                />
            )}

            {/* Agent Mode - Complete separate UI */}
            {isAgentMode && currentView === 'agent-dashboard' && agentData && (
                <AgentLayout
                    activeTab={agentActiveTab}
                    onNavigate={(tab) => {
                        setAgentActiveTab(tab);
                        // Reset selected message user when navigating away from messages tab
                        if (tab !== 'messages') {
                            setSelectedMessageUserId(null);
                        }
                    }}
                    onLogout={() => {
                        setIsAgentMode(false);
                        setAgentData(null);
                        setAgentActiveTab('dashboard');
                        setCurrentView('landing');
                    }}
                    agentName={agentData.name}
                    unreadCount={messages ? Object.values(messages).reduce((sum, msgs) => 
                        sum + msgs.filter(msg => msg.sender === 'user' && !msg.read).length, 0
                    ) : 0}
                >
                    {agentActiveTab === 'dashboard' && (
                        <AgentDashboard 
                            agentData={agentData}
                            matchedUsers={matchedUsers}
                            messages={messages}
                            childAgents={childAgents}
                            onCreateChild={handleCreateChildAgent}
                            onUpdateChild={handleUpdateChildAgent}
                            onDeleteChild={handleDeleteChildAgent}
                            onAssignUser={handleAssignUserToChild}
                        />
                    )}
                    
                    {agentActiveTab === 'messages' && (
                        <AgentMessages
                            matchedUsers={matchedUsers}
                            messages={messages}
                            onSendMessage={handleSendMessage}
                            onViewProfile={(user) => {
                                setSelectedUserProfile(user);
                            }}
                            agentData={agentData}
                            childAgents={childAgents}
                            initialSelectedUserId={selectedMessageUserId}
                        />
                    )}
                    
                    {agentActiveTab === 'matching' && (
                        <AgentMatching
                            matchedUsers={matchedUsers}
                            agentData={agentData}
                            childAgents={childAgents}
                            onViewProfile={(user) => {
                                setSelectedUserProfile(user);
                            }}
                            onNavigateToChat={(userId) => {
                                setSelectedMessageUserId(userId);
                                setAgentActiveTab('messages');
                            }}
                        />
                    )}
                    
                    {agentActiveTab === 'profile' && (
                        <AgentProfile
                            agentData={agentData}
                            onSave={(updatedData) => {
                                setAgentData(updatedData);
                            }}
                        />
                    )}
                </AgentLayout>
            )}

            {/* Admin Mode - Complete separate UI */}
            {isAdminMode && currentView === 'admin-dashboard' && adminData && (
                <AdminLayout
                    activeTab={adminActiveTab}
                    onNavigate={(tab) => setAdminActiveTab(tab)}
                    onLogout={() => {
                        setIsAdminMode(false);
                        setAdminData(null);
                        setAdminActiveTab('dashboard');
                        setCurrentView('landing');
                    }}
                    adminName={adminData.name}
                >
                    {adminActiveTab === 'dashboard' && (
                        <AdminDashboard stats={adminStats} />
                    )}
                    
                    {adminActiveTab === 'articles' && (
                        <AdminArticles 
                            articles={adminArticles}
                            onCreateArticle={handleCreateArticle}
                            onUpdateArticle={handleUpdateArticle}
                            onDeleteArticle={handleDeleteArticle}
                        />
                    )}
                    
                    {adminActiveTab === 'agents' && (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <h2>エージェント管理</h2>
                            <p>開発中...</p>
                        </div>
                    )}
                    
                    {adminActiveTab === 'approvals' && (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <h2>プロフィール承認</h2>
                            <p>開発中...</p>
                        </div>
                    )}
                    
                    {adminActiveTab === 'notifications' && (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <h2>お知らせ管理</h2>
                            <p>開発中...</p>
                        </div>
                    )}
                </AdminLayout>
            )}

            {/* User Profile Modal */}
            {selectedUserProfile && (
                <UserProfileModal
                    user={selectedUserProfile}
                    onClose={() => setSelectedUserProfile(null)}
                    onStatusChange={(userId, newStatus) => {
                        setMatchedUsers(prev => 
                            prev.map(user => 
                                user.id === userId ? { ...user, status: newStatus } : user
                            )
                        );
                    }}
                />
            )}
        </>
    );
}

export default App;

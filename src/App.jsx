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
                                // Find the article by ID from FeaturedArticlesPage's mock data
                                // For now, we'll navigate to articles page and set the selected article
                                setCurrentView('article-detail');
                                // Mock article data (in production, this would come from a data source)
                                setSelectedArticle({
                                    id: articleId,
                                    title: "年間MVP受賞！山田明子の転職支援ストーリー",
                                    description: "パーソルキャリアで支社長を務める山田明子さん。彼女の転職支援における情熱と実績に迫ります。",
                                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                    date: "2024.12.15",
                                    tag: "インタビュー"
                                });
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
                            onNavigateToDetail={(article) => {
                                setSelectedArticle(article);
                                setCurrentView('article-detail');
                            }}
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
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <h2>特集記事管理</h2>
                            <p>開発中...</p>
                        </div>
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

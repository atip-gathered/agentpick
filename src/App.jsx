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
    const [currentView, setCurrentView] = useState('landing'); // 'landing', 'swipe', 'detail', 'completion', 'login', 'register', 'messages', 'chat', 'search'
    const [selectedAgent, setSelectedAgent] = useState(null);
    const activeTab = currentView === 'swipe' ? 'swipe' :
        currentView === 'search' ? 'search' :
            currentView === 'detail' || currentView === 'completion' ? 'detail' :
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

    const handleSendMessage = (agentId, text, type = 'text') => {
        const newMessage = {
            sender: 'user',
            text: text,
            type: type,
            timestamp: Date.now()
        };

        setMessages(prev => ({
            ...prev,
            [agentId]: [...(prev[agentId] || []), newMessage]
        }));

        // Simulate agent response after 1 second (only for text messages)
        if (type === 'text') {
            setTimeout(() => {
                const agentResponse = {
                    sender: 'agent',
                    text: 'ご連絡ありがとうございます。詳細についてお話しさせていただきます。',
                    type: 'text',
                    timestamp: Date.now()
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
            // Navigate to detail view (could be special content page)
            setCurrentView('detail');
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
        setPreviousView('swipe');
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

            {currentView !== 'landing' && currentView !== 'chat' && (
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
                        />
                    )}

                    {currentView === 'profile' && (
                        <ProfilePage onNavigate={handleNavigate} />
                    )}

                    {currentView === 'search' && (
                        <SearchPage
                            agents={agents}
                            onPickAgent={(agent) => {
                                handleMatch(agent);
                                setSwipeCommand('right');
                            }}
                            onNavigate={(view, agent) => {
                                if (view === 'detail') {
                                    setSelectedAgent(agent);
                                    setCurrentView('detail');
                                }
                            }}
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
        </>
    );
}

export default App;

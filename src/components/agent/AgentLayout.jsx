import React, { useState } from 'react';
import { LayoutDashboard, MessageCircle, Users, User, LogOut, Menu, X } from 'lucide-react';

const AgentLayout = ({ children, activeTab, onNavigate, onLogout, agentName, unreadCount = 0 }) => {
    const [hoveredTab, setHoveredTab] = useState(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
        { id: 'messages', label: 'メッセージ', icon: MessageCircle, badge: unreadCount },
        { id: 'matching', label: 'ユーザー管理', icon: Users },
        { id: 'profile', label: 'プロフィール', icon: User }
    ];

    return (
        <div style={{
            width: '100%',
            maxWidth: '430px',
            height: '100vh',
            margin: '0 auto',
            background: '#F5F5F5',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <header style={{
                background: 'white',
                padding: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <img
                        src="/logo.png"
                        alt="AGENT PICK"
                        style={{
                            height: '28px',
                            objectFit: 'contain'
                        }}
                    />
                    <span style={{
                        fontSize: '12px',
                        color: '#666',
                        fontWeight: '500'
                    }}>
                        エージェント管理
                    </span>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    onMouseEnter={() => setHoveredTab('menu-btn')}
                    onMouseLeave={() => setHoveredTab(null)}
                    style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        border: 'none',
                        background: hoveredTab === 'menu-btn' ? '#F0F0F0' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s ease'
                    }}
                >
                    {showMobileMenu ? <X size={20} color="#666" /> : <Menu size={20} color="#666" />}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {showMobileMenu && (
                <div 
                    style={{
                        position: 'absolute',
                        top: '68px',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 100,
                        animation: 'fadeIn 0.2s ease'
                    }}
                    onClick={() => setShowMobileMenu(false)}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '0 0 12px 12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                    >
                        {/* Agent Info */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            background: '#F8F8F8',
                            borderRadius: '8px',
                            marginBottom: '16px'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '20px',
                                fontWeight: 'bold'
                            }}>
                                {agentName.charAt(0)}
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    {agentName}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#666'
                                }}>
                                    エージェント
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                        }}>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id;
                                
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            onNavigate(item.id);
                                            setShowMobileMenu(false);
                                        }}
                                        onMouseEnter={() => setHoveredTab(`mobile-${item.id}`)}
                                        onMouseLeave={() => setHoveredTab(null)}
                                        style={{
                                            padding: '14px 16px',
                                            border: 'none',
                                            background: isActive ? '#E5F1FF' : (hoveredTab === `mobile-${item.id}` ? '#F8F8F8' : 'transparent'),
                                            color: isActive ? '#007AFF' : '#333',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            fontSize: '15px',
                                            fontWeight: isActive ? '600' : '500',
                                            transition: 'all 0.2s ease',
                                            textAlign: 'left',
                                            position: 'relative'
                                        }}
                                    >
                                        <Icon size={20} color={isActive ? '#007AFF' : '#666'} />
                                        {item.label}
                                        {item.badge > 0 && (
                                            <div style={{
                                                minWidth: '20px',
                                                height: '20px',
                                                borderRadius: '10px',
                                                background: '#FF3B30',
                                                color: 'white',
                                                fontSize: '11px',
                                                fontWeight: 'bold',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '0 6px',
                                                marginLeft: 'auto'
                                            }}>
                                                {item.badge > 99 ? '99+' : item.badge}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Logout */}
                        <button
                            onClick={() => {
                                setShowMobileMenu(false);
                                onLogout();
                            }}
                            onMouseEnter={() => setHoveredTab('mobile-logout')}
                            onMouseLeave={() => setHoveredTab(null)}
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '1px solid #FFE5E5',
                                background: hoveredTab === 'mobile-logout' ? '#FFE5E5' : 'white',
                                color: '#FF3B30',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                fontSize: '15px',
                                fontWeight: '600',
                                marginTop: '16px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <LogOut size={18} />
                            ログアウト
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main style={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden'
            }}>
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav style={{
                background: 'white',
                borderTop: '1px solid #E5E5E5',
                padding: '8px 0',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                boxShadow: '0 -2px 4px rgba(0,0,0,0.05)'
            }}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            onMouseEnter={() => setHoveredTab(item.id)}
                            onMouseLeave={() => setHoveredTab(null)}
                            style={{
                                flex: 1,
                                padding: '8px 4px',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.2s ease',
                                transform: hoveredTab === item.id ? 'translateY(-2px)' : 'translateY(0)',
                                position: 'relative'
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: isActive ? '#007AFF' : (hoveredTab === item.id ? '#F0F0F0' : 'transparent'),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                position: 'relative'
                            }}>
                                <Icon 
                                    size={20} 
                                    color={isActive ? 'white' : (hoveredTab === item.id ? '#007AFF' : '#999')}
                                />
                                {item.badge > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-4px',
                                        right: '-4px',
                                        minWidth: '18px',
                                        height: '18px',
                                        borderRadius: '9px',
                                        background: '#FF3B30',
                                        color: 'white',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0 5px',
                                        boxShadow: '0 2px 4px rgba(255,59,48,0.3)'
                                    }}>
                                        {item.badge > 99 ? '99+' : item.badge}
                                    </div>
                                )}
                            </div>
                            <span style={{
                                fontSize: '11px',
                                fontWeight: isActive ? '600' : '500',
                                color: isActive ? '#007AFF' : '#666',
                                transition: 'color 0.2s ease'
                            }}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* Animation Styles */}
            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default AgentLayout;

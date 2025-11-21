import React, { useState } from 'react';
import { TrendingUp, MessageCircle, Users, Heart } from 'lucide-react';
import ChildAccountManagement from './ChildAccountManagement';

const AgentDashboard = ({ agentData, matchedUsers, messages, childAgents, onCreateChild, onUpdateChild, onDeleteChild, onAssignUser }) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    // Calculate statistics
    const totalPicks = matchedUsers.length;
    const totalMessages = Object.values(messages).reduce((sum, msgs) => sum + msgs.length, 0);
    const unreadMessages = Object.values(messages).reduce((sum, msgs) => {
        return sum + msgs.filter(msg => msg.sender === 'user' && !msg.read).length;
    }, 0);

    // Get unread messages list
    const unreadMessagesList = Object.entries(messages)
        .flatMap(([userId, userMessages]) => {
            const user = matchedUsers.find(u => u.id === parseInt(userId));
            if (!user) return [];
            
            return userMessages
                .filter(msg => msg.sender === 'user' && !msg.read)
                .map(msg => ({
                    ...msg,
                    user: user
                }));
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);

    const stats = [
        {
            id: 'picks',
            title: 'ピック数',
            value: totalPicks,
            icon: Heart,
            color: '#FF3B30',
            bgColor: '#FFE5E5',
            trend: '+12%',
            trendLabel: '先週比'
        },
        {
            id: 'messages',
            title: 'メッセージ数',
            value: totalMessages,
            icon: MessageCircle,
            color: '#007AFF',
            bgColor: '#E5F1FF',
            trend: '+8%',
            trendLabel: '先週比'
        },
        {
            id: 'unread',
            title: '未読メッセージ',
            value: unreadMessages,
            icon: MessageCircle,
            color: '#FF9500',
            bgColor: '#FFF4E5',
            highlight: unreadMessages > 0
        },
        {
            id: 'active',
            title: 'アクティブユーザー',
            value: matchedUsers.filter(u => u.status === 'active').length,
            icon: Users,
            color: '#34C759',
            bgColor: '#E5F9EC',
            trend: '+5%',
            trendLabel: '先週比'
        }
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffMinutes < 60) {
            return `${diffMinutes}分前`;
        } else if (diffHours < 24) {
            return `${diffHours}時間前`;
        } else if (diffDays < 7) {
            return `${diffDays}日前`;
        } else {
            return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F5F5F5',
            overflowY: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            paddingBottom: '20px'
        }}>
            {/* Header */}
            <div style={{
                background: 'white',
                padding: '24px 16px',
                borderBottom: '1px solid #E5E5E5'
            }}>
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#007AFF',
                    margin: '0 0 8px 0'
                }}>
                    ダッシュボード
                </h1>
                <p style={{
                    fontSize: '14px',
                    color: '#666',
                    margin: 0
                }}>
                    {agentData.name} さん、こんにちは
                </p>
            </div>

            {/* Statistics Cards */}
            <div style={{
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px'
            }}>
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.id}
                            onMouseEnter={() => setHoveredCard(stat.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                background: 'white',
                                borderRadius: '12px',
                                padding: '16px',
                                boxShadow: hoveredCard === stat.id ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
                                transform: hoveredCard === stat.id ? 'translateY(-2px)' : 'translateY(0)',
                                transition: 'all 0.3s ease',
                                border: stat.highlight ? `2px solid ${stat.color}` : 'none'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    fontWeight: '500'
                                }}>
                                    {stat.title}
                                </span>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    background: stat.bgColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon size={18} color={stat.color} />
                                </div>
                            </div>
                            <div style={{
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#333',
                                marginBottom: '4px'
                            }}>
                                {stat.value}
                            </div>
                            {stat.trend && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '11px',
                                    color: '#34C759'
                                }}>
                                    <TrendingUp size={12} />
                                    <span>{stat.trend}</span>
                                    <span style={{ color: '#999' }}>{stat.trendLabel}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Unread Messages */}
            <div style={{
                background: 'white',
                margin: '8px 16px 0',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                }}>
                    <h2 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#333',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <MessageCircle size={20} color="#007AFF" />
                        未読メッセージ
                    </h2>
                </div>

                {unreadMessagesList.length > 0 ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        {unreadMessagesList.map((msg, index) => (
                            <div
                                key={`${msg.user.id}-${index}`}
                                onMouseEnter={() => setHoveredCard(`message-${msg.user.id}-${index}`)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px',
                                    background: '#FFF4E5',
                                    borderRadius: '8px',
                                    border: '1px solid #FFE5CC',
                                    transform: hoveredCard === `message-${msg.user.id}-${index}` ? 'translateX(4px)' : 'translateX(0)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#E5E5E5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    flexShrink: 0
                                }}>
                                    👤
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#333',
                                        marginBottom: '4px'
                                    }}>
                                        {msg.user.hasProfileAccess ? msg.user.name : '新規マッチング'}
                                    </div>
                                    <div style={{
                                        fontSize: '12px',
                                        color: '#666',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {msg.type === 'text' ? msg.text : msg.type === 'image' ? '📷 画像' : '📄 ファイル'}
                                    </div>
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#999',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {formatDate(msg.timestamp)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: '#999'
                    }}>
                        <MessageCircle size={48} color="#CCC" style={{ marginBottom: '12px' }} />
                        <p style={{ margin: 0, fontSize: '14px' }}>
                            未読メッセージはありません
                        </p>
                    </div>
                )}
            </div>

            {/* Child Account Management - Only for Parent Accounts */}
            {agentData.isParentAccount && (
                <ChildAccountManagement
                    childAgents={childAgents}
                    onCreateChild={onCreateChild}
                    onUpdateChild={onUpdateChild}
                    onDeleteChild={onDeleteChild}
                    onAssignUser={onAssignUser}
                />
            )}
        </div>
    );
};

export default AgentDashboard;

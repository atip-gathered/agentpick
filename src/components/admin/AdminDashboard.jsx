import React from 'react';
import { FileText, Users, UserCheck, Bell, TrendingUp, Clock } from 'lucide-react';

const AdminDashboard = ({ stats }) => {
    const statCards = [
        { 
            icon: FileText, 
            label: '特集記事', 
            value: stats?.articles || 0, 
            color: '#667eea',
            bgColor: '#E8EBFF'
        },
        { 
            icon: Users, 
            label: '親アカウント', 
            value: stats?.parentAgents || 0, 
            color: '#764ba2',
            bgColor: '#F0E8FF'
        },
        { 
            icon: UserCheck, 
            label: '承認待ち', 
            value: stats?.pendingApprovals || 0, 
            color: '#FF9500',
            bgColor: '#FFF4E5'
        },
        { 
            icon: Bell, 
            label: 'お知らせ', 
            value: stats?.notifications || 0, 
            color: '#34C759',
            bgColor: '#E8F8EC'
        }
    ];

    const recentActivities = [
        { type: 'approval', message: '山田太郎のプロフィールが承認されました', time: '5分前' },
        { type: 'agent', message: '新規親アカウントが作成されました', time: '1時間前' },
        { type: 'article', message: '特集記事「転職成功の秘訣」が公開されました', time: '3時間前' },
        { type: 'notification', message: 'システムメンテナンスのお知らせを配信しました', time: '5時間前' }
    ];

    return (
        <div style={{
            padding: '20px 16px'
        }}>
            {/* Welcome Section */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                padding: '24px',
                color: 'white',
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}>
                <h2 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    margin: '0 0 8px 0'
                }}>
                    システム管理ダッシュボード
                </h2>
                <p style={{
                    fontSize: '14px',
                    opacity: 0.9,
                    margin: 0
                }}>
                    システム全体の管理と監視
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '24px'
            }}>
                {statCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '20px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                transition: 'transform 0.2s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: card.bgColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '12px'
                            }}>
                                <Icon size={24} color={card.color} />
                            </div>
                            <div style={{
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#333',
                                marginBottom: '4px'
                            }}>
                                {card.value}
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: '#666'
                            }}>
                                {card.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                }}>
                    <TrendingUp size={20} color="#667eea" />
                    <h3 style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#333',
                        margin: 0
                    }}>
                        最近のアクティビティ
                    </h3>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    {recentActivities.map((activity, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '12px',
                                background: '#F8F9FA',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px'
                            }}
                        >
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#667eea',
                                marginTop: '6px',
                                flexShrink: 0
                            }} />
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#333',
                                    marginBottom: '4px'
                                }}>
                                    {activity.message}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#999',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    <Clock size={12} />
                                    {activity.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{
                marginTop: '20px',
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
                <h3 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    margin: '0 0 16px 0'
                }}>
                    クイックアクション
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                }}>
                    <button style={{
                        padding: '16px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease'
                    }}>
                        記事を投稿
                    </button>
                    <button style={{
                        padding: '16px',
                        background: '#F8F9FA',
                        border: '2px solid #E5E5E5',
                        borderRadius: '12px',
                        color: '#333',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}>
                        お知らせ作成
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

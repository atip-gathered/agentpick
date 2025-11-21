import React, { useState } from 'react';
import { LayoutDashboard, FileText, Users, UserCheck, Bell, LogOut, Shield } from 'lucide-react';

const AdminLayout = ({ children, activeTab, onNavigate, onLogout, adminName }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    const navItems = [
        { id: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
        { id: 'articles', label: '特集記事', icon: FileText },
        { id: 'agents', label: 'エージェント管理', icon: Users },
        { id: 'approvals', label: 'プロフィール承認', icon: UserCheck },
        { id: 'notifications', label: 'お知らせ', icon: Bell }
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
            {/* Top Header */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '16px',
                color: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Shield size={24} />
                        </div>
                        <div>
                            <div style={{
                                fontSize: '11px',
                                opacity: 0.9,
                                marginBottom: '2px'
                            }}>
                                システム管理者
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}>
                                {adminName || '管理者'}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        onMouseEnter={() => setHoveredItem('logout')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            background: hoveredItem === 'logout' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 16px',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <LogOut size={16} />
                        ログアウト
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                paddingBottom: '80px'
            }}>
                {children}
            </div>

            {/* Bottom Navigation */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: '430px',
                background: 'white',
                borderTop: '1px solid #E5E5E5',
                display: 'flex',
                justifyContent: 'space-around',
                padding: '8px 0',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
                zIndex: 1000
            }}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '8px 12px',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                flex: 1,
                                maxWidth: '80px'
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px',
                                background: isActive 
                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    : hoveredItem === item.id ? '#F5F5F5' : 'transparent',
                                transition: 'all 0.2s ease'
                            }}>
                                <Icon
                                    size={20}
                                    color={isActive ? 'white' : '#666'}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>
                            <span style={{
                                fontSize: '10px',
                                color: isActive ? '#667eea' : '#999',
                                fontWeight: isActive ? '600' : '500',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%'
                            }}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminLayout;

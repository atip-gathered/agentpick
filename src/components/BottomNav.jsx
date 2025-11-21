import React, { useState } from 'react';
import { ThumbsUp, Search, MessageCircle, BookOpen, User } from 'lucide-react';

const BottomNav = ({ activeTab, onNavigate, isLoggedIn }) => {
    const [hoveredTab, setHoveredTab] = useState(null);
    
    // 未ログイン時は3つのタブのみ表示
    const guestTabs = [
        { id: 'swipe', icon: ThumbsUp, label: 'ピック' },
        { id: 'search', icon: Search, label: '探す' },
        { id: 'detail', icon: BookOpen, label: '特集記事' }
    ];
    
    // ログイン後は全5つのタブを表示
    const loggedInTabs = [
        { id: 'swipe', icon: ThumbsUp, label: 'ピック' },
        { id: 'search', icon: Search, label: '探す' },
        { id: 'messages', icon: MessageCircle, label: 'メッセージ' },
        { id: 'detail', icon: BookOpen, label: '特集記事' },
        { id: 'profile', icon: User, label: 'マイページ' }
    ];
    
    const tabs = isLoggedIn ? loggedInTabs : guestTabs;

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '430px',
            height: '80px',
            background: 'white',
            borderTop: '1px solid #E5E5EA',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            paddingTop: '24px',
            zIndex: 100
        }}>
            {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <div
                        key={tab.id}
                        onClick={() => onNavigate && onNavigate(tab.id)}
                        onMouseEnter={() => setHoveredTab(tab.id)}
                        onMouseLeave={() => setHoveredTab(null)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: onNavigate ? 'pointer' : 'default',
                            color: isActive ? '#007AFF' : '#8E8E93',
                            opacity: hoveredTab === tab.id && !isActive ? 0.7 : 1,
                            transition: 'opacity 0.2s ease'
                        }}
                    >
                        <Icon size={24} fill={isActive ? '#007AFF' : 'none'} strokeWidth={2} />
                        <span style={{ fontSize: '10px', fontWeight: '500' }}>{tab.label}</span>
                    </div>
                );
            })}
        </nav>
    );
};

export default BottomNav;

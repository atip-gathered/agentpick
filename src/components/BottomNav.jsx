import React from 'react';
import { ThumbsUp, Search, MessageCircle, BookOpen, User } from 'lucide-react';

const BottomNav = ({ activeTab, onNavigate }) => {
    const tabs = [
        { id: 'swipe', icon: ThumbsUp, label: 'ピック' },
        { id: 'search', icon: Search, label: '探す' },
        { id: 'messages', icon: MessageCircle, label: 'メッセージ' },
        { id: 'detail', icon: BookOpen, label: '特集記事' },
        { id: 'profile', icon: User, label: 'マイページ' }
    ];

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
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: onNavigate ? 'pointer' : 'default',
                            color: isActive ? '#007AFF' : '#8E8E93'
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

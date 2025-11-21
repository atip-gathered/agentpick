import React from 'react';
import { X, User, ThumbsUp, Search, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MenuOverlay = ({ isOpen, onClose, isLoggedIn, onLogin, onMyPage }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Center horizontally
            width: '100%',
            maxWidth: '430px', // Limit width for SP view
            height: '100%',
            background: 'white',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 0 20px rgba(0,0,0,0.2)' // Add shadow for desktop view
        }}>
            {/* Header */}
            <div style={{
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Logo (Blue/Navy) */}
                    <img src="/logo-colored.png" alt="AGENT PICK" style={{ height: '24px' }} />
                </div>
                <div onClick={onClose} style={{ cursor: 'pointer' }}>
                    <X size={32} color="#1c274c" />
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                overflowY: 'auto'
            }}>
                {/* My Page / Login Button */}
                {isLoggedIn ? (
                    <button
                        onClick={onMyPage}
                        style={{
                            width: '100%',
                            background: '#007AFF',
                            color: 'white',
                            padding: '16px',
                            borderRadius: '100px',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 12px rgba(0,122,255,0.3)',
                            cursor: 'pointer'
                        }}
                    >
                        <User size={24} fill="white" />
                        マイページ
                    </button>
                ) : (
                    <button
                        onClick={onLogin}
                        style={{
                            width: '100%',
                            background: '#007AFF',
                            color: 'white',
                            padding: '16px',
                            borderRadius: '100px',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 12px rgba(0,122,255,0.3)',
                            cursor: 'pointer'
                        }}
                    >
                        <User size={24} fill="white" />
                        ログイン
                    </button>
                )}

                {/* Pick Button */}
                <button style={{
                    width: '100%',
                    background: '#FF9500',
                    color: 'white',
                    padding: '16px',
                    borderRadius: '100px',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(255,149,0,0.3)',
                    cursor: 'pointer'
                }}>
                    <ThumbsUp size={24} fill="white" />
                    ピックする
                </button>

                {/* Search Section */}
                <div style={{ width: '100%', marginTop: '24px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#007AFF',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '16px'
                    }}>
                        <Search size={24} />
                        簡単エージェント検索
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {['新卒採用', '第二新卒', '中途採用', '未経験者', 'ミドル・シニア', 'ハイクラス', 'ワーキングペアレント', '専門職・技術職'].map((tag, i) => (
                            <span key={i} style={{
                                background: '#E5E5EA',
                                color: '#8E8E93',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Help Link */}
                <div style={{
                    width: '100%',
                    marginTop: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#007AFF',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }}>
                    <HelpCircle size={20} />
                    AGENT PICKの使い方
                </div>
            </div>

            {/* Footer */}
            <div style={{
                background: '#1c274c',
                padding: '32px 24px',
                color: 'white',
                fontSize: '12px'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                    <div>&gt; プライバシーポリシー</div>
                    <div>&gt; 利用規約</div>
                    <div>&gt; お問い合わせ</div>
                    <div>&gt; 運営会社</div>
                </div>
                <div style={{ color: '#8E8E93' }}>
                    ©AGENT PICK ALL RIGHTS RESERVED.
                </div>
            </div>
        </div>
    );
};

export default MenuOverlay;

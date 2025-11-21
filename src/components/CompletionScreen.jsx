import React, { useState } from 'react';
import { Bell, Search, RefreshCw, MessageCircle } from 'lucide-react';

const CompletionScreen = ({ onReset, onMessageClick, onSearchClick }) => {
    const [hoveredButton, setHoveredButton] = useState(null);

    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            textAlign: 'center',
            background: 'white'
        }}>
            <div style={{ marginBottom: '24px' }}>
                <Bell size={80} color="#FF9500" fill="#FF9500" />
            </div>

            <h2 style={{ 
                fontSize: '28px', 
                fontWeight: 'bold', 
                color: '#FF9500', 
                marginBottom: '16px',
                lineHeight: '1.4'
            }}>
                すべてのエージェントを<br />確認しました！
            </h2>

            <p style={{ 
                color: '#8E8E93', 
                fontSize: '16px', 
                marginBottom: '40px',
                lineHeight: '1.6'
            }}>
                新しいエージェントが追加されるまで<br />お待ちください。
            </p>

            <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button
                    onClick={onMessageClick}
                    onMouseEnter={() => setHoveredButton('message')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        padding: '18px 24px',
                        background: hoveredButton === 'message' ? '#0062CC' : '#007AFF',
                        color: 'white',
                        borderRadius: '100px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        border: 'none',
                        lineHeight: '1.4'
                    }}
                >
                    <MessageCircle size={24} />
                    ピックしたエージェントにメッセージを送る
                </button>

                <button
                    onClick={onSearchClick}
                    onMouseEnter={() => setHoveredButton('search')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        padding: '18px 24px',
                        background: hoveredButton === 'search' ? '#F5F5F5' : 'white',
                        color: '#007AFF',
                        border: '2px solid #E5E5EA',
                        borderRadius: '100px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        lineHeight: '1.4'
                    }}
                >
                    <Search size={24} />
                    条件を絞ってエージェントを探す
                </button>

                <button
                    onClick={onReset}
                    onMouseEnter={() => setHoveredButton('reset')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        padding: '18px 24px',
                        background: hoveredButton === 'reset' ? '#F5F5F5' : 'white',
                        color: '#007AFF',
                        border: '2px solid #E5E5EA',
                        borderRadius: '100px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        lineHeight: '1.4'
                    }}
                >
                    <RefreshCw size={24} />
                    リフレッシュしてもう一度ピックする
                </button>
            </div>
        </div>
    );
};

export default CompletionScreen;

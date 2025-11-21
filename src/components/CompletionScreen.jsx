import React from 'react';
import { Bell, Search, RefreshCw, MessageCircle } from 'lucide-react';

const CompletionScreen = ({ onReset }) => {
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
                <Bell size={64} color="#FF9500" fill="#FF9500" />
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9500', marginBottom: '16px' }}>
                すべてのエージェントを<br />確認しました！
            </h2>

            <p style={{ color: '#8E8E93', fontSize: '14px', marginBottom: '40px' }}>
                新しいエージェントが追加されるまで<br />お待ちください。
            </p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button
                    onMouseEnter={() => setHoveredButton('message')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: hoveredButton === 'message' ? '#0062CC' : '#007AFF',
                        color: 'white',
                        borderRadius: '100px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                >
                    <MessageCircle size={20} />
                    ピックしたエージェントに<br />メッセージを送る
                </button>

                <button
                    onMouseEnter={() => setHoveredButton('search')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: hoveredButton === 'search' ? '#F5F5F5' : 'white',
                        color: '#007AFF',
                        border: '1px solid #E5E5EA',
                        borderRadius: '100px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                    }}
                >
                    <Search size={20} />
                    条件を絞ってエージェントを探す
                </button>

                <button
                    onClick={onReset}
                    onMouseEnter={() => setHoveredButton('reset')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: hoveredButton === 'reset' ? '#F5F5F5' : 'white',
                        color: '#007AFF',
                        border: '1px solid #E5E5EA',
                        borderRadius: '100px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                    }}
                >
                    <RefreshCw size={20} />
                    リフレッシュしてもう一度ピックする
                </button>
            </div>
        </div>
    );
};

export default CompletionScreen;

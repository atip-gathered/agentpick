import React, { useState } from 'react';
import { Mail, ArrowLeft, Check } from 'lucide-react';

const AgentForgotPasswordPage = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('メールアドレスを入力してください');
            return;
        }

        if (!email.includes('@')) {
            setError('有効なメールアドレスを入力してください');
            return;
        }

        // Simulate sending email
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div style={{
                width: '100%',
                maxWidth: '430px',
                height: '100vh',
                margin: '0 auto',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div style={{
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#E5F9EC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px'
                    }}>
                        <Check size={40} color="#34C759" />
                    </div>

                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#333',
                        marginBottom: '16px'
                    }}>
                        メールを送信しました
                    </h2>

                    <p style={{
                        fontSize: '15px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '32px'
                    }}>
                        {email} にパスワードリセット用のリンクを送信しました。<br />
                        メールをご確認ください。
                    </p>

                    <button
                        onClick={onBack}
                        onMouseEnter={() => setHoveredItem('back')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '8px',
                            border: 'none',
                            background: hoveredItem === 'back' ? '#0051CC' : '#007AFF',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: hoveredItem === 'back' ? '0 4px 12px rgba(0,122,255,0.3)' : 'none'
                        }}
                    >
                        ログインページに戻る
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            maxWidth: '430px',
            height: '100vh',
            margin: '0 auto',
            background: 'white',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <div style={{
                padding: '16px',
                borderBottom: '1px solid #E5E5E5',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <button
                    onClick={onBack}
                    onMouseEnter={() => setHoveredItem('back-btn')}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: 'none',
                        background: hoveredItem === 'back-btn' ? '#F0F0F0' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s ease'
                    }}
                >
                    <ArrowLeft size={20} color="#666" />
                </button>
                <h1 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333',
                    margin: 0
                }}>
                    パスワードをお忘れの方
                </h1>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                {/* Logo */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                }}>
                    <img
                        src="/logo.png"
                        alt="AGENT PICK"
                        style={{
                            height: '40px',
                            objectFit: 'contain',
                            marginBottom: '16px'
                        }}
                    />
                    <p style={{
                        fontSize: '14px',
                        color: '#666',
                        margin: 0,
                        lineHeight: '1.6'
                    }}>
                        ご登録いただいたメールアドレスを入力してください。<br />
                        パスワードリセット用のリンクをお送りします。
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    {/* Email Input */}
                    <div>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            <Mail size={16} color="#007AFF" />
                            メールアドレス
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@agent-pick.com"
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '1px solid #E5E5E5',
                                borderRadius: '8px',
                                fontSize: '15px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                            onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div style={{
                            padding: '12px 16px',
                            background: '#FFE5E5',
                            borderRadius: '8px',
                            color: '#FF3B30',
                            fontSize: '13px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        onMouseEnter={() => setHoveredItem('submit-btn')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            width: '100%',
                            padding: '16px',
                            border: 'none',
                            borderRadius: '8px',
                            background: hoveredItem === 'submit-btn' ? '#0051CC' : '#007AFF',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '12px',
                            boxShadow: hoveredItem === 'submit-btn' ? '0 4px 12px rgba(0,122,255,0.3)' : 'none',
                            transform: hoveredItem === 'submit-btn' ? 'translateY(-2px)' : 'translateY(0)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        送信
                    </button>
                </form>
            </div>

            {/* Footer */}
            <div style={{
                padding: '24px',
                textAlign: 'center',
                borderTop: '1px solid #E5E5E5'
            }}>
                <p style={{
                    fontSize: '11px',
                    color: '#999',
                    margin: 0
                }}>
                    © 2024 AGENT PICK. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AgentForgotPasswordPage;

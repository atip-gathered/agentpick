import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const AgentLoginPage = ({ onLogin, onBack, onForgotPassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email || !password) {
            setError('メールアドレスとパスワードを入力してください');
            return;
        }

        if (!email.includes('@')) {
            setError('有効なメールアドレスを入力してください');
            return;
        }

        // Check test account
        if (email === 'matsumoto@atip.co.jp' && password === '12345') {
            onLogin({ email, name: '山田 明子' });
        } else {
            setError('メールアドレスまたはパスワードが正しくありません');
        }
    };

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
                    エージェントログイン
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
                        margin: 0
                    }}>
                        エージェント管理システム
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

                    {/* Password Input */}
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
                            <Lock size={16} color="#007AFF" />
                            パスワード
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="パスワードを入力"
                                style={{
                                    width: '100%',
                                    padding: '14px 48px 14px 16px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseEnter={() => setHoveredItem('eye-btn')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: hoveredItem === 'eye-btn' ? '#F0F0F0' : 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background 0.2s ease'
                                }}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} color="#999" />
                                ) : (
                                    <Eye size={18} color="#999" />
                                )}
                            </button>
                        </div>
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
                        ログイン
                    </button>
                </form>

                {/* Footer Links */}
                <div style={{
                    marginTop: '32px',
                    textAlign: 'center'
                }}>
                    <button
                        onClick={onForgotPassword}
                        onMouseEnter={() => setHoveredItem('forgot-link')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            color: hoveredItem === 'forgot-link' ? '#0051CC' : '#007AFF',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            transition: 'color 0.2s ease'
                        }}
                    >
                        パスワードをお忘れの方
                    </button>
                </div>
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

export default AgentLoginPage;

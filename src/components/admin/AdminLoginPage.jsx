import React, { useState } from 'react';
import { Shield, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const AdminLoginPage = ({ onLogin, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simple validation
        if (!email || !password) {
            setError('メールアドレスとパスワードを入力してください');
            return;
        }

        // Mock admin login - in production, this would call an API
        if (email === 'admin@atip.co.jp' && password === 'admin123') {
            onLogin({ email, role: 'admin' });
        } else {
            setError('メールアドレスまたはパスワードが正しくありません');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            {/* Back Button */}
            <button
                onClick={onBack}
                onMouseEnter={() => setHoveredItem('back')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: hoveredItem === 'back' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <ArrowLeft size={18} />
                戻る
            </button>

            <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '48px 40px',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px'
                    }}>
                        <Shield size={32} color="white" />
                    </div>
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#333',
                        margin: '0 0 8px 0'
                    }}>
                        システム管理者ログイン
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        color: '#666',
                        margin: 0
                    }}>
                        管理者アカウントでログインしてください
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: '#FFF4F4',
                        border: '1px solid #FFE5E5',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        marginBottom: '24px',
                        color: '#FF3B30',
                        fontSize: '14px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            メールアドレス
                        </label>
                        <div style={{
                            position: 'relative'
                        }}>
                            <Mail 
                                size={20} 
                                color="#999" 
                                style={{
                                    position: 'absolute',
                                    left: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }}
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px 14px 48px',
                                    border: '2px solid #E5E5E5',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            パスワード
                        </label>
                        <div style={{
                            position: 'relative'
                        }}>
                            <Lock 
                                size={20} 
                                color="#999" 
                                style={{
                                    position: 'absolute',
                                    left: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }}
                            />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="パスワードを入力"
                                style={{
                                    width: '100%',
                                    padding: '14px 48px 14px 48px',
                                    border: '2px solid #E5E5E5',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} color="#999" />
                                ) : (
                                    <Eye size={20} color="#999" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        onMouseEnter={() => setHoveredItem('login')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: hoveredItem === 'login' 
                                ? 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: hoveredItem === 'login' 
                                ? '0 8px 24px rgba(102, 126, 234, 0.4)'
                                : '0 4px 12px rgba(102, 126, 234, 0.3)'
                        }}
                    >
                        ログイン
                    </button>
                </form>

                {/* Info */}
                <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    background: '#F8F9FA',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#666',
                    textAlign: 'center'
                }}>
                    <p style={{ margin: 0 }}>
                        🔒 このページは管理者専用です
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;

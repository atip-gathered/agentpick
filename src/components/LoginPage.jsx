import React, { useState } from 'react';
import { Mail, Lock, User, Briefcase } from 'lucide-react';

const LoginPage = ({ onLogin, onNavigateToRegister }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    return (
        <div style={{
            width: '100%',
            height: 'calc(100vh - 140px)', // Subtract header and potential padding
            overflowY: 'auto',
            background: '#FFFFFF',
            padding: '40px 20px 100px 20px'
        }}>
            <div style={{
                maxWidth: '500px',
                width: '100%',
                margin: '0 auto'
            }}>
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#007AFF',
                    marginBottom: '40px',
                    textAlign: 'center'
                }}>
                    ログイン
                </h1>

                {/* Email Input */}
                <div style={{ width: '100%', marginBottom: '24px' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#007AFF',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginBottom: '12px'
                    }}>
                        <Mail size={20} />
                        メールアドレス
                    </label>
                    <input
                        type="email"
                        placeholder="***@example.com"
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '8px',
                            border: '1px solid #E5E5EA',
                            fontSize: '16px',
                            outline: 'none',
                            color: '#333',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Password Input */}
                <div style={{ width: '100%', marginBottom: '32px' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#007AFF',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginBottom: '12px'
                    }}>
                        <Lock size={20} />
                        パスワード
                    </label>
                    <input
                        type="password"
                        placeholder="パスワードを入力"
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '8px',
                            border: '1px solid #E5E5EA',
                            fontSize: '16px',
                            outline: 'none',
                            color: '#333',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Login Button */}
                <button
                    onClick={onLogin}
                    onMouseEnter={() => setHoveredButton('login')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        background: hoveredButton === 'login' ? 'linear-gradient(90deg, #E68500 0%, #E67300 100%)' : 'linear-gradient(90deg, #FF9500 0%, #FF8000 100%)',
                        color: 'white',
                        padding: '16px',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        border: 'none',
                        marginBottom: '16px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                    }}
                >
                    ログイン
                </button>

                <div
                    onMouseEnter={() => setHoveredButton('forgot-password')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        fontSize: '14px',
                        color: '#333',
                        textAlign: 'center',
                        marginBottom: '32px',
                        opacity: hoveredButton === 'forgot-password' ? 0.7 : 1,
                        transition: 'opacity 0.2s ease',
                        cursor: 'pointer'
                    }}
                >
                    パスワードをお忘れですか？
                </div>

                {/* Register Section */}
                <div style={{
                    width: '100%',
                    background: '#E6F7FF',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#007AFF',
                        marginBottom: '16px'
                    }}>
                        アカウントをお持ちでない場合
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        <div
                            onClick={onNavigateToRegister}
                            onMouseEnter={() => setHoveredButton('register-job-seeker')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                color: '#333',
                                fontWeight: '600',
                                fontSize: '15px',
                                opacity: hoveredButton === 'register-job-seeker' ? 0.7 : 1,
                                transition: 'opacity 0.2s ease',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            <User size={20} style={{ color: '#333' }} />
                            求職者として登録
                        </div>
                        <div
                            onMouseEnter={() => setHoveredButton('register-agent')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                color: '#333',
                                fontWeight: '600',
                                fontSize: '15px',
                                opacity: hoveredButton === 'register-agent' ? 0.7 : 1,
                                transition: 'opacity 0.2s ease',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            <Briefcase size={20} style={{ color: '#333' }} />
                            エージェントとして登録
                        </div>
                    </div>
                </div>

                {/* External Login */}
                <div style={{ width: '100%' }}>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#007AFF',
                        marginBottom: '16px'
                    }}>
                        外部IDでログイン
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button
                            onMouseEnter={() => setHoveredButton('google-login')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                width: '100%',
                                background: hoveredButton === 'google-login' ? '#F5F5F5' : 'white',
                                border: '2px solid #E5E5EA',
                                color: '#007AFF',
                                padding: '14px',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                        >
                            <span style={{
                                fontSize: '22px',
                                fontWeight: 'bold',
                                color: '#4285F4'
                            }}>G</span>
                            Googleアカウントでログイン
                        </button>
                        <button
                            onMouseEnter={() => setHoveredButton('line-login')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                width: '100%',
                                background: hoveredButton === 'line-login' ? '#F5F5F5' : 'white',
                                border: '2px solid #E5E5EA',
                                color: '#007AFF',
                                padding: '14px',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: '#06C755',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}>
                                L
                            </div>
                            LINEアカウントでログイン
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

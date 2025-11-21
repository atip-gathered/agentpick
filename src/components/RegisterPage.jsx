import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

const RegisterPage = ({ onRegister, onNavigateToLogin }) => {
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
                    新規登録
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
                <div style={{ width: '100%', marginBottom: '12px' }}>
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

                <div style={{
                    width: '100%',
                    fontSize: '13px',
                    color: '#666',
                    marginBottom: '28px'
                }}>
                    8~20の半角英数字で設定してください。
                </div>

                {/* Privacy Policy Checkbox */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '32px'
                }}>
                    <input
                        type="checkbox"
                        id="privacy"
                        style={{
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            accentColor: '#007AFF'
                        }}
                    />
                    <label htmlFor="privacy" style={{ fontSize: '15px', color: '#333', cursor: 'pointer' }}>
                        <span style={{ color: '#007AFF', textDecoration: 'underline', fontWeight: '600' }}>プライバシーポリシー</span>
                        に同意する
                    </label>
                </div>

                {/* Register Button */}
                <button
                    onClick={onRegister}
                    onMouseEnter={() => setHoveredButton('register')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        background: hoveredButton === 'register' ? 'linear-gradient(90deg, #E68500 0%, #E67300 100%)' : 'linear-gradient(90deg, #FF9500 0%, #FF8000 100%)',
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
                    登録する
                </button>

                <div
                    onClick={onNavigateToLogin}
                    onMouseEnter={() => setHoveredButton('login-link')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        fontSize: '14px',
                        color: '#333',
                        textAlign: 'center',
                        opacity: hoveredButton === 'login-link' ? 0.7 : 1,
                        transition: 'opacity 0.2s ease',
                        cursor: 'pointer',
                        marginBottom: '40px',
                        textDecoration: 'underline'
                    }}
                >
                    アカウントをお持ちの方はこちら
                </div>

                {/* External Register */}
                <div style={{ width: '100%' }}>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#007AFF',
                        marginBottom: '16px'
                    }}>
                        外部IDで登録
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button
                            onMouseEnter={() => setHoveredButton('google-register')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                width: '100%',
                                background: hoveredButton === 'google-register' ? '#F5F5F5' : 'white',
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
                            Googleアカウントで登録
                        </button>
                        <button
                            onMouseEnter={() => setHoveredButton('line-register')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                width: '100%',
                                background: hoveredButton === 'line-register' ? '#F5F5F5' : 'white',
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
                            LINEアカウントで登録
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

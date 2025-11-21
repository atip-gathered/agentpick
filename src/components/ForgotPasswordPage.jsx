import React, { useState } from 'react';
import { Mail, ArrowLeft, Check } from 'lucide-react';

const ForgotPasswordPage = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleSubmit = () => {
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
                height: 'calc(100vh - 140px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFFFFF',
                padding: '20px'
            }}>
                <div style={{
                    maxWidth: '500px',
                    width: '100%',
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
                        onMouseEnter={() => setHoveredButton('back')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '30px',
                            border: 'none',
                            background: hoveredButton === 'back' ? '#0051CC' : '#007AFF',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: hoveredButton === 'back' ? '0 4px 12px rgba(0,122,255,0.3)' : 'none'
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
            height: 'calc(100vh - 140px)',
            overflowY: 'auto',
            background: '#FFFFFF',
            padding: '40px 20px 100px 20px'
        }}>
            <div style={{
                maxWidth: '500px',
                width: '100%',
                margin: '0 auto'
            }}>
                {/* Back Button */}
                <button
                    onClick={onBack}
                    onMouseEnter={() => setHoveredButton('back-btn')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'transparent',
                        border: 'none',
                        color: hoveredButton === 'back-btn' ? '#0051CC' : '#007AFF',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginBottom: '24px',
                        padding: 0,
                        transition: 'color 0.2s ease'
                    }}
                >
                    <ArrowLeft size={20} />
                    戻る
                </button>

                <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#007AFF',
                    marginBottom: '16px',
                    textAlign: 'center'
                }}>
                    パスワードをお忘れの方
                </h1>

                <p style={{
                    fontSize: '14px',
                    color: '#666',
                    textAlign: 'center',
                    lineHeight: '1.6',
                    marginBottom: '40px'
                }}>
                    ご登録いただいたメールアドレスを入力してください。<br />
                    パスワードリセット用のリンクをお送りします。
                </p>

                {/* Email Input */}
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
                        <Mail size={20} />
                        メールアドレス
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
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

                {/* Error Message */}
                {error && (
                    <div style={{
                        marginBottom: '20px',
                        padding: '12px 16px',
                        background: '#FFE5E5',
                        borderRadius: '8px',
                        color: '#FF3B30',
                        fontSize: '14px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    onMouseEnter={() => setHoveredButton('submit')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        background: hoveredButton === 'submit' ? 'linear-gradient(90deg, #E68500 0%, #E67300 100%)' : 'linear-gradient(90deg, #FF9500 0%, #FF8000 100%)',
                        color: 'white',
                        padding: '16px',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: hoveredButton === 'submit' ? '0 4px 12px rgba(255,149,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    送信
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

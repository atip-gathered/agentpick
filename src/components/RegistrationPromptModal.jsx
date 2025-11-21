import React from 'react';
import { X, Sparkles, TrendingUp, Shield, CheckCircle } from 'lucide-react';

const RegistrationPromptModal = ({ isOpen, onClose, onRegister }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '380px',
                padding: '32px 24px 24px',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                animation: 'slideUp 0.3s ease-out'
            }}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: '#F5F5F5',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#E5E5E5'}
                    onMouseLeave={(e) => e.target.style.background = '#F5F5F5'}
                >
                    <X size={18} color="#666" />
                </button>

                {/* Icon with gradient background */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                }}>
                    <Sparkles size={40} color="white" strokeWidth={2} />
                </div>

                {/* Title */}
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    textAlign: 'center',
                    marginBottom: '12px',
                    lineHeight: '1.3'
                }}>
                    会員登録してピックした<br />エージェントとメッセージしませんか？
                </h2>

                {/* Description */}
                <p style={{
                    fontSize: '14px',
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: '24px',
                    lineHeight: '1.6'
                }}>
                    無料会員登録で気になるエージェントと<br />
                    直接メッセージのやり取りができます
                </p>

                {/* Benefits */}
                <div style={{
                    background: '#F8F9FA',
                    borderRadius: '16px',
                    padding: '16px',
                    marginBottom: '24px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '12px'
                    }}>
                        <div style={{
                            minWidth: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CheckCircle size={20} color="#10b981" />
                        </div>
                        <div style={{
                            fontSize: '13px',
                            color: '#333',
                            lineHeight: '1.5'
                        }}>
                            <strong>完全無料</strong>で利用できます
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '12px'
                    }}>
                        <div style={{
                            minWidth: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TrendingUp size={20} color="#10b981" />
                        </div>
                        <div style={{
                            fontSize: '13px',
                            color: '#333',
                            lineHeight: '1.5'
                        }}>
                            <strong>専門エージェント</strong>があなたの転職をサポート
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                    }}>
                        <div style={{
                            minWidth: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Shield size={20} color="#10b981" />
                        </div>
                        <div style={{
                            fontSize: '13px',
                            color: '#333',
                            lineHeight: '1.5'
                        }}>
                            <strong>個人情報</strong>は安全に管理されます
                        </div>
                    </div>
                </div>

                {/* Primary CTA Button */}
                <button
                    onClick={onRegister}
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                        transition: 'all 0.2s ease',
                        marginBottom: '12px'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                    }}
                >
                    無料会員登録
                </button>

                {/* Secondary Button - Skip */}
                <button
                    onClick={onClose}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: 'transparent',
                        color: '#999',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.color = '#666';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = '#999';
                    }}
                >
                    今はしない
                </button>
            </div>

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default RegistrationPromptModal;

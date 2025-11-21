import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Calendar, User, Briefcase, FileText, Download } from 'lucide-react';

const UserProfileModal = ({ user, onClose }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    if (!user) return null;

    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'flex-end',
                zIndex: 2000
            }}
            onClick={onClose}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'white',
                    width: '100%',
                    maxHeight: '90vh',
                    borderRadius: '20px 20px 0 0',
                    overflowY: 'auto',
                    animation: 'slideUp 0.3s ease'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #E5E5E5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    background: 'white',
                    zIndex: 10
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#333',
                        margin: 0
                    }}>
                        求職者プロフィール
                    </h2>
                    <button
                        onClick={onClose}
                        onMouseEnter={() => setHoveredItem('close')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: 'none',
                            background: hoveredItem === 'close' ? '#F0F0F0' : 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s ease'
                        }}
                    >
                        <X size={20} color="#666" />
                    </button>
                </div>

                {/* User Info */}
                <div style={{ padding: '24px' }}>
                    {/* Profile Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '24px',
                        padding: '20px',
                        background: '#F8F8F8',
                        borderRadius: '12px'
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: '#E5E5E5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                            flexShrink: 0
                        }}>
                            👤
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#333',
                                margin: '0 0 4px 0'
                            }}>
                                {user.name}
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: '#666',
                                margin: 0
                            }}>
                                {user.position || '職種未設定'}
                            </p>
                        </div>
                    </div>

                    {/* Basic Info Section */}
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        border: '1px solid #E5E5E5',
                        padding: '20px',
                        marginBottom: '16px'
                    }}>
                        <h4 style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#333',
                            margin: '0 0 16px 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <User size={18} color="#007AFF" />
                            基本情報
                        </h4>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            {user.birthDate && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <Calendar size={16} color="#666" />
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#999', marginBottom: '2px' }}>
                                            生年月日 / 年齢
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                                            {user.birthDate} ({user.age})
                                        </div>
                                    </div>
                                </div>
                            )}

                            {user.gender && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <User size={16} color="#666" />
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#999', marginBottom: '2px' }}>
                                            性別
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                                            {user.gender}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {user.email && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <Mail size={16} color="#666" />
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#999', marginBottom: '2px' }}>
                                            メールアドレス
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {user.phone && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <Phone size={16} color="#666" />
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#999', marginBottom: '2px' }}>
                                            電話番号
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                                            {user.phone}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {user.location && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <MapPin size={16} color="#666" />
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#999', marginBottom: '2px' }}>
                                            現在地
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                                            {user.location}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {user.education && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <Briefcase size={16} color="#666" />
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#999', marginBottom: '2px' }}>
                                            最終学歴
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                                            {user.education}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Job Search Info Section */}
                    {user.desiredPosition && (
                        <div style={{
                            background: 'white',
                            borderRadius: '12px',
                            border: '1px solid #E5E5E5',
                            padding: '20px',
                            marginBottom: '16px'
                        }}>
                            <h4 style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#333',
                                margin: '0 0 12px 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <Briefcase size={18} color="#007AFF" />
                                希望条件
                            </h4>
                            <div style={{
                                fontSize: '14px',
                                color: '#333',
                                fontWeight: '500'
                            }}>
                                {user.desiredPosition}
                            </div>
                        </div>
                    )}

                    {/* Documents Section */}
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        border: '1px solid #E5E5E5',
                        padding: '20px'
                    }}>
                        <h4 style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#333',
                            margin: '0 0 16px 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <FileText size={18} color="#007AFF" />
                            応募書類
                        </h4>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            {user.resume && (
                                <button
                                    onMouseEnter={() => setHoveredItem('resume')}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        background: hoveredItem === 'resume' ? '#F8F8F8' : '#F0F0F0',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}>
                                        <FileText size={20} color="#007AFF" />
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#333'
                                            }}>
                                                履歴書
                                            </div>
                                            <div style={{
                                                fontSize: '12px',
                                                color: '#666'
                                            }}>
                                                {user.resume}
                                            </div>
                                        </div>
                                    </div>
                                    <Download size={18} color="#007AFF" />
                                </button>
                            )}

                            {user.workHistory && (
                                <button
                                    onMouseEnter={() => setHoveredItem('workHistory')}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        background: hoveredItem === 'workHistory' ? '#F8F8F8' : '#F0F0F0',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}>
                                        <FileText size={20} color="#007AFF" />
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#333'
                                            }}>
                                                職務経歴書
                                            </div>
                                            <div style={{
                                                fontSize: '12px',
                                                color: '#666'
                                            }}>
                                                {user.workHistory}
                                            </div>
                                        </div>
                                    </div>
                                    <Download size={18} color="#007AFF" />
                                </button>
                            )}

                            {!user.resume && !user.workHistory && (
                                <p style={{
                                    fontSize: '14px',
                                    color: '#999',
                                    textAlign: 'center',
                                    margin: '20px 0'
                                }}>
                                    応募書類がアップロードされていません
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Animation */}
                <style>
                    {`
                        @keyframes slideUp {
                            from {
                                transform: translateY(100%);
                            }
                            to {
                                transform: translateY(0);
                            }
                        }
                    `}
                </style>
            </div>
        </div>
    );
};

export default UserProfileModal;

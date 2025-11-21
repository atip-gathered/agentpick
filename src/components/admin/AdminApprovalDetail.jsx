import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, FileText, CheckCircle, XCircle, AlertCircle, Building2, Calendar, Clock } from 'lucide-react';

const AdminApprovalDetail = ({ request, onBack, onApprove, onReject }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [showApproveConfirm, setShowApproveConfirm] = useState(false);
    const [showRejectConfirm, setShowRejectConfirm] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const getFieldLabel = (field) => {
        const labels = {
            name: '名前',
            email: 'メールアドレス',
            phone: '電話番号',
            bio: '自己紹介',
            location: '所在地',
            company: '企業名'
        };
        return labels[field] || field;
    };

    const getFieldIcon = (field) => {
        switch(field) {
            case 'name': return <User size={16} />;
            case 'email': return <Mail size={16} />;
            case 'phone': return <Phone size={16} />;
            case 'bio': return <FileText size={16} />;
            default: return <AlertCircle size={16} />;
        }
    };

    const renderDiff = (field) => {
        const oldValue = request.currentData[field] || '（未設定）';
        const newValue = request.requestedData[field] || '（未設定）';

        return (
            <div key={field} style={{
                background: '#f9fafb',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '12px',
                border: '1px solid #E5E5E5'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                }}>
                    <div style={{ color: '#667eea' }}>
                        {getFieldIcon(field)}
                    </div>
                    <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1a1a2e'
                    }}>
                        {getFieldLabel(field)}
                    </span>
                    <span style={{
                        fontSize: '11px',
                        background: '#fef3c7',
                        color: '#f59e0b',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: '600'
                    }}>
                        変更あり
                    </span>
                </div>

                {/* Old Value */}
                <div style={{
                    marginBottom: '8px'
                }}>
                    <div style={{
                        fontSize: '11px',
                        color: '#999',
                        marginBottom: '4px',
                        fontWeight: '600'
                    }}>
                        現在の内容:
                    </div>
                    <div style={{
                        background: '#fee2e2',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        fontSize: '13px',
                        color: '#991b1b',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {oldValue}
                    </div>
                </div>

                {/* New Value */}
                <div>
                    <div style={{
                        fontSize: '11px',
                        color: '#999',
                        marginBottom: '4px',
                        fontWeight: '600'
                    }}>
                        変更後の内容:
                    </div>
                    <div style={{
                        background: '#d1fae5',
                        border: '1px solid '#a7f3d0',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        fontSize: '13px',
                        color: '#065f46',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {newValue}
                    </div>
                </div>
            </div>
        );
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'pending':
                return { bg: '#fef3c7', color: '#f59e0b', icon: <Clock size={18} /> };
            case 'approved':
                return { bg: '#d1fae5', color: '#10b981', icon: <CheckCircle size={18} /> };
            case 'rejected':
                return { bg: '#fee2e2', color: '#ef4444', icon: <XCircle size={18} /> };
            default:
                return { bg: '#f5f5f5', color: '#999', icon: <AlertCircle size={18} /> };
        }
    };

    const statusStyle = getStatusStyle(request.status);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F5F5F5',
            overflowY: 'auto',
            position: 'relative'
        }}>
            {/* Header */}
            <div style={{
                background: 'white',
                padding: '16px',
                borderBottom: '1px solid #E5E5E5',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <button
                        onClick={onBack}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <ArrowLeft size={24} color="#667eea" />
                    </button>
                    <h1 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#1a1a2e',
                        margin: 0,
                        flex: 1
                    }}>
                        プロフィール変更承認
                    </h1>
                </div>
            </div>

            {/* Request Info Card */}
            <div style={{
                background: 'white',
                margin: '16px',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                }}>
                    <div>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#1a1a2e',
                            margin: '0 0 8px 0'
                        }}>
                            {request.agentName}
                        </h2>
                        <div style={{
                            fontSize: '13px',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <Building2 size={14} />
                            {request.companyName}
                        </div>
                    </div>

                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        fontWeight: '600',
                        fontSize: '14px'
                    }}>
                        {statusStyle.icon}
                        {request.status === 'pending' && '承認待ち'}
                        {request.status === 'approved' && '承認済み'}
                        {request.status === 'rejected' && '差し戻し'}
                    </div>
                </div>

                <div style={{
                    fontSize: '12px',
                    color: '#999',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #E5E5E5'
                }}>
                    <Calendar size={12} />
                    リクエスト日時: {formatDate(request.requestedAt)}
                </div>
            </div>

            {/* Changed Fields */}
            <div style={{
                background: 'white',
                margin: '0 16px 16px 16px',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
                <h3 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1a1a2e',
                    margin: '0 0 16px 0'
                }}>
                    変更内容 ({request.changedFields.length}項目)
                </h3>

                {request.changedFields.map(field => renderDiff(field))}
            </div>

            {/* Action Buttons (only for pending requests) */}
            {request.status === 'pending' && (
                <div style={{
                    background: 'white',
                    margin: '0 16px 100px 16px',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
                }}>
                    <h3 style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#1a1a2e',
                        margin: '0 0 16px 0'
                    }}>
                        アクション
                    </h3>

                    <div style={{
                        display: 'flex',
                        gap: '12px'
                    }}>
                        <button
                            onClick={() => setShowApproveConfirm(true)}
                            onMouseEnter={() => setHoveredButton('approve')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                flex: 1,
                                background: hoveredButton === 'approve'
                                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '14px',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <CheckCircle size={20} />
                            承認する
                        </button>

                        <button
                            onClick={() => setShowRejectConfirm(true)}
                            onMouseEnter={() => setHoveredButton('reject')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                flex: 1,
                                background: hoveredButton === 'reject' ? '#dc2626' : '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '14px',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <XCircle size={20} />
                            差し戻す
                        </button>
                    </div>
                </div>
            )}

            {/* Approve Confirmation Modal */}
            {showApproveConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        maxWidth: '400px',
                        width: '100%',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px'
                        }}>
                            <CheckCircle size={32} color="white" />
                        </div>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#1a1a2e',
                            margin: '0 0 12px 0',
                            textAlign: 'center'
                        }}>
                            プロフィール変更を承認
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#666',
                            lineHeight: '1.6',
                            margin: '0 0 24px 0',
                            textAlign: 'center'
                        }}>
                            {request.agentName}さんのプロフィール変更を承認しますか？<br />
                            変更内容が求職者画面に公開されます。
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '12px'
                        }}>
                            <button
                                onClick={() => setShowApproveConfirm(false)}
                                style={{
                                    flex: 1,
                                    background: '#f5f5f5',
                                    color: '#666',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={() => {
                                    onApprove(request.id);
                                    setShowApproveConfirm(false);
                                }}
                                style={{
                                    flex: 1,
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                承認する
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Confirmation Modal */}
            {showRejectConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        maxWidth: '400px',
                        width: '100%',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px'
                        }}>
                            <XCircle size={32} color="white" />
                        </div>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#1a1a2e',
                            margin: '0 0 12px 0',
                            textAlign: 'center'
                        }}>
                            プロフィール変更を差し戻し
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#666',
                            lineHeight: '1.6',
                            margin: '0 0 16px 0',
                            textAlign: 'center'
                        }}>
                            {request.agentName}さんに差し戻し理由を通知します。
                        </p>
                        
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                差し戻し理由 <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="差し戻しの理由を入力してください"
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '12px'
                        }}>
                            <button
                                onClick={() => {
                                    setShowRejectConfirm(false);
                                    setRejectReason('');
                                }}
                                style={{
                                    flex: 1,
                                    background: '#f5f5f5',
                                    color: '#666',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={() => {
                                    if (rejectReason.trim()) {
                                        onReject(request.id, rejectReason);
                                        setShowRejectConfirm(false);
                                        setRejectReason('');
                                    } else {
                                        alert('差し戻し理由を入力してください');
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                差し戻す
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminApprovalDetail;

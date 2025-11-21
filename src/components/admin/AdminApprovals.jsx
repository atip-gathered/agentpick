import React, { useState } from 'react';
import { Search, Clock, CheckCircle, User, Building2, Calendar, ChevronRight } from 'lucide-react';

const AdminApprovals = ({ requests = [], onViewDetail }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [statusFilter, setStatusFilter] = useState('pending'); // 'all', 'pending', 'approved', 'rejected'

    // Filter requests based on search query and status
    const filteredRequests = requests.filter(request => {
        const matchesSearch = 
            request.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.companyName.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Calculate statistics
    const pendingCount = requests.filter(r => r.status === 'pending').length;
    const approvedCount = requests.filter(r => r.status === 'approved').length;
    const rejectedCount = requests.filter(r => r.status === 'rejected').length;

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return { bg: '#fef3c7', color: '#f59e0b' };
            case 'approved': return { bg: '#d1fae5', color: '#10b981' };
            case 'rejected': return { bg: '#fee2e2', color: '#ef4444' };
            default: return { bg: '#f5f5f5', color: '#999' };
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'pending': return '承認待ち';
            case 'approved': return '承認済み';
            case 'rejected': return '差し戻し';
            default: return '不明';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return '今日';
        } else if (diffDays === 1) {
            return '昨日';
        } else if (diffDays < 7) {
            return `${diffDays}日前`;
        } else {
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F5F5F5',
            overflowY: 'auto'
        }}>
            {/* Header Section */}
            <div style={{
                background: 'white',
                padding: '24px 20px',
                borderBottom: '1px solid #E5E5E5'
            }}>
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1a1a2e',
                    margin: '0 0 8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <CheckCircle size={28} color="#667eea" />
                    プロフィール承認
                </h1>
                <p style={{
                    fontSize: '13px',
                    color: '#666',
                    margin: 0
                }}>
                    個人アカウントのプロフィール変更リクエストを確認・承認
                </p>
            </div>

            {/* Statistics Cards */}
            <div style={{
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: 'white'
                }}>
                    <div style={{
                        fontSize: '11px',
                        opacity: 0.9,
                        marginBottom: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <Clock size={12} />
                        承認待ち
                    </div>
                    <div style={{
                        fontSize: '28px',
                        fontWeight: 'bold'
                    }}>
                        {pendingCount}
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: 'white'
                }}>
                    <div style={{
                        fontSize: '11px',
                        opacity: 0.9,
                        marginBottom: '6px'
                    }}>
                        承認済み
                    </div>
                    <div style={{
                        fontSize: '28px',
                        fontWeight: 'bold'
                    }}>
                        {approvedCount}
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: 'white'
                }}>
                    <div style={{
                        fontSize: '11px',
                        opacity: 0.9,
                        marginBottom: '6px'
                    }}>
                        差し戻し
                    </div>
                    <div style={{
                        fontSize: '28px',
                        fontWeight: 'bold'
                    }}>
                        {rejectedCount}
                    </div>
                </div>
            </div>

            {/* Status Filter */}
            <div style={{
                padding: '0 16px 16px 16px'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    background: 'white',
                    padding: '8px',
                    borderRadius: '12px',
                    border: '1px solid #E5E5E5'
                }}>
                    {[
                        { value: 'all', label: 'すべて' },
                        { value: 'pending', label: '承認待ち' },
                        { value: 'approved', label: '承認済み' },
                        { value: 'rejected', label: '差し戻し' }
                    ].map(filter => (
                        <button
                            key={filter.value}
                            onClick={() => setStatusFilter(filter.value)}
                            style={{
                                flex: 1,
                                padding: '8px',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                background: statusFilter === filter.value 
                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    : 'transparent',
                                color: statusFilter === filter.value ? 'white' : '#666',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div style={{
                padding: '0 16px 16px 16px'
            }}>
                <div style={{
                    position: 'relative',
                    width: '100%'
                }}>
                    <Search 
                        size={20} 
                        style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#999'
                        }}
                    />
                    <input
                        type="text"
                        placeholder="エージェント名、企業名で検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '14px 14px 14px 44px',
                            border: '1px solid #E5E5E5',
                            borderRadius: '12px',
                            fontSize: '14px',
                            outline: 'none',
                            background: 'white'
                        }}
                    />
                </div>
            </div>

            {/* Requests List */}
            <div style={{
                padding: '0 16px 100px 16px'
            }}>
                <h2 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1a1a2e',
                    margin: '0 0 16px 0'
                }}>
                    リクエスト一覧 ({filteredRequests.length})
                </h2>

                {filteredRequests.length === 0 ? (
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '40px 20px',
                        textAlign: 'center',
                        color: '#999'
                    }}>
                        <CheckCircle size={48} color="#E5E5E5" style={{ marginBottom: '16px' }} />
                        <p style={{ margin: 0, fontSize: '14px' }}>
                            {searchQuery ? '検索結果が見つかりません' : '承認待ちのリクエストはありません'}
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        {filteredRequests.map((request) => {
                            const statusStyle = getStatusColor(request.status);
                            return (
                                <div
                                    key={request.id}
                                    onClick={() => onViewDetail(request)}
                                    onMouseEnter={() => setHoveredCard(request.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        background: 'white',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        transform: hoveredCard === request.id ? 'translateY(-2px)' : 'translateY(0)',
                                        boxShadow: hoveredCard === request.id 
                                            ? '0 6px 20px rgba(0,0,0,0.12)' 
                                            : '0 2px 8px rgba(0,0,0,0.06)',
                                        border: '1px solid #E5E5E5'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px'
                                    }}>
                                        {/* Agent Info */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginBottom: '8px'
                                            }}>
                                                <h3 style={{
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    color: '#1a1a2e',
                                                    margin: 0
                                                }}>
                                                    {request.agentName}
                                                </h3>
                                                <span style={{
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    padding: '3px 8px',
                                                    borderRadius: '6px',
                                                    background: statusStyle.bg,
                                                    color: statusStyle.color
                                                }}>
                                                    {getStatusText(request.status)}
                                                </span>
                                            </div>

                                            <div style={{
                                                fontSize: '13px',
                                                color: '#666',
                                                marginBottom: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}>
                                                <Building2 size={14} />
                                                {request.companyName}
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                fontSize: '12px',
                                                color: '#999'
                                            }}>
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}>
                                                    <Calendar size={12} />
                                                    {formatDate(request.requestedAt)}
                                                </span>
                                                <span style={{
                                                    background: '#f0f3ff',
                                                    color: '#667eea',
                                                    padding: '3px 8px',
                                                    borderRadius: '6px',
                                                    fontWeight: '600',
                                                    fontSize: '11px'
                                                }}>
                                                    {request.changedFields.length}項目変更
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow Icon */}
                                        <ChevronRight
                                            size={24}
                                            color="#999"
                                            style={{
                                                flexShrink: 0,
                                                transition: 'transform 0.2s ease',
                                                transform: hoveredCard === request.id ? 'translateX(4px)' : 'translateX(0)'
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminApprovals;

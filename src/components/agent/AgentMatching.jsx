import React, { useState } from 'react';
import { Users, Search, Filter, Check, Clock, CheckCircle, XCircle, Eye, MessageCircle, MoreVertical, X, User } from 'lucide-react';

const AgentMatching = ({ matchedUsers, onNavigateToUser, onNavigateToChat, onUpdateUserStatus, agentData, childAgents }) => {
    const isParentAccount = agentData?.isParentAccount || false;
    
    // Get child agent name by ID
    const getChildAgentName = (childAgentId) => {
        if (!childAgentId) return '親アカウント';
        const childAgent = childAgents?.find(child => child.id === childAgentId);
        return childAgent ? childAgent.name : '未割当';
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'in_progress', 'completed', 'declined'
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showStatusMenu, setShowStatusMenu] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    // Filter users based on search and status
    const filteredUsers = matchedUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (user.position && user.position.toLowerCase().includes(searchQuery.toLowerCase()));
        
        if (filterStatus === 'all') {
            return matchesSearch;
        }
        
        return matchesSearch && user.status === filterStatus;
    }).sort((a, b) => new Date(b.matchedAt) - new Date(a.matchedAt));

    const statusOptions = [
        { value: 'all', label: 'すべて', count: matchedUsers.length },
        { value: 'active', label: 'アクティブ', icon: CheckCircle, color: '#34C759', count: matchedUsers.filter(u => u.status === 'active').length },
        { value: 'in_progress', label: '対応中', icon: Clock, color: '#FF9500', count: matchedUsers.filter(u => u.status === 'in_progress').length },
        { value: 'completed', label: '完了', icon: Check, color: '#007AFF', count: matchedUsers.filter(u => u.status === 'completed').length },
        { value: 'declined', label: '辞退', icon: XCircle, color: '#FF3B30', count: matchedUsers.filter(u => u.status === 'declined').length }
    ];

    const getStatusInfo = (status) => {
        const option = statusOptions.find(opt => opt.value === status);
        return option || statusOptions[0];
    };

    const handleUpdateStatus = (userId, newStatus) => {
        onUpdateUserStatus(userId, newStatus);
        setShowStatusMenu(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', { 
            year: 'numeric',
            month: 'short', 
            day: 'numeric' 
        });
    };

    // User Detail Modal
    const UserDetailModal = ({ user, onClose }) => {
        const statusInfo = getStatusInfo(user.status);
        const StatusIcon = statusInfo.icon;

        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'flex-end',
                zIndex: 1000
            }}
            onClick={onClose}
            >
                <div 
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'white',
                        width: '100%',
                        maxHeight: '85vh',
                        borderRadius: '20px 20px 0 0',
                        padding: '24px',
                        overflowY: 'auto',
                        animation: 'slideUp 0.3s ease'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#333',
                            margin: 0
                        }}>
                            ユーザー詳細
                        </h2>
                        <button
                            onClick={onClose}
                            onMouseEnter={() => setHoveredItem('close-modal')}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: 'none',
                                background: hoveredItem === 'close-modal' ? '#F0F0F0' : 'transparent',
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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '24px',
                        padding: '16px',
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
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#333',
                                margin: '0 0 4px 0'
                            }}>
                                {user.name}
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: '#666',
                                margin: '0 0 8px 0'
                            }}>
                                {user.position || '職種未設定'}
                            </p>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px'
                            }}>
                                {StatusIcon && <StatusIcon size={14} color={statusInfo.color} />}
                                <span style={{ color: statusInfo.color, fontWeight: '600' }}>
                                    {statusInfo.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        marginBottom: '24px'
                    }}>
                        <div>
                            <div style={{
                                fontSize: '12px',
                                color: '#999',
                                marginBottom: '4px'
                            }}>
                                マッチング日時
                            </div>
                            <div style={{
                                fontSize: '14px',
                                color: '#333',
                                fontWeight: '500'
                            }}>
                                {formatDate(user.matchedAt)}
                            </div>
                        </div>

                        {user.email && (
                            <div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#999',
                                    marginBottom: '4px'
                                }}>
                                    メールアドレス
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#333',
                                    fontWeight: '500'
                                }}>
                                    {user.email}
                                </div>
                            </div>
                        )}

                        {user.phone && (
                            <div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#999',
                                    marginBottom: '4px'
                                }}>
                                    電話番号
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#333',
                                    fontWeight: '500'
                                }}>
                                    {user.phone}
                                </div>
                            </div>
                        )}

                        {user.desiredPosition && (
                            <div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#999',
                                    marginBottom: '4px'
                                }}>
                                    希望職種
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#333',
                                    fontWeight: '500'
                                }}>
                                    {user.desiredPosition}
                                </div>
                            </div>
                        )}

                        {user.notes && (
                            <div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#999',
                                    marginBottom: '4px'
                                }}>
                                    メモ
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#333',
                                    lineHeight: '1.6',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {user.notes}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px'
                    }}>
                        <button
                            onClick={() => {
                                onNavigateToChat(user.id);
                                onClose();
                            }}
                            onMouseEnter={() => setHoveredItem('chat-action')}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                padding: '14px',
                                borderRadius: '8px',
                                border: 'none',
                                background: hoveredItem === 'chat-action' ? '#0051CC' : '#007AFF',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <MessageCircle size={18} />
                            メッセージ
                        </button>
                        
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowStatusMenu(showStatusMenu === user.id ? null : user.id)}
                                onMouseEnter={() => setHoveredItem('status-action')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E5E5',
                                    background: hoveredItem === 'status-action' ? '#F8F8F8' : 'white',
                                    color: '#333',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                ステータス変更
                            </button>
                            
                            {showStatusMenu === user.id && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '100%',
                                    right: 0,
                                    marginBottom: '8px',
                                    background: 'white',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    zIndex: 100,
                                    minWidth: '160px'
                                }}>
                                    {statusOptions.slice(1).map((option) => {
                                        const Icon = option.icon;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => handleUpdateStatus(user.id, option.value)}
                                                onMouseEnter={() => setHoveredItem(`status-opt-${option.value}`)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    border: 'none',
                                                    background: hoveredItem === `status-opt-${option.value}` ? '#F8F8F8' : 'white',
                                                    textAlign: 'left',
                                                    fontSize: '14px',
                                                    color: '#333',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    transition: 'background 0.2s ease',
                                                    borderRadius: 0
                                                }}
                                            >
                                                <Icon size={16} color={option.color} />
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F5F5F5',
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }}>
            {/* Header */}
            <div style={{
                background: 'white',
                padding: '16px',
                borderBottom: '1px solid #E5E5E5'
            }}>
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#007AFF',
                    margin: '0 0 16px 0'
                }}>
                    ユーザー管理
                </h1>

                {/* Search Bar */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '16px'
                }}>
                    <div style={{
                        flex: 1,
                        position: 'relative'
                    }}>
                        <Search 
                            size={18} 
                            color="#999" 
                            style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="ユーザー名または職種で検索..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px 10px 40px',
                                border: '1px solid #E5E5E5',
                                borderRadius: '8px',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>
                    
                    {/* Filter Button */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            onMouseEnter={() => setHoveredItem('filter-btn')}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                padding: '10px 16px',
                                border: '1px solid #E5E5E5',
                                borderRadius: '8px',
                                background: hoveredItem === 'filter-btn' ? '#F8F8F8' : 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '14px',
                                color: filterStatus !== 'all' ? '#007AFF' : '#333',
                                fontWeight: filterStatus !== 'all' ? '600' : 'normal',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Filter size={18} />
                            {filterStatus !== 'all' && (
                                <span style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#007AFF'
                                }} />
                            )}
                        </button>
                        
                        {/* Filter Menu */}
                        {showFilterMenu && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '4px',
                                background: 'white',
                                border: '1px solid #E5E5E5',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                zIndex: 100,
                                minWidth: '180px'
                            }}>
                                {statusOptions.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setFilterStatus(option.value);
                                                setShowFilterMenu(false);
                                            }}
                                            onMouseEnter={() => setHoveredItem(`filter-${option.value}`)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                border: 'none',
                                                background: hoveredItem === `filter-${option.value}` ? '#F8F8F8' : 'white',
                                                textAlign: 'left',
                                                fontSize: '14px',
                                                color: filterStatus === option.value ? '#007AFF' : '#333',
                                                fontWeight: filterStatus === option.value ? '600' : 'normal',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: 'background 0.2s ease',
                                                borderRadius: 0
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {Icon && <Icon size={16} color={option.color} />}
                                                {option.label}
                                            </div>
                                            <span style={{
                                                fontSize: '12px',
                                                color: '#999',
                                                background: '#F0F0F0',
                                                padding: '2px 8px',
                                                borderRadius: '10px'
                                            }}>
                                                {option.count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '4px'
                }}>
                    {statusOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.value}
                                onClick={() => setFilterStatus(option.value)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    background: filterStatus === option.value ? option.color || '#007AFF' : '#F0F0F0',
                                    color: filterStatus === option.value ? 'white' : '#666',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {Icon && <Icon size={14} />}
                                {option.label}
                                <span style={{
                                    background: filterStatus === option.value ? 'rgba(255,255,255,0.3)' : '#E0E0E0',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    fontSize: '11px'
                                }}>
                                    {option.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* User List */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                background: 'white',
                padding: '16px'
            }}>
                {filteredUsers.length > 0 ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        {filteredUsers.map((user) => {
                            const statusInfo = getStatusInfo(user.status);
                            const StatusIcon = statusInfo.icon;

                            return (
                                <div
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    onMouseEnter={() => setHoveredItem(`user-${user.id}`)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                        padding: '16px',
                                        background: '#F8F8F8',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        transform: hoveredItem === `user-${user.id}` ? 'translateY(-2px)' : 'translateY(0)',
                                        boxShadow: hoveredItem === `user-${user.id}` ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        gap: '12px',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            background: '#E5E5E5',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '20px',
                                            flexShrink: 0
                                        }}>
                                            👤
                                        </div>
                                        
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '4px'
                                            }}>
                                                <span style={{
                                                    fontSize: '15px',
                                                    fontWeight: '600',
                                                    color: '#333'
                                                }}>
                                                    {user.name}
                                                </span>
                                                <span style={{
                                                    fontSize: '11px',
                                                    color: '#999'
                                                }}>
                                                    {formatDate(user.matchedAt)}
                                                </span>
                                            </div>
                                            
                                            <div style={{
                                                fontSize: '13px',
                                                color: '#666',
                                                marginBottom: '8px'
                                            }}>
                                                {user.position || '職種未設定'}
                                            </div>

                                            {isParentAccount && (
                                                <div style={{
                                                    fontSize: '11px',
                                                    color: '#007AFF',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    marginBottom: '8px'
                                                }}>
                                                    <User size={12} />
                                                    担当: {getChildAgentName(user.assignedChildAgent)}
                                                </div>
                                            )}

                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}>
                                                {StatusIcon && <StatusIcon size={14} color={statusInfo.color} />}
                                                <span style={{
                                                    fontSize: '12px',
                                                    color: statusInfo.color,
                                                    fontWeight: '600'
                                                }}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onNavigateToChat(user.id);
                                            }}
                                            onMouseEnter={() => setHoveredItem(`msg-${user.id}`)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                border: 'none',
                                                background: hoveredItem === `msg-${user.id}` ? '#007AFF' : '#E5F1FF',
                                                color: hoveredItem === `msg-${user.id}` ? 'white' : '#007AFF',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.2s ease',
                                                flexShrink: 0
                                            }}
                                        >
                                            <MessageCircle size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: '#999'
                    }}>
                        <Users size={48} color="#CCC" style={{ marginBottom: '12px' }} />
                        <p style={{ margin: 0, fontSize: '14px' }}>
                            {searchQuery ? 'ユーザーが見つかりません' : 'マッチングしたユーザーはまだいません'}
                        </p>
                    </div>
                )}
            </div>

            {/* User Detail Modal */}
            {selectedUser && (
                <UserDetailModal 
                    user={selectedUser} 
                    onClose={() => setSelectedUser(null)} 
                />
            )}
        </div>
    );
};

export default AgentMatching;

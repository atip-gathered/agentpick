import React, { useState } from 'react';
import { MessageCircle, Search, Send, Paperclip, Image, Mic, Check, CheckCheck, ArrowLeft, Filter, User } from 'lucide-react';

const AgentMessages = ({ matchedUsers, messages, onSendMessage, onNavigateToUser, onViewProfile, agentData, childAgents }) => {
    const isParentAccount = agentData?.isParentAccount || false;
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'unread', 'active'
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Get child agent name by ID
    const getChildAgentName = (childAgentId) => {
        if (!childAgentId) return '親アカウント';
        const childAgent = childAgents?.find(child => child.id === childAgentId);
        return childAgent ? childAgent.name : '未割当';
    };

    // Get messages for a specific user
    const getUserMessages = (userId) => {
        return messages[userId] || [];
    };

    // Get last message for a user
    const getLastMessage = (userId) => {
        const userMessages = getUserMessages(userId);
        return userMessages[userMessages.length - 1];
    };

    // Count unread messages for a user
    const getUnreadCount = (userId) => {
        const userMessages = getUserMessages(userId);
        return userMessages.filter(msg => msg.sender === 'user' && !msg.read).length;
    };

    // Filter users based on search and filter status
    const filteredUsers = matchedUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (filterStatus === 'unread') {
            return matchesSearch && getUnreadCount(user.id) > 0;
        } else if (filterStatus === 'active') {
            return matchesSearch && user.status === 'active';
        }
        
        return matchesSearch;
    }).sort((a, b) => {
        const lastMessageA = getLastMessage(a.id);
        const lastMessageB = getLastMessage(b.id);
        
        if (!lastMessageA) return 1;
        if (!lastMessageB) return -1;
        
        return lastMessageB.timestamp - lastMessageA.timestamp;
    });

    const handleSendMessage = () => {
        if (messageText.trim() && selectedUser) {
            onSendMessage(selectedUser.id, messageText, 'text', 'agent');
            setMessageText('');
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
            return '昨日';
        } else if (diffDays < 7) {
            return `${diffDays}日前`;
        } else {
            return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
        }
    };

    const filterOptions = [
        { value: 'all', label: 'すべて' },
        { value: 'unread', label: '未読のみ' },
        { value: 'active', label: 'アクティブ' }
    ];

    // Inbox View (User List)
    if (!selectedUser) {
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
                        メッセージ
                    </h1>

                    {/* Search Bar */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '12px'
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
                                placeholder="ユーザーを検索..."
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
                                    minWidth: '140px'
                                }}>
                                    {filterOptions.map((option) => (
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
                                                borderRadius: 0,
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            {option.label}
                                            {filterStatus === option.value && (
                                                <Check size={16} style={{ float: 'right', marginTop: '2px' }} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        fontSize: '12px',
                        color: '#666'
                    }}>
                        <span>
                            全 {filteredUsers.length} 件
                        </span>
                        {filteredUsers.filter(u => getUnreadCount(u.id) > 0).length > 0 && (
                            <span style={{ color: '#FF9500', fontWeight: '600' }}>
                                未読 {filteredUsers.filter(u => getUnreadCount(u.id) > 0).length} 件
                            </span>
                        )}
                    </div>
                </div>

                {/* User List */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    background: 'white'
                }}>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => {
                            const lastMessage = getLastMessage(user.id);
                            const unreadCount = getUnreadCount(user.id);

                            return (
                                <div
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    onMouseEnter={() => setHoveredItem(`user-${user.id}`)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                        padding: '16px',
                                        borderBottom: '1px solid #F0F0F0',
                                        cursor: 'pointer',
                                        background: hoveredItem === `user-${user.id}` ? '#F8F8F8' : 'white',
                                        transition: 'background 0.2s ease'
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
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                    <span style={{
                                                        fontSize: '15px',
                                                        fontWeight: unreadCount > 0 ? '600' : '500',
                                                        color: '#333'
                                                    }}>
                                                        {user.hasProfileAccess ? user.name : '新規マッチング（メッセージ待ち）'}
                                                    </span>
                                                    {isParentAccount && (
                                                        <span style={{
                                                            fontSize: '11px',
                                                            color: '#007AFF',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '4px'
                                                        }}>
                                                            <User size={12} />
                                                            {getChildAgentName(user.assignedChildAgent)}
                                                        </span>
                                                    )}
                                                </div>
                                                {lastMessage && (
                                                    <span style={{
                                                        fontSize: '11px',
                                                        color: '#999'
                                                    }}>
                                                        {formatTime(lastMessage.timestamp)}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}>
                                                <div style={{
                                                    fontSize: '13px',
                                                    color: unreadCount > 0 ? '#333' : '#999',
                                                    fontWeight: unreadCount > 0 ? '500' : 'normal',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    flex: 1
                                                }}>
                                                    {lastMessage ? (
                                                        <>
                                                            {lastMessage.sender === 'agent' && 'あなた: '}
                                                            {lastMessage.type === 'text' 
                                                                ? lastMessage.text 
                                                                : lastMessage.type === 'audio'
                                                                    ? '🎤 音声メッセージ'
                                                                    : '📎 ファイル'}
                                                        </>
                                                    ) : (
                                                        '新規マッチング'
                                                    )}
                                                </div>
                                                
                                                {unreadCount > 0 && (
                                                    <div style={{
                                                        minWidth: '20px',
                                                        height: '20px',
                                                        borderRadius: '10px',
                                                        background: '#FF9500',
                                                        color: 'white',
                                                        fontSize: '11px',
                                                        fontWeight: 'bold',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: '0 6px'
                                                    }}>
                                                        {unreadCount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            color: '#999'
                        }}>
                            <MessageCircle size={48} color="#CCC" style={{ marginBottom: '12px' }} />
                            <p style={{ margin: 0, fontSize: '14px' }}>
                                {searchQuery ? 'ユーザーが見つかりません' : 'メッセージはまだありません'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Chat View (Selected User)
    const userMessages = getUserMessages(selectedUser.id);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }}>
            {/* Chat Header */}
            <div style={{
                background: 'white',
                padding: '16px',
                borderBottom: '1px solid #E5E5E5',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <button
                    onClick={() => setSelectedUser(null)}
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
                    <ArrowLeft size={20} color="#007AFF" />
                </button>
                
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#E5E5E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                }}>
                    👤
                </div>
                
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: '2px'
                    }}>
                        {selectedUser.hasProfileAccess ? selectedUser.name : '新規マッチング'}
                    </div>
                    {isParentAccount && (
                        <div style={{
                            fontSize: '11px',
                            color: '#007AFF',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            marginBottom: '2px'
                        }}>
                            <User size={12} />
                            担当: {getChildAgentName(selectedUser.assignedChildAgent)}
                        </div>
                    )}
                    <div style={{
                        fontSize: '12px',
                        color: '#666'
                    }}>
                        {selectedUser.hasProfileAccess 
                            ? (selectedUser.status === 'active' ? 'アクティブ' : 'オフライン')
                            : 'メッセージを送信すると情報が公開されます'}
                    </div>
                </div>

                <button
                    onClick={() => selectedUser.hasProfileAccess && onViewProfile && onViewProfile(selectedUser)}
                    onMouseEnter={() => setHoveredItem('profile-btn')}
                    onMouseLeave={() => setHoveredItem(null)}
                    disabled={!selectedUser.hasProfileAccess}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: `1px solid ${selectedUser.hasProfileAccess ? '#007AFF' : '#E5E5E5'}`,
                        background: hoveredItem === 'profile-btn' && selectedUser.hasProfileAccess ? '#007AFF' : 'white',
                        color: selectedUser.hasProfileAccess 
                            ? (hoveredItem === 'profile-btn' ? 'white' : '#007AFF')
                            : '#999',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: selectedUser.hasProfileAccess ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s ease',
                        opacity: selectedUser.hasProfileAccess ? 1 : 0.6
                    }}
                >
                    {selectedUser.hasProfileAccess ? 'プロフィール確認' : 'メッセージ待ち'}
                </button>
            </div>

            {/* Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 16px',
                background: '#F8F8F8'
            }}>
                {userMessages.map((message, index) => {
                    const isAgent = message.sender === 'agent';
                    
                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: isAgent ? 'flex-end' : 'flex-start',
                                marginBottom: '16px'
                            }}
                        >
                            <div style={{
                                maxWidth: '75%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: isAgent ? 'flex-end' : 'flex-start'
                            }}>
                                <div style={{
                                    background: isAgent ? '#007AFF' : 'white',
                                    color: isAgent ? 'white' : '#333',
                                    padding: '12px 16px',
                                    borderRadius: '16px',
                                    fontSize: '14px',
                                    lineHeight: '1.5',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                }}>
                                    {message.type === 'text' ? message.text : 
                                     message.type === 'audio' ? '🎤 音声メッセージ' : 
                                     '📎 ファイル'}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    marginTop: '4px',
                                    fontSize: '11px',
                                    color: '#999'
                                }}>
                                    <span>{formatTime(message.timestamp)}</span>
                                    {isAgent && (
                                        message.read ? 
                                            <CheckCheck size={14} color="#007AFF" /> : 
                                            <Check size={14} color="#999" />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div style={{
                background: 'white',
                padding: '12px 16px',
                borderTop: '1px solid #E5E5E5'
            }}>
                {isParentAccount ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '12px',
                        background: '#F0F8FF',
                        borderRadius: '12px',
                        border: '1px solid #D0E8FF'
                    }}>
                        <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#007AFF',
                            fontWeight: '500'
                        }}>
                            👁️ 閲覧専用モード
                        </p>
                        <p style={{
                            margin: '4px 0 0 0',
                            fontSize: '12px',
                            color: '#666'
                        }}>
                            親アカウントはメッセージの閲覧のみ可能です。メッセージの送信は担当の子アカウントが行います。
                        </p>
                    </div>
                ) : !selectedUser.hasProfileAccess ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '12px',
                        background: '#FFF4E5',
                        borderRadius: '12px',
                        border: '1px solid #FFE5CC'
                    }}>
                        <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#FF9500',
                            fontWeight: '500'
                        }}>
                            ⏳ 求職者からのメッセージをお待ちください
                        </p>
                        <p style={{
                            margin: '4px 0 0 0',
                            fontSize: '12px',
                            color: '#999'
                        }}>
                            求職者が最初のメッセージを送信すると、メッセージの送信とプロフィール情報の閲覧が可能になります
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'flex-end'
                    }}>
                        <button
                            onMouseEnter={() => setHoveredItem('attach-btn')}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: 'none',
                                background: hoveredItem === 'attach-btn' ? '#F0F0F0' : 'transparent',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.2s ease'
                            }}
                        >
                            <Paperclip size={20} color="#666" />
                        </button>

                        <div style={{
                            flex: 1,
                            background: '#F5F5F5',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <input
                                type="text"
                                placeholder="メッセージを入力..."
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    fontSize: '15px',
                                    color: '#333'
                                }}
                            />
                        </div>

                        <button
                            onClick={handleSendMessage}
                            onMouseEnter={() => setHoveredItem('send-btn')}
                            onMouseLeave={() => setHoveredItem(null)}
                            disabled={!messageText.trim()}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: 'none',
                                background: messageText.trim() 
                                    ? (hoveredItem === 'send-btn' ? '#0051CC' : '#007AFF')
                                    : '#E5E5E5',
                                cursor: messageText.trim() ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Send size={18} color={messageText.trim() ? 'white' : '#999'} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentMessages;

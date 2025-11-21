import React, { useState } from 'react';
import { MessageCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const MessageList = ({ pickedAgents, onStartChat, onNavigateToChat, messages = {} }) => {
    const [bulkMode, setBulkMode] = useState(false);
    const [selectedAgents, setSelectedAgents] = useState([]);
    const [hoveredButton, setHoveredButton] = useState(null); // Track hover state
    
    // Helper function to get the latest message for an agent
    const getLatestMessage = (agentId) => {
        const agentMessages = messages[agentId] || [];
        if (agentMessages.length === 0) return null;
        return agentMessages[agentMessages.length - 1];
    };

    const toggleBulkMode = () => {
        setBulkMode(!bulkMode);
        setSelectedAgents([]);
    };

    const toggleAgentSelection = (agentId) => {
        if (selectedAgents.includes(agentId)) {
            setSelectedAgents(selectedAgents.filter(id => id !== agentId));
        } else {
            setSelectedAgents([...selectedAgents, agentId]);
        }
    };

    const handleSendBulkMessage = () => {
        // For now, just navigate to first selected agent
        if (selectedAgents.length > 0) {
            onNavigateToChat(selectedAgents[0]);
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F2F2F7',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Message Header */}
            <div style={{
                padding: '24px',
                background: 'white'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#007AFF',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>
                    <MessageCircle size={28} fill="#007AFF" />
                    メッセージ
                </div>

                {/* Bulk Selection Checkbox */}
                <div
                    onClick={toggleBulkMode}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '16px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#333'
                    }}
                >
                    <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid #007AFF',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: bulkMode ? '#007AFF' : 'white'
                    }}>
                        {bulkMode && <Check size={16} color="white" />}
                    </div>
                    まとめてメッセージを送る
                </div>
            </div>

            {/* Agent List */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 0'
            }}>
                {pickedAgents.length === 0 ? (
                    <div style={{
                        padding: '40px 24px',
                        textAlign: 'center',
                        color: '#8E8E93',
                        fontSize: '14px'
                    }}>
                        まだピックしたエージェントがいません
                    </div>
                ) : (
                    pickedAgents.map((agent) => {
                        const isSelected = selectedAgents.includes(agent.id);

                        return (
                            <div
                                key={agent.id}
                                style={{
                                    background: 'white',
                                    padding: '16px 24px',
                                    marginBottom: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}
                            >
                                {/* Profile Image or Checkbox */}
                                {bulkMode && isSelected ? (
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        background: '#00D9FF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Check size={28} color="white" />
                                    </div>
                                ) : (
                                    <img
                                        src={agent.image}
                                        alt={agent.name}
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            flexShrink: 0
                                        }}
                                    />
                                )}

                                {/* Agent Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#8E8E93',
                                        marginBottom: '2px'
                                    }}>
                                        {agent.company}
                                    </div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }}>
                                        {agent.name}
                                    </div>
                                    {!bulkMode && (() => {
                                        const latestMessage = getLatestMessage(agent.id);
                                        return (
                                            <div style={{
                                                fontSize: '12px',
                                                color: '#8E8E93',
                                                marginTop: '4px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {latestMessage ? (
                                                    <>
                                                        <span style={{ 
                                                            fontWeight: latestMessage.sender === 'agent' ? 'normal' : '600',
                                                            color: latestMessage.sender === 'user' ? '#333' : '#8E8E93'
                                                        }}>
                                                            {latestMessage.sender === 'agent' ? '' : 'あなた: '}
                                                        </span>
                                                        {latestMessage.type === 'text' 
                                                            ? latestMessage.text 
                                                            : latestMessage.type === 'audio' 
                                                                ? '🎤 音声メッセージ' 
                                                                : '📎 ファイル'}
                                                    </>
                                                ) : (
                                                    agent.specialty.slice(0, 2).join('、')
                                                )}
                                            </div>
                                        );
                                    })()}
                                </div>

                                {/* Action Button */}
                                {bulkMode ? (
                                    <button
                                        onClick={() => toggleAgentSelection(agent.id)}
                                        onMouseEnter={() => setHoveredButton(`select-${agent.id}`)}
                                        onMouseLeave={() => setHoveredButton(null)}
                                        style={{
                                            background: isSelected 
                                                ? 'white' 
                                                : hoveredButton === `select-${agent.id}`
                                                    ? '#0056B3'
                                                    : '#007AFF',
                                            color: isSelected ? '#007AFF' : 'white',
                                            border: isSelected ? '2px solid #007AFF' : 'none',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {isSelected ? '選択解除' : '選択する'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onNavigateToChat(agent.id)}
                                        onMouseEnter={() => setHoveredButton(`message-${agent.id}`)}
                                        onMouseLeave={() => setHoveredButton(null)}
                                        style={{
                                            background: hoveredButton === `message-${agent.id}`
                                                ? '#0056B3'
                                                : '#007AFF',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        メッセージする
                                    </button>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Bulk Send Button */}
            {bulkMode && selectedAgents.length > 0 && (
                <div style={{
                    padding: '16px 24px',
                    background: 'white',
                    borderTop: '1px solid #E5E5EA'
                }}>
                    <button
                        onClick={handleSendBulkMessage}
                        onMouseEnter={() => setHoveredButton('bulk-send')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            width: '100%',
                            background: hoveredButton === 'bulk-send'
                                ? '#E68500'
                                : '#FF9500',
                            color: 'white',
                            border: 'none',
                            padding: '16px',
                            borderRadius: '100px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(255,149,0,0.3)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        まとめてメッセージを送る
                    </button>
                </div>
            )}
        </div>
    );
};

export default MessageList;

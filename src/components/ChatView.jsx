import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Paperclip, Image as ImageIcon, Send } from 'lucide-react';

const ChatView = ({ agent, onBack, messages, onSendMessage }) => {
    const [inputText, setInputText] = useState('');
    const [unreadCount] = useState(2); // For demonstration
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (inputText.trim()) {
            onSendMessage(agent.id, inputText, 'text');
            setInputText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Send file message
            const fileName = file.name;
            onSendMessage(agent.id, `📎 ${fileName}`, 'file');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                onSendMessage(agent.id, reader.result, 'image');
            };
            reader.readAsDataURL(file);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F2F2F7',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Chat Header */}
            <div style={{
                background: '#007AFF',
                color: 'white',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <ChevronLeft
                    size={24}
                    onClick={onBack}
                    style={{ cursor: 'pointer' }}
                />

                {/* Unread Badge */}
                {unreadCount > 0 && (
                    <div style={{
                        background: '#FF9500',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}>
                        {unreadCount}
                    </div>
                )}

                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{agent.name}</span>
            </div>

            {/* Messages Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}>
                {/* Date Separator */}
                <div style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#8E8E93',
                    margin: '8px 0'
                }}>
                    今日
                </div>

                {/* System Message */}
                <div style={{
                    textAlign: 'center'
                }}>
                    <div style={{
                        display: 'inline-block',
                        background: '#E5E5EA',
                        color: '#666',
                        padding: '8px 16px',
                        borderRadius: '16px',
                        fontSize: '12px'
                    }}>
                        11:20<br />
                        求職者情報を送信しました。
                    </div>
                </div>

                {/* Messages */}
                {messages.map((message, index) => {
                    const isUser = message.sender === 'user';
                    const messageType = message.type || 'text';

                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: isUser ? 'flex-end' : 'flex-start',
                                gap: '4px'
                            }}
                        >
                            {!isUser && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '8px',
                                    maxWidth: '80%'
                                }}>
                                    <img
                                        src={agent.image}
                                        alt={agent.name}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            flexShrink: 0
                                        }}
                                    />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '4px',
                                        flex: 1
                                    }}>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#333',
                                            fontWeight: 'bold',
                                            marginBottom: '2px'
                                        }}>
                                            {agent.name}
                                        </div>
                                        <div style={{
                                            background: 'white',
                                            color: '#333',
                                            padding: '12px 16px',
                                            borderRadius: '16px',
                                            fontSize: '14px',
                                            lineHeight: '1.5',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                            wordBreak: 'break-word'
                                        }}>
                                            {messageType === 'image' ? (
                                                <img
                                                    src={message.text}
                                                    alt="送信画像"
                                                    style={{
                                                        maxWidth: '200px',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                            ) : (
                                                message.text
                                            )}
                                        </div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: '#8E8E93'
                                        }}>
                                            {formatTime(message.timestamp)}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isUser && (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    gap: '4px',
                                    maxWidth: '80%'
                                }}>
                                    <div style={{
                                        background: '#007AFF',
                                        color: 'white',
                                        padding: '12px 16px',
                                        borderRadius: '16px',
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        wordBreak: 'break-word'
                                    }}>
                                        {messageType === 'image' ? (
                                            <img
                                                src={message.text}
                                                alt="送信画像"
                                                style={{
                                                    maxWidth: '200px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        ) : (
                                            message.text
                                        )}
                                    </div>
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#8E8E93'
                                    }}>
                                        {formatTime(message.timestamp)}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
                background: 'white',
                padding: '12px 16px 24px 16px',
                borderTop: '1px solid #E5E5EA'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#F2F2F7',
                    borderRadius: '24px',
                    padding: '8px 16px'
                }}>
                    {/* File Upload */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                    <Paperclip
                        size={24}
                        color="#007AFF"
                        style={{ cursor: 'pointer', flexShrink: 0 }}
                        onClick={() => fileInputRef.current?.click()}
                    />

                    {/* Image Upload */}
                    <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    <ImageIcon
                        size={24}
                        color="#007AFF"
                        style={{ cursor: 'pointer', flexShrink: 0 }}
                        onClick={() => imageInputRef.current?.click()}
                    />

                    {/* Text Input */}
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Aa"
                        style={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            fontSize: '16px',
                            background: 'transparent',
                            color: '#333'
                        }}
                    />

                    {/* Send Button */}
                    {inputText.trim() && (
                        <div
                            onClick={handleSend}
                            style={{
                                background: '#007AFF',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                flexShrink: 0
                            }}
                        >
                            <Send size={16} color="white" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatView;

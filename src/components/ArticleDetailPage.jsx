import React, { useState } from 'react';
import { ArrowLeft, Volume2, ThumbsUp } from 'lucide-react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { agents } from '../mockData';

const ArticleDetailPage = ({ article, onBack, onNavigateToAgent, isLoggedIn = false, onNavigateToRegister, matchedAgents = [], onPickAgent }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [hoveredTocItem, setHoveredTocItem] = useState(null);
    const [hoveredSocial, setHoveredSocial] = useState(null);
    const [hoveredArticle, setHoveredArticle] = useState(null);
    
    // Featured agent from article data
    const featuredAgentId = article?.featuredAgentId || 1;
    const featuredAgent = agents.find(a => a.id === featuredAgentId) || agents[0];
    const isPicked = matchedAgents.includes(featuredAgentId);
    
    // Table of contents and sections from article
    const tableOfContents = article?.tableOfContents || [];
    const sections = article?.sections || [];
    
    const handlePickAgent = () => {
        if (!isPicked && onPickAgent) {
            onPickAgent(featuredAgentId);
        }
    };
    
    const handleViewProfile = () => {
        if (onNavigateToAgent) {
            onNavigateToAgent(featuredAgentId);
        }
    };

    // Function to scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F5F5F5',
            overflowY: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }}>
            {/* Header with Back Button */}
            <div style={{
                background: 'white',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid #E5E5EA',
                position: 'sticky',
                top: 0,
                zIndex: 10
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
                    <ArrowLeft size={24} color="#007AFF" />
                </button>
                <h1 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    margin: 0,
                    flex: 1
                }}>
                    記事詳細
                </h1>
            </div>

            {/* Article Header */}
            <div style={{
                background: 'white',
                padding: '16px',
                marginBottom: '8px'
            }}>
                {/* Category and Dates */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '12px',
                    color: '#666'
                }}>
                    <span style={{
                        background: '#E3F2FD',
                        color: '#1976D2',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontWeight: '600',
                        fontSize: '11px'
                    }}>
                        {article?.tag || '新着記事'}
                    </span>
                    <span>投稿日：{article?.date || '2024.12.15'}</span>
                    {article?.updatedAt && (
                        <span>更新日：{new Date(article.updatedAt).toISOString().split('T')[0].replace(/-/g, '.')}</span>
                    )}
                </div>

                {/* Title */}
                <h2 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#007AFF',
                    lineHeight: '1.4',
                    margin: 0
                }}>
                    {article?.title || 'IT業界の最新動向と転職市場'}
                </h2>
            </div>

            {/* Hero Image */}
            <div style={{
                background: 'white',
                padding: '0 16px 16px 16px',
                marginBottom: '8px'
            }}>
                <img
                    src={article?.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt="Article"
                    style={{
                        width: '100%',
                        height: '240px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            </div>

            {/* Introduction */}
            <div style={{
                background: 'white',
                padding: '20px 16px',
                marginBottom: '8px'
            }}>
                <p style={{
                    fontSize: '14px',
                    color: '#333',
                    lineHeight: '1.8',
                    margin: 0
                }}>
                    {article?.description || 'IT業界の技術革新や市場変化を踏まえ、求められるスキルや人材像を分析。最新の転職市場動向を俯瞰し、今後のキャリア戦略を考察します。'}
                </p>
            </div>

            {/* Agent Info Card - Only show for Interview articles */}
            {article?.tag === 'インタビュー' && article?.featuredAgentId && (
            <div style={{
                background: '#E3F2FD',
                borderRadius: '16px',
                padding: '20px',
                margin: '0 16px 16px 16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                {/* Header with Icon */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '20px'
                }}>
                    <Volume2 size={24} color="#007AFF" strokeWidth={2.5} />
                    <span style={{
                        fontSize: '15px',
                        fontWeight: 'bold',
                        color: '#007AFF'
                    }}>
                        今回のエージェントはこの人！
                    </span>
                </div>

                {/* Agent Profile */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '24px'
                }}>
                    <img
                        src={featuredAgent?.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"}
                        alt="Agent"
                        style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '3px solid white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    />
                    <div>
                        <div style={{
                            fontSize: '13px',
                            color: '#666',
                            marginBottom: '6px',
                            fontWeight: '500'
                        }}>
                            {featuredAgent?.company || 'パーソルキャリア（doda）'}
                        </div>
                        <div style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#1a1a2e',
                            letterSpacing: '0.5px'
                        }}>
                            {featuredAgent?.name || '山田 明子'}
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                {!isPicked ? (
                    <button
                        onClick={handlePickAgent}
                        onMouseEnter={() => setHoveredButton('pick')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            width: '100%',
                            background: hoveredButton === 'pick' ? '#E68500' : '#FF9500',
                            color: 'white',
                            border: 'none',
                            padding: '16px',
                            borderRadius: '30px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            boxShadow: '0 4px 12px rgba(255, 149, 0, 0.3)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <ThumbsUp size={20} fill="white" strokeWidth={0} />
                        ピックする
                    </button>
                ) : (
                    <button
                        disabled
                        style={{
                            width: '100%',
                            background: '#C7C7CC',
                            color: 'white',
                            border: 'none',
                            padding: '16px',
                            borderRadius: '30px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'default',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <ThumbsUp size={20} fill="white" strokeWidth={0} />
                        ピック済み
                    </button>
                )}

                <div
                    onClick={handleViewProfile}
                    onMouseEnter={() => setHoveredButton('profile')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        color: hoveredButton === 'profile' ? '#0056B3' : '#007AFF',
                        fontSize: '15px',
                        fontWeight: '600',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    プロフィールを見る
                </div>
            </div>
            )}

            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
                <div style={{
                    background: 'white',
                    padding: '24px 20px',
                    marginBottom: '8px',
                    margin: '0 16px 16px 16px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
                }}>
                    <h3 style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#1a1a2e',
                        marginBottom: '20px',
                        letterSpacing: '0.5px'
                    }}>
                        目次
                    </h3>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0
                    }}>
                        {tableOfContents.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => scrollToSection(`section-${index}`)}
                                onMouseEnter={() => setHoveredTocItem(index)}
                                onMouseLeave={() => setHoveredTocItem(null)}
                                style={{
                                    fontSize: '16px',
                                    color: '#1a1a2e',
                                    marginBottom: index === tableOfContents.length - 1 ? 0 : '16px',
                                    paddingLeft: '24px',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    lineHeight: '1.6',
                                    transition: 'all 0.2s ease',
                                    opacity: hoveredTocItem === index ? 0.7 : 1
                                }}
                            >
                                <span style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '4px',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#007AFF'
                                }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Content Sections - Dynamic from article data */}
            {sections.map((section, index) => (
                <div
                    key={index}
                    id={`section-${index}`}
                    style={{
                        background: 'white',
                        padding: '20px 16px',
                        marginBottom: index === sections.length - 1 ? '20px' : '8px',
                        scrollMarginTop: '60px'
                    }}
                >
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#007AFF',
                        marginBottom: '16px'
                    }}>
                        {section.title}
                    </h3>
                    <p style={{
                        fontSize: '14px',
                        color: '#333',
                        lineHeight: '1.8',
                        margin: 0,
                        whiteSpace: 'pre-wrap'
                    }}>
                        {section.content}
                    </p>
                </div>
            ))}

            {/* Agent Info Card (Second appearance at bottom) - Only show for Interview articles */}
            {article?.tag === 'インタビュー' && article?.featuredAgentId && (
            <div style={{
                background: '#E3F2FD',
                borderRadius: '16px',
                padding: '20px',
                margin: '0 16px 16px 16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                {/* Header with Icon */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '20px'
                }}>
                    <Volume2 size={24} color="#007AFF" strokeWidth={2.5} />
                    <span style={{
                        fontSize: '15px',
                        fontWeight: 'bold',
                        color: '#007AFF'
                    }}>
                        今回のエージェントはこの人！
                    </span>
                </div>

                {/* Agent Profile */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '24px'
                }}>
                    <img
                        src={featuredAgent?.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"}
                        alt="Agent"
                        style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '3px solid white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    />
                    <div>
                        <div style={{
                            fontSize: '13px',
                            color: '#666',
                            marginBottom: '6px',
                            fontWeight: '500'
                        }}>
                            {featuredAgent?.company || 'パーソルキャリア（doda）'}
                        </div>
                        <div style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#1a1a2e',
                            letterSpacing: '0.5px'
                        }}>
                            {featuredAgent?.name || '山田 明子'}
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                {!isPicked ? (
                    <button
                        onClick={handlePickAgent}
                        onMouseEnter={() => setHoveredButton('pick-bottom')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            width: '100%',
                            background: hoveredButton === 'pick-bottom' ? '#E68500' : '#FF9500',
                            color: 'white',
                            border: 'none',
                            padding: '16px',
                            borderRadius: '30px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            boxShadow: '0 4px 12px rgba(255, 149, 0, 0.3)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <ThumbsUp size={20} fill="white" strokeWidth={0} />
                        ピックする
                    </button>
                ) : (
                    <button
                        disabled
                        style={{
                            width: '100%',
                            background: '#C7C7CC',
                            color: 'white',
                            border: 'none',
                            padding: '16px',
                            borderRadius: '30px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'default',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <ThumbsUp size={20} fill="white" strokeWidth={0} />
                        ピック済み
                    </button>
                )}

                <div
                    onClick={handleViewProfile}
                    onMouseEnter={() => setHoveredButton('profile-bottom')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        color: hoveredButton === 'profile-bottom' ? '#0056B3' : '#007AFF',
                        fontSize: '15px',
                        fontWeight: '600',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    プロフィールを見る
                </div>
            </div>
            )}

            {/* Social Share Section */}
            <div style={{
                background: 'white',
                padding: '20px',
                marginBottom: '16px',
                margin: '0 16px 16px 16px',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
            }}>
                <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '16px'
                }}>
                    この記事をシェアする
                </h4>
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center'
                }}>
                    {/* Facebook */}
                    <div
                        onMouseEnter={() => setHoveredSocial('facebook')}
                        onMouseLeave={() => setHoveredSocial(null)}
                        style={{
                            cursor: 'pointer',
                            opacity: hoveredSocial === 'facebook' ? 0.7 : 1,
                            transition: 'opacity 0.2s ease'
                        }}
                    >
                        <Facebook size={32} color="#1877F2" fill="#1877F2" />
                    </div>
                    
                    {/* Instagram */}
                    <div
                        onMouseEnter={() => setHoveredSocial('instagram')}
                        onMouseLeave={() => setHoveredSocial(null)}
                        style={{
                            cursor: 'pointer',
                            opacity: hoveredSocial === 'instagram' ? 0.7 : 1,
                            transition: 'opacity 0.2s ease'
                        }}
                    >
                        <Instagram size={32} color="#E4405F" />
                    </div>
                    
                    {/* X (Twitter) */}
                    <div
                        onMouseEnter={() => setHoveredSocial('x')}
                        onMouseLeave={() => setHoveredSocial(null)}
                        style={{
                            cursor: 'pointer',
                            opacity: hoveredSocial === 'x' ? 0.7 : 1,
                            transition: 'opacity 0.2s ease'
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#000000">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </div>
                    
                    {/* LINE */}
                    <div
                        onMouseEnter={() => setHoveredSocial('line')}
                        onMouseLeave={() => setHoveredSocial(null)}
                        style={{
                            cursor: 'pointer',
                            opacity: hoveredSocial === 'line' ? 0.7 : 1,
                            transition: 'opacity 0.2s ease'
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#06C755">
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                        </svg>
                    </div>
                    
                    {/* LinkedIn */}
                    <div
                        onMouseEnter={() => setHoveredSocial('linkedin')}
                        onMouseLeave={() => setHoveredSocial(null)}
                        style={{
                            cursor: 'pointer',
                            opacity: hoveredSocial === 'linkedin' ? 0.7 : 1,
                            transition: 'opacity 0.2s ease'
                        }}
                    >
                        <Linkedin size={32} color="#0A66C2" fill="#0A66C2" />
                    </div>
                </div>
            </div>

            {/* CTA Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #0051D5 100%)',
                padding: '32px 24px',
                margin: '0 16px 16px 16px',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)'
            }}>
                <p style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    lineHeight: '1.6'
                }}>
                    自分にピッタリの<br />エージェントを探したい方はこちら
                </p>
                <div style={{
                    marginBottom: '20px'
                }}>
                    <img
                        src="/logo-white.png"
                        alt="AGENT PICK"
                        style={{
                            height: '32px',
                            objectFit: 'contain'
                        }}
                    />
                </div>
                <button
                    onClick={isLoggedIn ? onNavigateToAgent : onNavigateToRegister}
                    onMouseEnter={() => setHoveredButton('cta')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
                        maxWidth: '280px',
                        background: hoveredButton === 'cta' ? '#E68500' : '#FF9500',
                        color: 'white',
                        border: 'none',
                        padding: '16px 24px',
                        borderRadius: '30px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(255, 149, 0, 0.4)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    {isLoggedIn ? 'エージェントをピックする' : '新規会員登録する'}
                </button>
            </div>

            {/* Recommended Articles */}
            <div style={{
                background: 'white',
                padding: '24px 20px',
                marginBottom: '80px',
                margin: '0 16px 80px 16px',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
            }}>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1a1a2e',
                    marginBottom: '20px'
                }}>
                    今月のおすすめ記事
                </h3>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredArticle(index)}
                            onMouseLeave={() => setHoveredArticle(null)}
                            style={{
                                display: 'flex',
                                gap: '12px',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: '8px',
                                transition: 'background 0.2s ease',
                                background: hoveredArticle === index ? '#F5F5F5' : 'transparent'
                            }}
                        >
                            <img
                                src={`https://images.unsplash.com/photo-${1560179406 + index}-${Math.random().toString(36).substr(2, 9)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`}
                                alt="Article thumbnail"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '8px',
                                    objectFit: 'cover',
                                    flexShrink: 0
                                }}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1557425529-2f1236e602e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginBottom: '6px',
                                    fontSize: '11px'
                                }}>
                                    <span style={{
                                        background: '#E3F2FD',
                                        color: '#1976D2',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontWeight: '600'
                                    }}>
                                        新卒採用
                                    </span>
                                    <span style={{ color: '#666' }}>
                                        経理職
                                    </span>
                                    <span style={{ color: '#666' }}>
                                        新卒採用
                                    </span>
                                </div>
                                <p style={{
                                    fontSize: '13px',
                                    color: '#333',
                                    fontWeight: '500',
                                    lineHeight: '1.5',
                                    margin: 0,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    IT業界の最新動向と転職市場について転職市場について
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticleDetailPage;

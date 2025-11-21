import React, { useState } from 'react';
import { ArrowLeft, ThumbsUp, User, Sparkles, Building2, MapPin, MessageCircle, Tag, FileText } from 'lucide-react';

const AgentDetail = ({ agent, onBack, onLike, isMatched, onNavigateToArticle }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    
    if (!agent) return null;

    const SectionCard = ({ icon: Icon, title, children }) => (
        <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            border: '1px solid #E5E5EA',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
            <h3 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#007AFF',
                marginBottom: '16px'
            }}>
                <Icon size={18} fill={Icon === User ? "#007AFF" : "none"} />
                {title}
            </h3>
            {children}
        </div>
    );

    const TagList = ({ tags }) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map((tag, i) => (
                <span key={i} style={{
                    background: '#CDE1F8',
                    color: '#004085',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500'
                }}>
                    {tag}
                </span>
            ))}
        </div>
    );

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#F2F2F7', // Light grey background for contrast with cards
            zIndex: 100,
            overflowY: 'auto',
            paddingBottom: '100px'
        }} className="no-scrollbar">

            {/* Header Image Area */}
            <div style={{ background: 'white', paddingBottom: '24px', marginBottom: '16px' }}>
                <div style={{ position: 'relative', height: '280px', marginBottom: '16px' }}>
                    <img
                        src={agent.image}
                        alt={agent.name}
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            objectPosition: 'center 20%'
                        }}
                    />
                    {/* Back Button (Invisible touch area mostly, but let's keep it functional) */}
                    {/* Note: Figma doesn't show a clear back button on the image provided, 
              but we need one for navigation. I'll make it subtle or rely on the layout header if it existed.
              Actually, the image shows a standard header. We should probably keep the header visible?
              The current Layout component has a Header. 
              If this Detail view overlays everything, we need our own header or back button.
              I'll add a subtle back button for usability.
           */}
                    <button
                        onClick={onBack}
                        onMouseEnter={() => setHoveredButton('back')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            background: hoveredButton === 'back' ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.9)',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            border: 'none'
                        }}
                    >
                        <ArrowLeft size={20} color="#333" />
                    </button>
                </div>

                <div style={{ padding: '0 20px' }}>
                    <p style={{ color: '#333', fontSize: '14px', marginBottom: '4px', fontWeight: '500' }}>
                        {agent.company}
                    </p>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#007AFF', marginBottom: '16px', lineHeight: '1.2' }}>
                        {agent.name}
                    </h1>

                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginBottom: '12px',
                            color: '#1c274c' // Dark blue-grey from image
                        }}>
                            得意分野
                        </h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {agent.specialty.map((spec, i) => (
                                <span key={i} style={{
                                    background: '#bceeff', // Light cyan-blue from image
                                    color: '#1c274c', // Dark text
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    letterSpacing: '0.5px'
                                }}>
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#333', marginBottom: '24px', fontWeight: '500' }}>
                        {agent.bio}
                    </p>

                    {/* Featured Article Button - Show if agent has featured article */}
                    {agent.featuredArticleId && (
                        <button
                            onClick={() => onNavigateToArticle && onNavigateToArticle(agent.featuredArticleId)}
                            onMouseEnter={() => setHoveredButton('article')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                width: '100%',
                                background: hoveredButton === 'article' ? '#0051CC' : '#007AFF',
                                color: 'white',
                                padding: '14px',
                                borderRadius: '100px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                border: 'none',
                                marginBottom: '12px'
                            }}
                        >
                            <FileText size={20} />
                            特集記事を見る
                        </button>
                    )}

                    {!isMatched && (
                        <button
                            onClick={onLike}
                            onMouseEnter={() => setHoveredButton('pick')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                width: '100%',
                                background: hoveredButton === 'pick' ? '#E68500' : '#FF9500',
                                color: 'white',
                                padding: '14px',
                                borderRadius: '100px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 12px rgba(255, 149, 0, 0.3)',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                border: 'none'
                            }}
                        >
                            <ThumbsUp size={20} fill="white" strokeWidth={0} />
                            ピックする
                        </button>
                    )}
                </div>
            </div>

            {/* Detail Sections */}
            <div style={{ padding: '0 16px' }}>

                <SectionCard icon={User} title="自己紹介">
                    <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#333', whiteSpace: 'pre-line' }}>
                        {agent.selfIntro || "自己紹介文がありません。"}
                    </p>
                </SectionCard>

                <SectionCard icon={Sparkles} title="実績・対応の特長">
                    <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333' }}>
                        {agent.achievements || "特になし"}
                    </p>
                </SectionCard>

                <SectionCard icon={Building2} title="得意な企業タイプ">
                    <TagList tags={agent.companyType || []} />
                </SectionCard>

                <SectionCard icon={MapPin} title="対応可能な地域">
                    <TagList tags={agent.area || []} />
                </SectionCard>

                <SectionCard icon={MessageCircle} title="初回の面談方法">
                    <TagList tags={agent.interviewMethod || []} />
                </SectionCard>

                <SectionCard icon={Tag} title="得意な採用カテゴリ">
                    <TagList tags={agent.hiringCategory || []} />
                </SectionCard>

                {/* Bottom Picked Button (Visual State) - Only show if matched */}
                {isMatched && (
                    <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'center' }}>
                        <button style={{
                            width: '100%',
                            background: '#C7C7CC',
                            color: 'white',
                            padding: '14px',
                            borderRadius: '100px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            <ThumbsUp size={20} fill="white" strokeWidth={0} />
                            ピック済み
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AgentDetail;

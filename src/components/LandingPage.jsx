import React from 'react';
import { ThumbsUp, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import AgentCard from './AgentCard';
import { agents } from '../mockData';

const LandingPage = ({ onStartSwipe, onLogin, onRegister }) => {
    // Use the first agent for the main visual
    const mainAgent = agents[0];
    // Use other agents for side visuals
    const leftAgent = agents[1];
    const rightAgent = agents[2];

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)', // Blue gradient base
            position: 'relative',
            overflowY: 'auto', // Allow scrolling if content is too tall
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            paddingTop: '60px' // Space for logo
        }}>
            {/* Background Geometric Shapes */}
            {/* Top Left Polygon */}
            <div style={{
                position: 'absolute',
                top: '-5%',
                left: '-15%',
                width: '60%',
                height: '40%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                transform: 'skewY(-15deg)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                top: '5%',
                left: '-10%',
                width: '40%',
                height: '30%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                transform: 'skewY(-15deg)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* Bottom Right Polygon */}
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-20%',
                width: '70%',
                height: '50%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                transform: 'skewY(-15deg)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* Logo Area */}
            <div style={{
                position: 'absolute',
                top: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10
            }}>
                <img
                    src="/assets/logo-white.png"
                    alt="AGENT PICK"
                    style={{ height: '40px', objectFit: 'contain' }}
                />
            </div>

            {/* Hero Text */}
            <div style={{ zIndex: 10, textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '900',
                    lineHeight: '1.4',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '16px'
                }}>
                    エージェント×求職者の<br />
                    転職マッチングサイト
                </h1>

                <div style={{ fontSize: '15px', fontWeight: '700', lineHeight: '1.8', opacity: 1 }}>
                    専門性・実績・相性で比較して、<br />
                    <span style={{
                        background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)', // Cyan gradient highlight
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontWeight: '900',
                        color: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        display: 'inline-block',
                        transform: 'skewX(-10deg)',
                        margin: '4px 0'
                    }}>
                        <span style={{ display: 'inline-block', transform: 'skewX(10deg)' }}>
                            あなたにピッタリの
                        </span>
                    </span><br />
                    転職エージェントを見つけよう！
                </div>
            </div>

            {/* Card Visuals */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '440px', // Increased to accommodate 420px card + spacing
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
                zIndex: 5
            }}>
                {/* Left Card (Tilted) */}
                <div style={{
                    position: 'absolute',
                    left: '-60px',
                    transform: 'scale(0.85) rotate(-10deg) translateY(20px)',
                    opacity: 0.8,
                    width: '280px',
                    height: '400px',
                    filter: 'brightness(0.9)'
                }}>
                    <AgentCard agent={leftAgent} variant="landing" />
                </div>

                {/* Right Card (Tilted) */}
                <div style={{
                    position: 'absolute',
                    right: '-60px',
                    transform: 'scale(0.85) rotate(10deg) translateY(20px)',
                    opacity: 0.8,
                    width: '280px',
                    height: '400px',
                    filter: 'brightness(0.9)'
                }}>
                    <AgentCard agent={rightAgent} variant="landing" />
                </div>

                {/* Main Card */}
                <div style={{
                    width: '280px',
                    height: '420px',
                    zIndex: 10,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    borderRadius: '20px'
                }}>
                    <AgentCard agent={mainAgent} variant="landing" />
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{
                zIndex: 20,
                width: '100%',
                padding: '0 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginTop: 'auto',
                marginBottom: '40px'
            }}>
                <button
                    onClick={onStartSwipe}
                    style={{
                        width: '100%',
                        background: '#FF9500',
                        color: 'white',
                        padding: '16px',
                        borderRadius: '100px',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        boxShadow: '0 4px 12px rgba(255, 149, 0, 0.3)',
                        border: 'none'
                    }}
                >
                    <ThumbsUp size={24} fill="white" strokeWidth={0} />
                    とりあえずスワイプ
                </button>

                <button
                    onClick={onRegister}
                    style={{
                        width: '100%',
                        background: 'white',
                        color: '#FF9500',
                        padding: '16px',
                        borderRadius: '100px',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        cursor: 'pointer'
                    }}
                >
                    無料会員登録
                </button>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '32px',
                    marginTop: '16px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'white'
                }}>
                    <span
                        onClick={onLogin}
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            textUnderlineOffset: '4px'
                        }}
                    >
                        ログイン
                    </span>
                    <span style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'underline',
                        textUnderlineOffset: '4px'
                    }}>
                        AGENT PICKの使い方 <Copy size={18} strokeWidth={2.5} />
                    </span>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;

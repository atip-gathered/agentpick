import React from 'react';
import { motion } from 'framer-motion';

const AgentCard = ({ agent, style, onClick, variant = 'swipe' }) => {
    // Styles based on variant
    const isLanding = variant === 'landing';

    const nameBottom = isLanding ? '140px' : '200px'; // Tighter for landing, higher for swipe to avoid overlap
    const bioPaddingBottom = isLanding ? '24px' : '80px'; // Tighter for landing, less padding for swipe

    return (
        <motion.div
            className="shadow-md"
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                background: 'white',
                cursor: 'pointer',
                ...style
            }}
            onClick={onClick}
        >
            {/* Full Height Image Background */}
            <img
                src={agent.image}
                alt={agent.name}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none'
                }}
            />

            {/* Gradient Overlay for Text Readability */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: '30%', // Fade out before the white box
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.6) 100%)',
                pointerEvents: 'none'
            }} />

            {/* Main Text Content (On Image) */}
            <div style={{
                position: 'absolute',
                bottom: nameBottom,
                left: 0,
                right: 0,
                padding: '0 20px',
                color: 'white',
                pointerEvents: 'none',
                zIndex: 2,
                transition: 'bottom 0.3s ease'
            }}>
                <p style={{ fontSize: '14px', marginBottom: '4px', fontWeight: '500' }}>
                    {agent.company}
                </p>
                <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.1' }}>
                    {agent.name}
                </h2>

                {/* Landing Variant: Compact, No Experience, Transparent Tags */}
                {isLanding ? (
                    <div style={{ marginBottom: '8px' }}>
                        <p style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '6px', opacity: 0.9 }}>得意分野</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {agent.specialty.slice(0, 2).map((spec, index) => (
                                <span key={index} style={{
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(4px)',
                                    color: 'white',
                                    padding: '4px 10px',
                                    borderRadius: '4px',
                                    fontSize: '8px',
                                    fontWeight: 'bold',
                                    border: '1px solid rgba(255, 255, 255, 0.3)'
                                }}>
                                    {spec}
                                </span>
                            ))}
                            {agent.specialty.length > 2 && (
                                <span style={{
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(4px)',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '8px',
                                    fontWeight: 'bold'
                                }}>
                                    +{agent.specialty.length - 2}
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Swipe Variant: Detailed, No Experience, Light Blue Tags */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {/* Specialty Row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>得意分野</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {agent.specialty.slice(0, 2).map((spec, index) => (
                                    <span key={index} style={{
                                        background: '#bceeff', // Light cyan-blue
                                        color: '#1c274c', // Dark text
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        fontSize: '10px',
                                        fontWeight: 'bold'
                                    }}>
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* White Bio Box (Bottom) */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '16px',
                right: '16px',
                background: 'white',
                borderRadius: '16px',
                padding: '16px',
                paddingBottom: bioPaddingBottom,
                fontSize: isLanding ? '10px' : '14px', // Larger for swipe
                lineHeight: isLanding ? '1.4' : '1.7', // More readable for swipe
                color: '#333',
                fontWeight: '500',
                zIndex: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'padding-bottom 0.3s ease'
            }}>
                {agent.bio}
            </div>
        </motion.div>
    );
};

export default AgentCard;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const MatchModal = ({ isOpen, onClose, agent }) => {
    if (!agent) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, y: 100 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.5, y: 100 }}
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                            borderRadius: '32px',
                            padding: '40px',
                            textAlign: 'center',
                            border: '1px solid rgba(255,255,255,0.1)',
                            position: 'relative'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-gradient" style={{
                            fontSize: '42px',
                            fontFamily: 'cursive',
                            marginBottom: '20px',
                            transform: 'rotate(-5deg)'
                        }}>
                            It's a Match!
                        </h2>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '3px solid white'
                            }}>
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '3px solid #764ba2'
                            }}>
                                <img src={agent.image} alt={agent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>

                        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px' }}>
                            You and <strong>{agent.name}</strong> have liked each other.
                        </p>

                        <button style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '100px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            marginBottom: '16px'
                        }}>
                            <MessageCircle size={20} />
                            Send Message
                        </button>

                        <button
                            onClick={onClose}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '100px',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}
                        >
                            Keep Swiping
                        </button>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MatchModal;

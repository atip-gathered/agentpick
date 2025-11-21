import React from 'react';
import { RotateCcw, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ActionButtons = ({ onPass, onLike }) => {
    return (
        <div style={{
            display: 'flex',
            gap: '40px', // Wider gap
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            pointerEvents: 'auto' // Ensure clickable
        }}>
            {/* Undo/Back Button (Grey) */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onPass}
                style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: '#A0A0A0', // Grey
                    border: '4px solid white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
            >
                <RotateCcw size={32} strokeWidth={3} />
            </motion.button>

            {/* Like Button (Orange) */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onLike}
                style={{
                    width: '88px', // Slightly larger
                    height: '88px',
                    borderRadius: '50%',
                    background: '#FF9500', // Orange
                    border: '4px solid white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(255, 149, 0, 0.4)'
                }}
            >
                <ThumbsUp size={40} fill="white" strokeWidth={0} />
            </motion.button>
        </div>
    );
};

export default ActionButtons;

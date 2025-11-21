

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import AgentCard from './AgentCard';

const SwipeDeck = ({ agents, onSwipe, onMatch, externalSwipeCommand, onCommandHandled, onCardClick, onEmpty }) => {
    const [cards, setCards] = useState(agents);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const lastDirection = React.useRef('right');

    // Check for empty state
    React.useEffect(() => {
        if (cards.length === 0 && onEmpty) {
            onEmpty();
        }
    }, [cards, onEmpty]);

    // Handle external commands
    React.useEffect(() => {
        if (externalSwipeCommand && cards.length > 0) {
            const topCard = cards[0];
            removeCard(topCard.id, externalSwipeCommand);
            onCommandHandled();
        }
    }, [externalSwipeCommand, cards]);

    // Remove the top card
    const removeCard = (id, direction) => {
        lastDirection.current = direction;
        setCards(cards.filter((card) => card.id !== id));
        onSwipe(direction, cards.find((c) => c.id === id));
        if (direction === 'right') {
            onMatch(cards.find((c) => c.id === id));
        }
    };

    // Card component wrapper to handle individual card logic
    const CardWrapper = ({ agent, index, isTop }) => {
        const x = useMotionValue(0);
        const rotate = useTransform(x, [-200, 200], [-25, 25]);
        const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

        // Visual cues for swipe direction
        const likeOpacity = useTransform(x, [20, 150], [0, 1]);
        const nopeOpacity = useTransform(x, [-150, -20], [1, 0]);

        const handleDragEnd = (event, info) => {
            const threshold = 100;
            if (Math.abs(info.offset.x) > threshold) {
                const direction = info.offset.x > 0 ? 'right' : 'left';
                removeCard(agent.id, direction);
            }
        };

        return (
            <motion.div
                style={{
                    width: 340,
                    height: 540,
                    position: 'absolute',
                    top: 0,
                    x: isTop ? x : 0,
                    rotate: isTop ? rotate : 0,
                    opacity: isTop ? opacity : 1 - index * 0.05,
                    scale: 1 - index * 0.05,
                    zIndex: cards.length - index,
                    y: index * 15, // Stack effect
                    cursor: isTop ? 'grab' : 'default',
                }}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
                whileDrag={{ cursor: 'grabbing' }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1 - index * 0.05, opacity: 1 - index * 0.05, y: index * 15 }}

                exit={{
                    x: x.get() !== 0
                        ? (x.get() < 0 ? -300 : 300)
                        : (lastDirection.current === 'left' ? -300 : 300),
                    opacity: 0,
                    transition: { duration: 0.2 }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <AgentCard agent={agent} onClick={() => isTop && onCardClick && onCardClick(agent)} />

                {/* Like/Nope Overlays */}
                {isTop && (
                    <>
                        <motion.div style={{
                            position: 'absolute',
                            top: 40,
                            right: 40,
                            border: '4px solid #4ade80',
                            borderRadius: '8px',
                            padding: '5px 10px',
                            color: '#4ade80',
                            fontSize: '32px',
                            fontWeight: 'bold',
                            transform: 'rotate(15deg)',
                            opacity: likeOpacity,
                            pointerEvents: 'none'
                        }}>
                            LIKE
                        </motion.div>
                        <motion.div style={{
                            position: 'absolute',
                            top: 40,
                            left: 40,
                            border: '4px solid #ef4444',
                            borderRadius: '8px',
                            padding: '5px 10px',
                            color: '#ef4444',
                            fontSize: '32px',
                            fontWeight: 'bold',
                            transform: 'rotate(-15deg)',
                            opacity: nopeOpacity,
                            pointerEvents: 'none'
                        }}>
                            NOPE
                        </motion.div>
                    </>
                )}
            </motion.div>
        );
    };

    return (
        <div style={{
            width: '100%',
            height: '600px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            perspective: 1000
        }}>
            <AnimatePresence>
                {cards.map((agent, index) => (
                    <CardWrapper
                        key={agent.id}
                        agent={agent}
                        index={index}
                        isTop={index === 0}
                    />
                ))}
            </AnimatePresence>
            {cards.length === 0 && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'white'
                }}>
                    <h2>No more agents</h2>
                    <p>Check back later!</p>
                </div>
            )}
        </div>
    );
};

export default SwipeDeck;

import React, { useState } from 'react';
import { Menu } from 'lucide-react';

const Header = ({ onLogoClick, onRegisterClick, onMenuClick }) => {
    const [hoveredElement, setHoveredElement] = useState(null);
    return (
        <header style={{
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            background: 'white',
            zIndex: 50,
            position: 'relative'
        }}>
            <div
                onClick={onLogoClick}
                onMouseEnter={() => setHoveredElement('logo')}
                onMouseLeave={() => setHoveredElement(null)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    opacity: hoveredElement === 'logo' ? 0.8 : 1,
                    transition: 'opacity 0.2s ease'
                }}
            >
                {/* Logo Image */}
                <img
                    src="/logo.png"
                    alt="AGENT PICK"
                    style={{ height: '28px', objectFit: 'contain' }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: '#333', fontWeight: '500' }}>ゲストさん</span>
                <button
                    onClick={onRegisterClick}
                    onMouseEnter={() => setHoveredElement('register')}
                    onMouseLeave={() => setHoveredElement(null)}
                    style={{
                        background: hoveredElement === 'register' ? '#0062CC' : '#007AFF',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                    }}
                >
                    新規登録
                </button>
                <div
                    onClick={onMenuClick}
                    onMouseEnter={() => setHoveredElement('menu')}
                    onMouseLeave={() => setHoveredElement(null)}
                    style={{ 
                        cursor: 'pointer',
                        opacity: hoveredElement === 'menu' ? 0.7 : 1,
                        transition: 'opacity 0.2s ease'
                    }}
                >
                    <Menu size={28} color="#333" strokeWidth={2} />
                </div>
            </div>
        </header >
    );
};

export default Header;

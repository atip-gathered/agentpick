import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ onLogoClick, onRegisterClick, onMenuClick }) => {
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
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                }}
            >
                {/* Logo Image */}
                <img
                    src="/assets/logo-colored.png"
                    alt="AGENT PICK"
                    style={{ height: '28px', objectFit: 'contain' }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: '#333', fontWeight: '500' }}>ゲストさん</span>
                <button
                    onClick={onRegisterClick}
                    style={{
                        background: '#007AFF',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        cursor: 'pointer'
                    }}
                >
                    新規登録
                </button>
                <div onClick={onMenuClick} style={{ cursor: 'pointer' }}>
                    <Menu size={28} color="#333" strokeWidth={2} />
                </div>
            </div>
        </header >
    );
};

export default Header;

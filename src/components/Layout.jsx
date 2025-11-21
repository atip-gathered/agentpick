import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout = ({ children, activeTab, onLogoClick, onRegisterClick, onMenuClick, onNavigate, isLoggedIn }) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#F2F2F7', // Light gray background
            position: 'relative'
        }}>
            <Header 
                onLogoClick={onLogoClick} 
                onRegisterClick={onRegisterClick} 
                onMenuClick={onMenuClick}
                isLoggedIn={isLoggedIn}
            />
            <main style={{
                flex: 1,
                overflow: 'hidden',
                position: 'relative'
            }}>
                {children}
            </main>
            <BottomNav 
                activeTab={activeTab} 
                onNavigate={onNavigate}
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
};

export default Layout;

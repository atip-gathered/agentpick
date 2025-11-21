import React, { useState } from 'react';
import { Plus, Edit2, Trash2, UserPlus, X, Save, Mail, Phone, MapPin, Briefcase, Eye, EyeOff } from 'lucide-react';

const ChildAccountManagement = ({ childAgents, onCreateChild, onUpdateChild, onDeleteChild, onAssignUser }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedChild, setSelectedChild] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        specialty: ''
    });

    const handleCreate = () => {
        if (formData.name && formData.email) {
            onCreateChild(formData);
            setFormData({ name: '', email: '', phone: '', location: '', specialty: '' });
            setShowCreateModal(false);
        }
    };

    const handleEdit = (child) => {
        setSelectedChild(child);
        setFormData({
            name: child.name,
            email: child.email,
            phone: child.phone || '',
            location: child.location || '',
            specialty: child.specialty || ''
        });
        setShowEditModal(true);
    };

    const handleUpdate = () => {
        if (selectedChild && formData.name && formData.email) {
            onUpdateChild(selectedChild.id, formData);
            setFormData({ name: '', email: '', phone: '', location: '', specialty: '' });
            setSelectedChild(null);
            setShowEditModal(false);
        }
    };

    const handleDelete = (childId) => {
        if (window.confirm('本当にこの子アカウントを削除しますか？')) {
            onDeleteChild(childId);
        }
    };

    return (
        <div style={{
            background: 'white',
            margin: '8px 16px 0',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
            }}>
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <UserPlus size={20} color="#007AFF" />
                    子アカウント管理
                </h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    onMouseEnter={() => setHoveredItem('create-btn')}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: hoveredItem === 'create-btn' ? '#0051CC' : '#007AFF',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <Plus size={16} />
                    新規作成
                </button>
            </div>

            {/* Child Accounts List */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {childAgents && childAgents.length > 0 ? (
                    childAgents.map((child) => (
                        <div
                            key={child.id}
                            onMouseEnter={() => setHoveredItem(`child-${child.id}`)}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                padding: '16px',
                                background: '#F8F8F8',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                                border: hoveredItem === `child-${child.id}` ? '1px solid #007AFF' : '1px solid transparent'
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '4px'
                                }}>
                                    {child.name}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    marginBottom: '4px'
                                }}>
                                    <Mail size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                                    {child.email}
                                </div>
                                {child.assignedUsers && child.assignedUsers.length > 0 && (
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#007AFF',
                                        marginTop: '4px'
                                    }}>
                                        担当ユーザー: {child.assignedUsers.length}名
                                    </div>
                                )}
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginTop: '8px',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    background: child.isPublic ? '#d1fae5' : '#fee2e2',
                                    color: child.isPublic ? '#10b981' : '#ef4444'
                                }}>
                                    {child.isPublic ? <Eye size={12} /> : <EyeOff size={12} />}
                                    {child.isPublic ? '公開中' : '非公開'}
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: '8px'
                            }}>
                                <button
                                    onClick={() => {
                                        onUpdateChild(child.id, { ...child, isPublic: !child.isPublic });
                                    }}
                                    onMouseEnter={() => setHoveredItem(`toggle-${child.id}`)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    title={child.isPublic ? '非公開にする' : '公開する'}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: hoveredItem === `toggle-${child.id}` 
                                            ? (child.isPublic ? '#fee2e2' : '#d1fae5')
                                            : 'white',
                                        color: child.isPublic ? '#ef4444' : '#10b981',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {child.isPublic ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                                <button
                                    onClick={() => handleEdit(child)}
                                    onMouseEnter={() => setHoveredItem(`edit-${child.id}`)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: hoveredItem === `edit-${child.id}` ? '#E5F1FF' : 'white',
                                        color: '#007AFF',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(child.id)}
                                    onMouseEnter={() => setHoveredItem(`delete-${child.id}`)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: hoveredItem === `delete-${child.id}` ? '#FFE5E5' : 'white',
                                        color: '#FF3B30',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: '#999'
                    }}>
                        <UserPlus size={48} color="#CCC" style={{ marginBottom: '12px' }} />
                        <p style={{ margin: 0, fontSize: '14px' }}>
                            子アカウントが登録されていません
                        </p>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {(showCreateModal || showEditModal) && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000
                    }}
                    onClick={() => {
                        setShowCreateModal(false);
                        setShowEditModal(false);
                        setSelectedChild(null);
                        setFormData({ name: '', email: '', phone: '', location: '', specialty: '' });
                    }}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '24px',
                            width: '90%',
                            maxWidth: '400px',
                            maxHeight: '80vh',
                            overflowY: 'auto'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#333',
                                margin: 0
                            }}>
                                {showCreateModal ? '子アカウント新規作成' : '子アカウント編集'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setShowEditModal(false);
                                    setSelectedChild(null);
                                    setFormData({ name: '', email: '', phone: '', location: '', specialty: '' });
                                }}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: '#F0F0F0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{
                                    fontSize: '13px',
                                    color: '#666',
                                    marginBottom: '6px',
                                    display: 'block',
                                    fontWeight: '500'
                                }}>
                                    名前 <span style={{ color: '#FF3B30' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="例: 田中 太郎"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #E5E5E5',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{
                                    fontSize: '13px',
                                    color: '#666',
                                    marginBottom: '6px',
                                    display: 'block',
                                    fontWeight: '500'
                                }}>
                                    メールアドレス <span style={{ color: '#FF3B30' }}>*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="例: tanaka@atip.co.jp"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #E5E5E5',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{
                                    fontSize: '13px',
                                    color: '#666',
                                    marginBottom: '6px',
                                    display: 'block',
                                    fontWeight: '500'
                                }}>
                                    電話番号
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                    placeholder="例: 090-1234-5678"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #E5E5E5',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{
                                    fontSize: '13px',
                                    color: '#666',
                                    marginBottom: '6px',
                                    display: 'block',
                                    fontWeight: '500'
                                }}>
                                    勤務地
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    placeholder="例: 東京都"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #E5E5E5',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{
                                    fontSize: '13px',
                                    color: '#666',
                                    marginBottom: '6px',
                                    display: 'block',
                                    fontWeight: '500'
                                }}>
                                    専門分野
                                </label>
                                <input
                                    type="text"
                                    value={formData.specialty}
                                    onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                                    placeholder="例: IT・Web"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #E5E5E5',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{
                            marginTop: '24px',
                            display: 'flex',
                            gap: '12px'
                        }}>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setShowEditModal(false);
                                    setSelectedChild(null);
                                    setFormData({ name: '', email: '', phone: '', location: '', specialty: '' });
                                }}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E5E5',
                                    background: 'white',
                                    color: '#666',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={showCreateModal ? handleCreate : handleUpdate}
                                disabled={!formData.name || !formData.email}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: (formData.name && formData.email) ? '#007AFF' : '#E5E5E5',
                                    color: (formData.name && formData.email) ? 'white' : '#999',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: (formData.name && formData.email) ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                }}
                            >
                                <Save size={16} />
                                {showCreateModal ? '作成' : '更新'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChildAccountManagement;

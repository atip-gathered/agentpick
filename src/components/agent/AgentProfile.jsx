import React, { useState, useRef } from 'react';
import { Camera, Edit2, Save, X, Plus, Trash2, Briefcase, Award, FileText, MapPin, Mail, Phone, Globe, Linkedin } from 'lucide-react';

const AgentProfile = ({ agentData, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...agentData });
    const [hoveredItem, setHoveredItem] = useState(null);
    const photoInputRef = useRef(null);
    const certInputRef = useRef(null);

    const handleSave = () => {
        onSave(editData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ ...agentData });
        setIsEditing(false);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, upload to server and get URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setEditData(prev => ({ ...prev, image: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSpecialty = () => {
        setEditData(prev => ({
            ...prev,
            specialty: [...prev.specialty, '']
        }));
    };

    const handleRemoveSpecialty = (index) => {
        setEditData(prev => ({
            ...prev,
            specialty: prev.specialty.filter((_, i) => i !== index)
        }));
    };

    const handleSpecialtyChange = (index, value) => {
        setEditData(prev => ({
            ...prev,
            specialty: prev.specialty.map((item, i) => i === index ? value : item)
        }));
    };

    const handleAddAchievement = () => {
        setEditData(prev => ({
            ...prev,
            achievements: [...(prev.achievements || []), { title: '', description: '' }]
        }));
    };

    const handleRemoveAchievement = (index) => {
        setEditData(prev => ({
            ...prev,
            achievements: prev.achievements.filter((_, i) => i !== index)
        }));
    };

    const handleAchievementChange = (index, field, value) => {
        setEditData(prev => ({
            ...prev,
            achievements: prev.achievements.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleAddCertification = () => {
        if (certInputRef.current) {
            certInputRef.current.click();
        }
    };

    const handleCertificationUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setEditData(prev => ({
                ...prev,
                certifications: [...(prev.certifications || []), {
                    name: file.name,
                    uploadedAt: new Date().toISOString()
                }]
            }));
        }
    };

    const handleRemoveCertification = (index) => {
        setEditData(prev => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index)
        }));
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F5F5F5',
            overflowY: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            paddingBottom: '20px'
        }}>
            {/* Header */}
            <div style={{
                background: 'white',
                padding: '24px 16px',
                borderBottom: '1px solid #E5E5E5'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#007AFF',
                        margin: 0
                    }}>
                        プロフィール管理
                    </h1>
                    
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            onMouseEnter={() => setHoveredItem('edit-btn')}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                border: 'none',
                                background: hoveredItem === 'edit-btn' ? '#0051CC' : '#007AFF',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Edit2 size={16} />
                            編集
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={handleCancel}
                                onMouseEnter={() => setHoveredItem('cancel-btn')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E5E5',
                                    background: hoveredItem === 'cancel-btn' ? '#F8F8F8' : 'white',
                                    color: '#666',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <X size={16} />
                                キャンセル
                            </button>
                            <button
                                onClick={handleSave}
                                onMouseEnter={() => setHoveredItem('save-btn')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: hoveredItem === 'save-btn' ? '#2BA84A' : '#34C759',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Save size={16} />
                                保存
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Photo */}
            <div style={{
                background: 'white',
                margin: '16px',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                textAlign: 'center'
            }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                        src={editData.image}
                        alt={editData.name}
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            objectPosition: 'center 20%',
                            border: '4px solid #F0F0F0'
                        }}
                    />
                    {isEditing && (
                        <>
                            <button
                                onClick={() => photoInputRef.current?.click()}
                                onMouseEnter={() => setHoveredItem('photo-btn')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: hoveredItem === 'photo-btn' ? '#0051CC' : '#007AFF',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Camera size={18} />
                            </button>
                            <input
                                ref={photoInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                style={{ display: 'none' }}
                            />
                        </>
                    )}
                </div>
                
                <div style={{ marginTop: '16px' }}>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#333',
                                textAlign: 'center',
                                border: '1px solid #007AFF',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                outline: 'none',
                                width: '100%',
                                maxWidth: '300px'
                            }}
                        />
                    ) : (
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#333',
                            margin: '0 0 8px 0'
                        }}>
                            {editData.name}
                        </h2>
                    )}
                    
                    {isEditing ? (
                        <input
                            type="text"
                            value={editData.title || ''}
                            onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="役職を入力"
                            style={{
                                fontSize: '14px',
                                color: '#666',
                                textAlign: 'center',
                                border: '1px solid #E5E5E5',
                                borderRadius: '6px',
                                padding: '6px 12px',
                                outline: 'none',
                                width: '100%',
                                maxWidth: '300px',
                                marginTop: '8px'
                            }}
                        />
                    ) : (
                        <p style={{
                            fontSize: '14px',
                            color: '#666',
                            margin: 0
                        }}>
                            {editData.title || '役職未設定'}
                        </p>
                    )}
                </div>
            </div>

            {/* Basic Information */}
            <div style={{
                background: 'white',
                margin: '0 16px 16px',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <h3 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    margin: '0 0 16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <Briefcase size={18} color="#007AFF" />
                    基本情報
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{
                            fontSize: '13px',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '8px'
                        }}>
                            <Mail size={14} />
                            メールアドレス
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={editData.email || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        ) : (
                            <div style={{ fontSize: '14px', color: '#333' }}>
                                {editData.email || '未設定'}
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{
                            fontSize: '13px',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '8px'
                        }}>
                            <Phone size={14} />
                            電話番号
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={editData.phone || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        ) : (
                            <div style={{ fontSize: '14px', color: '#333' }}>
                                {editData.phone || '未設定'}
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{
                            fontSize: '13px',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '8px'
                        }}>
                            <MapPin size={14} />
                            勤務地
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editData.location}
                                onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        ) : (
                            <div style={{ fontSize: '14px', color: '#333' }}>
                                {editData.location}
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{
                            fontSize: '13px',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '8px'
                        }}>
                            <Globe size={14} />
                            会社名
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editData.company}
                                onChange={(e) => setEditData(prev => ({ ...prev, company: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        ) : (
                            <div style={{ fontSize: '14px', color: '#333' }}>
                                {editData.company}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Specialty */}
            <div style={{
                background: 'white',
                margin: '0 16px 16px',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h3 style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#333',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Award size={18} color="#007AFF" />
                        専門分野
                    </h3>
                    {isEditing && (
                        <button
                            onClick={handleAddSpecialty}
                            onMouseEnter={() => setHoveredItem('add-specialty')}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: hoveredItem === 'add-specialty' ? '#E5F1FF' : 'transparent',
                                color: '#007AFF',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Plus size={14} />
                            追加
                        </button>
                    )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {editData.specialty.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                                        style={{
                                            padding: '6px 12px',
                                            border: '1px solid #007AFF',
                                            borderRadius: '16px',
                                            fontSize: '13px',
                                            outline: 'none',
                                            minWidth: '100px'
                                        }}
                                    />
                                    <button
                                        onClick={() => handleRemoveSpecialty(index)}
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            border: 'none',
                                            background: '#FFE5E5',
                                            color: '#FF3B30',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <X size={14} />
                                    </button>
                                </>
                            ) : (
                                <span style={{
                                    padding: '6px 16px',
                                    background: '#E5F1FF',
                                    color: '#007AFF',
                                    borderRadius: '16px',
                                    fontSize: '13px',
                                    fontWeight: '500'
                                }}>
                                    {item}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bio */}
            <div style={{
                background: 'white',
                margin: '0 16px 16px',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <h3 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    margin: '0 0 16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <FileText size={18} color="#007AFF" />
                    自己紹介
                </h3>
                {isEditing ? (
                    <textarea
                        value={editData.bio || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="自己紹介を入力してください"
                        style={{
                            width: '100%',
                            minHeight: '120px',
                            padding: '12px',
                            border: '1px solid #E5E5E5',
                            borderRadius: '8px',
                            fontSize: '14px',
                            lineHeight: '1.6',
                            outline: 'none',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                    />
                ) : (
                    <p style={{
                        fontSize: '14px',
                        color: '#333',
                        lineHeight: '1.6',
                        margin: 0,
                        whiteSpace: 'pre-wrap'
                    }}>
                        {editData.bio || '自己紹介が設定されていません'}
                    </p>
                )}
            </div>

            {/* Achievements */}
            <div style={{
                background: 'white',
                margin: '0 16px 16px',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h3 style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#333',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Award size={18} color="#007AFF" />
                        実績・経験
                    </h3>
                    {isEditing && (
                        <button
                            onClick={handleAddAchievement}
                            onMouseEnter={() => setHoveredItem('add-achievement')}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: hoveredItem === 'add-achievement' ? '#E5F1FF' : 'transparent',
                                color: '#007AFF',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Plus size={14} />
                            追加
                        </button>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {(editData.achievements || []).map((achievement, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '16px',
                                background: '#F8F8F8',
                                borderRadius: '8px',
                                position: 'relative'
                            }}
                        >
                            {isEditing && (
                                <button
                                    onClick={() => handleRemoveAchievement(index)}
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        background: '#FFE5E5',
                                        color: '#FF3B30',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                            
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={achievement.title}
                                        onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                                        placeholder="タイトル"
                                        style={{
                                            width: 'calc(100% - 40px)',
                                            padding: '8px 12px',
                                            border: '1px solid #E5E5E5',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            outline: 'none',
                                            marginBottom: '8px'
                                        }}
                                    />
                                    <textarea
                                        value={achievement.description}
                                        onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                                        placeholder="詳細説明"
                                        style={{
                                            width: '100%',
                                            minHeight: '60px',
                                            padding: '8px 12px',
                                            border: '1px solid #E5E5E5',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <div style={{
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        color: '#333',
                                        marginBottom: '8px'
                                    }}>
                                        {achievement.title}
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        color: '#666',
                                        lineHeight: '1.6'
                                    }}>
                                        {achievement.description}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    
                    {(!editData.achievements || editData.achievements.length === 0) && !isEditing && (
                        <p style={{
                            fontSize: '14px',
                            color: '#999',
                            textAlign: 'center',
                            margin: '20px 0'
                        }}>
                            実績・経験が登録されていません
                        </p>
                    )}
                </div>
            </div>

            {/* Certifications */}
            <div style={{
                background: 'white',
                margin: '0 16px 16px',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h3 style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#333',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <FileText size={18} color="#007AFF" />
                        資格・認定証
                    </h3>
                    {isEditing && (
                        <button
                            onClick={handleAddCertification}
                            onMouseEnter={() => setHoveredItem('add-cert')}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: hoveredItem === 'add-cert' ? '#E5F1FF' : 'transparent',
                                color: '#007AFF',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Plus size={14} />
                            アップロード
                        </button>
                    )}
                    <input
                        ref={certInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleCertificationUpload}
                        style={{ display: 'none' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(editData.certifications || []).map((cert, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px',
                                background: '#F8F8F8',
                                borderRadius: '8px'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                flex: 1
                            }}>
                                <FileText size={20} color="#007AFF" />
                                <div>
                                    <div style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#333'
                                    }}>
                                        {cert.name}
                                    </div>
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#999',
                                        marginTop: '2px'
                                    }}>
                                        {new Date(cert.uploadedAt).toLocaleDateString('ja-JP')}
                                    </div>
                                </div>
                            </div>
                            
                            {isEditing && (
                                <button
                                    onClick={() => handleRemoveCertification(index)}
                                    onMouseEnter={() => setHoveredItem(`del-cert-${index}`)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        background: hoveredItem === `del-cert-${index}` ? '#FF3B30' : '#FFE5E5',
                                        color: hoveredItem === `del-cert-${index}` ? 'white' : '#FF3B30',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    ))}
                    
                    {(!editData.certifications || editData.certifications.length === 0) && (
                        <p style={{
                            fontSize: '14px',
                            color: '#999',
                            textAlign: 'center',
                            margin: '20px 0'
                        }}>
                            資格・認定証がアップロードされていません
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AgentProfile;

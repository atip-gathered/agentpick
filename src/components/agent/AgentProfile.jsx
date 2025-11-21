import React, { useState, useRef } from 'react';
import { Camera, Edit2, Save, X, Plus, Trash2, Briefcase, Award, FileText, MapPin, Mail, Phone, Globe, Linkedin, Check } from 'lucide-react';

// 企業タイプの選択肢
const COMPANY_TYPES = [
    'スタートアップ（Seed/アーリー）',
    'ベンチャー',
    'メガベンチャー',
    '中小企業',
    '大手・上場企業',
    '外資系企業'
];

// 47都道府県
const PREFECTURES = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
    '岐阜県', '静岡県', '愛知県', '三重県',
    '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

// 採用カテゴリ
const RECRUITMENT_CATEGORIES = [
    '新卒採用',
    '中途採用',
    '第二新卒・既卒'
];

// 職種リスト
const JOB_CATEGORIES = [
    '営業系',
    '建築・不動産系',
    '販売接客・サービス系',
    'IT・エンジニア系',
    '企画・マーケティング系',
    '事務・管理系',
    '医療・介護・福祉系',
    '技術・製造系',
    '企画・クリエイティブ系',
    '運輸・物流系',
    'コンサルティング系',
    '保険系',
    '金融系',
    'メーカー系',
    '建設系',
    '土木系',
    'その他'
];

const AgentProfile = ({ agentData, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ 
        ...agentData,
        specialtyCompanyTypes: agentData.specialtyCompanyTypes || [],
        specialtyRegions: agentData.specialtyRegions || [],
        recruitmentCategory: agentData.recruitmentCategory || '',
        specialtyJobCategories: agentData.specialtyJobCategories || []
    });
    const [hoveredItem, setHoveredItem] = useState(null);
    const photoInputRef = useRef(null);

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

    // 複数選択のトグル処理
    const toggleArrayItem = (field, item) => {
        setEditData(prev => {
            const currentArray = prev[field] || [];
            const isSelected = currentArray.includes(item);
            return {
                ...prev,
                [field]: isSelected 
                    ? currentArray.filter(i => i !== item)
                    : [...currentArray, item]
            };
        });
    };

    // 職種の追加
    const addJobCategory = (category) => {
        setEditData(prev => {
            const currentCategories = prev.specialtyJobCategories || [];
            if (currentCategories.includes(category)) {
                return prev;
            }
            return {
                ...prev,
                specialtyJobCategories: [...currentCategories, category]
            };
        });
    };

    // 職種の削除
    const removeJobCategory = (category) => {
        setEditData(prev => ({
            ...prev,
            specialtyJobCategories: (prev.specialtyJobCategories || []).filter(c => c !== category)
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

            {/* Summary */}
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
                    概要文
                </h3>
                {isEditing ? (
                    <textarea
                        value={editData.summary || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="概要文を入力してください"
                        style={{
                            width: '100%',
                            minHeight: '100px',
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
                        {editData.summary || '概要文が設定されていません'}
                    </p>
                )}
            </div>

            {/* Personal Details */}
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
                    詳細情報
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{
                                fontSize: '13px',
                                color: '#666',
                                marginBottom: '8px',
                                display: 'block'
                            }}>
                                年齢
                            </label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.age || ''}
                                    onChange={(e) => setEditData(prev => ({ ...prev, age: e.target.value }))}
                                    placeholder="年齢"
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
                                    {editData.age ? `${editData.age}歳` : '未設定'}
                                </div>
                            )}
                        </div>

                        <div>
                            <label style={{
                                fontSize: '13px',
                                color: '#666',
                                marginBottom: '8px',
                                display: 'block'
                            }}>
                                性別
                            </label>
                            {isEditing ? (
                                <select
                                    value={editData.gender || ''}
                                    onChange={(e) => setEditData(prev => ({ ...prev, gender: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #E5E5E5',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        background: 'white'
                                    }}
                                >
                                    <option value="">選択してください</option>
                                    <option value="男性">男性</option>
                                    <option value="女性">女性</option>
                                    <option value="その他">その他</option>
                                </select>
                            ) : (
                                <div style={{ fontSize: '14px', color: '#333' }}>
                                    {editData.gender || '未設定'}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label style={{
                            fontSize: '13px',
                            color: '#666',
                            marginBottom: '8px',
                            display: 'block'
                        }}>
                            得意な企業タイプ（複数選択可）
                        </label>
                        {isEditing ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}>
                                {COMPANY_TYPES.map(type => {
                                    const isSelected = (editData.specialtyCompanyTypes || []).includes(type);
                                    return (
                                        <div
                                            key={type}
                                            onClick={() => toggleArrayItem('specialtyCompanyTypes', type)}
                                            style={{
                                                padding: '10px 12px',
                                                border: `2px solid ${isSelected ? '#007AFF' : '#E5E5E5'}`,
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                background: isSelected ? '#F0F8FF' : 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <span>{type}</span>
                                            {isSelected && <Check size={18} color="#007AFF" />}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ fontSize: '14px', color: '#333' }}>
                                {(editData.specialtyCompanyTypes || []).length > 0 
                                    ? (editData.specialtyCompanyTypes || []).join('、') 
                                    : '未設定'}
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{
                            fontSize: '13px',
                            color: '#666',
                            marginBottom: '8px',
                            display: 'block'
                        }}>
                            得意な地域（複数選択可）
                        </label>
                        {isEditing ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                maxHeight: '300px',
                                overflowY: 'auto',
                                padding: '8px',
                                border: '1px solid #E5E5E5',
                                borderRadius: '8px',
                                background: '#FAFAFA'
                            }}>
                                {PREFECTURES.map(prefecture => {
                                    const isSelected = (editData.specialtyRegions || []).includes(prefecture);
                                    return (
                                        <div
                                            key={prefecture}
                                            onClick={() => toggleArrayItem('specialtyRegions', prefecture)}
                                            style={{
                                                padding: '8px 10px',
                                                border: `2px solid ${isSelected ? '#007AFF' : '#E5E5E5'}`,
                                                borderRadius: '6px',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                background: isSelected ? '#F0F8FF' : 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <span>{prefecture}</span>
                                            {isSelected && <Check size={16} color="#007AFF" />}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ fontSize: '14px', color: '#333' }}>
                                {(editData.specialtyRegions || []).length > 0 
                                    ? (editData.specialtyRegions || []).join('、') 
                                    : '未設定'}
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{
                            fontSize: '13px',
                            color: '#666',
                            marginBottom: '8px',
                            display: 'block'
                        }}>
                            初回の面談方法
                        </label>
                        {isEditing ? (
                            <select
                                value={editData.initialMeetingMethod || ''}
                                onChange={(e) => setEditData(prev => ({ ...prev, initialMeetingMethod: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    background: 'white'
                                }}
                            >
                                <option value="">選択してください</option>
                                <option value="対面">対面</option>
                                <option value="オンライン">オンライン</option>
                                <option value="対面・オンライン両方可能">対面・オンライン両方可能</option>
                            </select>
                        ) : (
                            <div style={{ fontSize: '14px', color: '#333' }}>
                                {editData.initialMeetingMethod || '未設定'}
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{
                            fontSize: '13px',
                            color: '#666',
                            marginBottom: '8px',
                            display: 'block'
                        }}>
                            得意な採用カテゴリ（1つ選択）
                        </label>
                        {isEditing ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}>
                                {RECRUITMENT_CATEGORIES.map(category => {
                                    const isSelected = editData.recruitmentCategory === category;
                                    return (
                                        <div
                                            key={category}
                                            onClick={() => setEditData(prev => ({ ...prev, recruitmentCategory: category }))}
                                            style={{
                                                padding: '10px 12px',
                                                border: `2px solid ${isSelected ? '#007AFF' : '#E5E5E5'}`,
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                background: isSelected ? '#F0F8FF' : 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <span>{category}</span>
                                            {isSelected && <Check size={18} color="#007AFF" />}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ fontSize: '14px', color: '#333' }}>
                                {editData.recruitmentCategory || '未設定'}
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{
                            fontSize: '13px',
                            color: '#666',
                            marginBottom: '8px',
                            display: 'block'
                        }}>
                            得意な職種（複数選択可）
                        </label>
                        {isEditing ? (
                            <>
                                {/* 選択済み職種 */}
                                {(editData.specialtyJobCategories || []).length > 0 && (
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                        marginBottom: '12px'
                                    }}>
                                        {(editData.specialtyJobCategories || []).map(category => (
                                            <div
                                                key={category}
                                                style={{
                                                    background: '#007AFF',
                                                    color: 'white',
                                                    padding: '6px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '13px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}
                                            >
                                                <span>{category}</span>
                                                <X
                                                    size={14}
                                                    onClick={() => removeJobCategory(category)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {/* 職種選択リスト */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '8px',
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                    padding: '8px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '8px',
                                    background: '#FAFAFA'
                                }}>
                                    {JOB_CATEGORIES.map(category => {
                                        const isSelected = (editData.specialtyJobCategories || []).includes(category);
                                        return (
                                            <div
                                                key={category}
                                                onClick={() => {
                                                    if (isSelected) {
                                                        removeJobCategory(category);
                                                    } else {
                                                        addJobCategory(category);
                                                    }
                                                }}
                                                style={{
                                                    padding: '8px 10px',
                                                    border: `2px solid ${isSelected ? '#007AFF' : '#E5E5E5'}`,
                                                    borderRadius: '6px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    background: isSelected ? '#F0F8FF' : 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <span>{category}</span>
                                                {isSelected && <Check size={16} color="#007AFF" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div style={{ fontSize: '14px', color: '#333' }}>
                                {(editData.specialtyJobCategories || []).length > 0 
                                    ? (editData.specialtyJobCategories || []).join('、') 
                                    : '未設定'}
                            </div>
                        )}
                    </div>
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
                        実績と対応の特徴
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
                                        placeholder="対応の特徴や実績の詳細を入力してください"
                                        style={{
                                            width: '100%',
                                            minHeight: '100px',
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
                            実績と対応の特徴が登録されていません
                        </p>
                    )}
                </div>
            </div>


        </div>
    );
};

export default AgentProfile;

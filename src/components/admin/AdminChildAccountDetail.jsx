import React, { useState, useMemo } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Edit2, Trash2, Save, X, Eye, EyeOff, Globe, Calendar, MessageCircle, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import ImageUploader from './ImageUploader';

const AdminChildAccountDetail = ({ childAccount, parentAgent, messagePickStats = {}, onBack, onSave, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });
    
    const [formData, setFormData] = useState({
        name: childAccount?.name || '',
        email: childAccount?.email || '',
        password: '',
        phone: childAccount?.phone || '',
        company: childAccount?.company || parentAgent?.company || '',
        location: childAccount?.location || parentAgent?.location || '',
        specialty: childAccount?.specialty || [],
        bio: childAccount?.bio || '',
        status: childAccount?.status || 'active',
        isPublic: childAccount?.isPublic !== undefined ? childAccount.isPublic : true,
        image: childAccount?.image || null
    });

    // Generate list of months for filter (last 12 months)
    const availableMonths = useMemo(() => {
        const months = [];
        const now = new Date();
        for (let i = 0; i < 12; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            months.push({
                key: monthKey,
                label: `${date.getFullYear()}年${date.getMonth() + 1}月`
            });
        }
        return months;
    }, []);

    // Get message pick count for selected month
    const picksForMonth = useMemo(() => {
        if (messagePickStats[childAccount?.id] && messagePickStats[childAccount.id][selectedMonth]) {
            return messagePickStats[childAccount.id][selectedMonth];
        }
        return 0;
    }, [childAccount, messagePickStats, selectedMonth]);

    // Calculate billing amount (¥10,000 per pick, tax excluded)
    const PRICE_PER_PICK = 10000;
    const TAX_RATE = 0.10; // 10% consumption tax
    const billingExcludingTax = picksForMonth * PRICE_PER_PICK;
    const billingIncludingTax = Math.floor(billingExcludingTax * (1 + TAX_RATE));

    // Calculate total picks for all time
    const totalAllTimePicks = useMemo(() => {
        if (messagePickStats[childAccount?.id]) {
            return Object.values(messagePickStats[childAccount.id]).reduce((sum, count) => sum + count, 0);
        }
        return 0;
    }, [childAccount, messagePickStats]);

    // Calculate monthly history for chart
    const monthlyHistory = useMemo(() => {
        const history = [];
        if (messagePickStats[childAccount?.id]) {
            availableMonths.forEach(month => {
                const count = messagePickStats[childAccount.id][month.key] || 0;
                history.push({
                    month: month.label,
                    count
                });
            });
        }
        return history.reverse(); // Oldest to newest
    }, [childAccount, messagePickStats, availableMonths]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (imageUrl, file) => {
        setFormData(prev => ({ ...prev, image: imageUrl }));
    };

    const handleImageRemove = () => {
        setFormData(prev => ({ ...prev, image: null }));
    };

    const handleSave = () => {
        const updatedData = {
            ...childAccount,
            ...formData,
            updatedAt: new Date().toISOString()
        };
        onSave(childAccount.id, updatedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: childAccount?.name || '',
            email: childAccount?.email || '',
            password: '',
            phone: childAccount?.phone || '',
            company: childAccount?.company || parentAgent?.company || '',
            location: childAccount?.location || parentAgent?.location || '',
            specialty: childAccount?.specialty || [],
            bio: childAccount?.bio || '',
            status: childAccount?.status || 'active',
            isPublic: childAccount?.isPublic !== undefined ? childAccount.isPublic : true,
            image: childAccount?.image || null
        });
        setIsEditing(false);
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F5F5F5',
            overflowY: 'auto',
            position: 'relative'
        }}>
            {/* Header */}
            <div style={{
                background: 'white',
                padding: '16px',
                borderBottom: '1px solid #E5E5E5',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <button
                        onClick={onBack}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <ArrowLeft size={24} color="#667eea" />
                    </button>
                    <div style={{ flex: 1 }}>
                        <h1 style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#1a1a2e',
                            margin: 0
                        }}>
                            子アカウント詳細
                        </h1>
                        <div style={{
                            fontSize: '12px',
                            color: '#999',
                            marginTop: '2px'
                        }}>
                            親: {parentAgent?.name}
                        </div>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            onMouseEnter={() => setHoveredButton('edit-mode')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                background: hoveredButton === 'edit-mode' 
                                    ? 'linear-gradient(135deg, #5a67d8 0%, #6b53a6 100%)'
                                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '8px 16px',
                                fontSize: '13px',
                                fontWeight: 'bold',
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
                    )}
                </div>
            </div>

            {/* Profile Card */}
            <div style={{
                background: 'white',
                margin: '16px',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
                {/* Form Fields */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    {/* Image Upload */}
                    {isEditing ? (
                        <ImageUploader
                            currentImage={formData.image}
                            onImageChange={handleImageChange}
                            onImageRemove={handleImageRemove}
                            label="プロフィール画像"
                        />
                    ) : (
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                color: '#999',
                                marginBottom: '12px',
                                fontWeight: '600'
                            }}>
                                プロフィール画像
                            </label>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: formData.image 
                                        ? `url(${formData.image}) center/cover`
                                        : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '36px',
                                    border: '4px solid #fff',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}>
                                    {!formData.image && formData.name?.charAt(0)}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Name */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#999',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            名前 *
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="名前を入力"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        ) : (
                            <div style={{
                                fontSize: '16px',
                                color: '#1a1a2e',
                                fontWeight: 'bold'
                            }}>
                                {formData.name || '未設定'}
                            </div>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#999',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            <Mail size={14} style={{ display: 'inline', marginRight: '6px' }} />
                            メールアドレス *
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="email@example.com"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        ) : (
                            <div style={{
                                fontSize: '14px',
                                color: '#666'
                            }}>
                                {formData.email || '未設定'}
                            </div>
                        )}
                    </div>

                    {/* Password (only in edit mode) */}
                    {isEditing && (
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                color: '#999',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                パスワード（変更する場合のみ入力）
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="新しいパスワード"
                                    style={{
                                        width: '100%',
                                        padding: '12px 40px 12px 12px',
                                        border: '1px solid #E5E5E5',
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '4px'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} color="#999" /> : <Eye size={18} color="#999" />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Phone */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#999',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            <Phone size={14} style={{ display: 'inline', marginRight: '6px' }} />
                            電話番号
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="090-1234-5678"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        ) : (
                            <div style={{
                                fontSize: '14px',
                                color: '#666'
                            }}>
                                {formData.phone || '未設定'}
                            </div>
                        )}
                    </div>

                    {/* Company */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#999',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            <Briefcase size={14} style={{ display: 'inline', marginRight: '6px' }} />
                            企業名
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                                placeholder="企業名を入力"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        ) : (
                            <div style={{
                                fontSize: '14px',
                                color: '#666'
                            }}>
                                {formData.company || '未設定'}
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#999',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            <MapPin size={14} style={{ display: 'inline', marginRight: '6px' }} />
                            所在地
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                placeholder="東京都"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        ) : (
                            <div style={{
                                fontSize: '14px',
                                color: '#666'
                            }}>
                                {formData.location || '未設定'}
                            </div>
                        )}
                    </div>

                    {/* Bio */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#999',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            自己紹介
                        </label>
                        {isEditing ? (
                            <textarea
                                value={formData.bio}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                placeholder="自己紹介を入力"
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        ) : (
                            <div style={{
                                fontSize: '14px',
                                color: '#666',
                                lineHeight: '1.6'
                            }}>
                                {formData.bio || '未設定'}
                            </div>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#999',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            ステータス
                        </label>
                        {isEditing ? (
                            <select
                                value={formData.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    background: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="active">アクティブ</option>
                                <option value="inactive">非アクティブ</option>
                            </select>
                        ) : (
                            <div style={{
                                display: 'inline-block',
                                fontSize: '12px',
                                color: formData.status === 'active' ? '#10b981' : '#999',
                                background: formData.status === 'active' ? '#d1fae5' : '#f5f5f5',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontWeight: '600'
                            }}>
                                {formData.status === 'active' ? 'アクティブ' : '非アクティブ'}
                            </div>
                        )}
                    </div>

                    {/* Public/Private Status */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#999',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            <Globe size={14} style={{ display: 'inline', marginRight: '6px' }} />
                            公開設定
                        </label>
                        {isEditing ? (
                            <select
                                value={formData.isPublic ? 'public' : 'private'}
                                onChange={(e) => handleInputChange('isPublic', e.target.value === 'public')}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    background: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="public">公開</option>
                                <option value="private">非公開</option>
                            </select>
                        ) : (
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                color: formData.isPublic ? '#10b981' : '#ef4444',
                                background: formData.isPublic ? '#d1fae5' : '#fee2e2',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontWeight: '600'
                            }}>
                                {formData.isPublic ? <Eye size={14} /> : <EyeOff size={14} />}
                                {formData.isPublic ? '公開中' : '非公開'}
                            </div>
                        )}
                    </div>

                    {/* Created/Updated Info */}
                    {!isEditing && (
                        <div style={{
                            paddingTop: '16px',
                            borderTop: '1px solid #E5E5E5',
                            fontSize: '12px',
                            color: '#999'
                        }}>
                            <div>作成日: {new Date(childAccount?.createdAt).toLocaleString('ja-JP')}</div>
                            {childAccount?.updatedAt && (
                                <div style={{ marginTop: '4px' }}>
                                    更新日: {new Date(childAccount.updatedAt).toLocaleString('ja-JP')}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div style={{
                    marginTop: '24px',
                    display: 'flex',
                    gap: '12px'
                }}>
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                onMouseEnter={() => setHoveredButton('save')}
                                onMouseLeave={() => setHoveredButton(null)}
                                style={{
                                    flex: 1,
                                    background: hoveredButton === 'save' 
                                        ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                                        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Save size={18} />
                                保存
                            </button>
                            <button
                                onClick={handleCancel}
                                onMouseEnter={() => setHoveredButton('cancel')}
                                onMouseLeave={() => setHoveredButton(null)}
                                style={{
                                    flex: 1,
                                    background: hoveredButton === 'cancel' ? '#e5e7eb' : '#f5f5f5',
                                    color: '#666',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <X size={18} />
                                キャンセル
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            onMouseEnter={() => setHoveredButton('delete')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                width: '100%',
                                background: hoveredButton === 'delete' ? '#dc2626' : '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '14px',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Trash2 size={18} />
                            子アカウントを削除
                        </button>
                    )}
                </div>
            </div>

            {/* Message Pick Statistics Section */}
            <div style={{
                background: 'white',
                margin: '0 16px 100px 16px',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1a1a2e',
                    margin: '0 0 16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <TrendingUp size={22} color="#667eea" />
                    メッセージピック集計
                </h3>

                {/* Month Filter */}
                <div style={{
                    background: '#f9fafb',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    border: '1px solid #E5E5E5'
                }}>
                    <Calendar size={18} color="#667eea" />
                    <span style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#333'
                    }}>
                        集計月:
                    </span>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '8px 12px',
                            border: '1px solid #E5E5E5',
                            borderRadius: '8px',
                            fontSize: '14px',
                            background: 'white',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        {availableMonths.map(month => (
                            <option key={month.key} value={month.key}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Summary Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    marginBottom: '16px'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        borderRadius: '12px',
                        padding: '16px',
                        color: 'white'
                    }}>
                        <div style={{
                            fontSize: '11px',
                            opacity: 0.9,
                            marginBottom: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <MessageCircle size={12} />
                            今月のピック数
                        </div>
                        <div style={{
                            fontSize: '28px',
                            fontWeight: 'bold'
                        }}>
                            {picksForMonth}
                        </div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        borderRadius: '12px',
                        padding: '16px',
                        color: 'white'
                    }}>
                        <div style={{
                            fontSize: '11px',
                            opacity: 0.9,
                            marginBottom: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <DollarSign size={12} />
                            今月の課金額（税込）
                        </div>
                        <div style={{
                            fontSize: '28px',
                            fontWeight: 'bold'
                        }}>
                            ¥{billingIncludingTax.toLocaleString()}
                        </div>
                        <div style={{
                            fontSize: '11px',
                            opacity: 0.8,
                            marginTop: '4px'
                        }}>
                            税抜: ¥{billingExcludingTax.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Total All Time */}
                <div style={{
                    background: '#f9fafb',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{
                        fontSize: '13px',
                        color: '#666',
                        fontWeight: '600'
                    }}>
                        累計ピック数（全期間）
                    </span>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#667eea'
                    }}>
                        {totalAllTimePicks}件
                    </span>
                </div>

                {/* Monthly History */}
                <div>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <BarChart3 size={16} color="#667eea" />
                        月別推移（直近12ヶ月）
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        {monthlyHistory.map((item, index) => {
                            const maxCount = Math.max(...monthlyHistory.map(h => h.count), 1);
                            const percentage = (item.count / maxCount) * 100;
                            return (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <span style={{
                                        fontSize: '12px',
                                        color: '#666',
                                        minWidth: '80px',
                                        textAlign: 'right'
                                    }}>
                                        {item.month}
                                    </span>
                                    <div style={{
                                        flex: 1,
                                        height: '24px',
                                        background: '#f0f3ff',
                                        borderRadius: '6px',
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${percentage}%`,
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            borderRadius: '6px',
                                            transition: 'width 0.3s ease'
                                        }} />
                                    </div>
                                    <span style={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#667eea',
                                        minWidth: '40px'
                                    }}>
                                        {item.count}件
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        maxWidth: '360px',
                        width: '100%',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#1a1a2e',
                            margin: '0 0 12px 0'
                        }}>
                            子アカウントの削除
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#666',
                            lineHeight: '1.6',
                            margin: '0 0 24px 0'
                        }}>
                            本当に「{childAccount?.name}」を削除しますか？この操作は取り消せません。
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '12px'
                        }}>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                style={{
                                    flex: 1,
                                    background: '#f5f5f5',
                                    color: '#666',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(childAccount.id);
                                    setShowDeleteConfirm(false);
                                }}
                                style={{
                                    flex: 1,
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                削除する
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminChildAccountDetail;

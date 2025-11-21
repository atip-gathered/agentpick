import React, { useState } from 'react';
import { X, Save, Eye, EyeOff } from 'lucide-react';
import ImageUploader from './ImageUploader';

const CreateChildAccountModal = ({ parentAgent, onClose, onCreate }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        company: parentAgent?.company || '',
        location: parentAgent?.location || '',
        bio: '',
        status: 'active',
        isPublic: true,
        image: null
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleImageChange = (imageUrl, file) => {
        setFormData(prev => ({ ...prev, image: imageUrl }));
    };

    const handleImageRemove = () => {
        setFormData(prev => ({ ...prev, image: null }));
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = '名前を入力してください';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'メールアドレスを入力してください';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = '有効なメールアドレスを入力してください';
        }
        
        if (!formData.password.trim()) {
            newErrors.password = 'パスワードを入力してください';
        } else if (formData.password.length < 6) {
            newErrors.password = 'パスワードは6文字以上にしてください';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            const newChildAccount = {
                id: `child-${Date.now()}`,
                ...formData,
                parentId: parentAgent.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                assignedUsers: 0
            };
            onCreate(newChildAccount);
        }
    };

    return (
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
            padding: '20px',
            overflowY: 'auto'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                margin: 'auto'
            }}>
                {/* Header */}
                <div style={{
                    padding: '24px',
                    borderBottom: '1px solid #E5E5E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#1a1a2e',
                            margin: '0 0 4px 0'
                        }}>
                            子アカウント作成
                        </h2>
                        <div style={{
                            fontSize: '13px',
                            color: '#999'
                        }}>
                            親: {parentAgent?.name}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <X size={24} color="#999" />
                    </button>
                </div>

                {/* Form Content */}
                <div style={{
                    padding: '24px',
                    overflowY: 'auto',
                    flex: 1
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        {/* Image Upload */}
                        <ImageUploader
                            currentImage={formData.image}
                            onImageChange={handleImageChange}
                            onImageRemove={handleImageRemove}
                            label="プロフィール画像"
                        />

                        {/* Name */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                名前 <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="山田 太郎"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: `1px solid ${errors.name ? '#ef4444' : '#E5E5E5'}`,
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                            {errors.name && (
                                <div style={{
                                    fontSize: '12px',
                                    color: '#ef4444',
                                    marginTop: '6px'
                                }}>
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                メールアドレス <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="email@example.com"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: `1px solid ${errors.email ? '#ef4444' : '#E5E5E5'}`,
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                            {errors.email && (
                                <div style={{
                                    fontSize: '12px',
                                    color: '#ef4444',
                                    marginTop: '6px'
                                }}>
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                パスワード <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="6文字以上"
                                    style={{
                                        width: '100%',
                                        padding: '12px 40px 12px 12px',
                                        border: `1px solid ${errors.password ? '#ef4444' : '#E5E5E5'}`,
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
                            {errors.password && (
                                <div style={{
                                    fontSize: '12px',
                                    color: '#ef4444',
                                    marginTop: '6px'
                                }}>
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                電話番号
                            </label>
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
                        </div>

                        {/* Company */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                企業名
                            </label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                                placeholder="企業名"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                所在地
                            </label>
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
                        </div>

                        {/* Bio */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                自己紹介
                            </label>
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
                        </div>

                        {/* Public/Private Status */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                公開設定
                            </label>
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
                            <div style={{
                                fontSize: '12px',
                                color: '#999',
                                marginTop: '6px'
                            }}>
                                非公開にすると、このアカウントは求職者に表示されません
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div style={{
                    padding: '20px 24px',
                    borderTop: '1px solid #E5E5E5',
                    display: 'flex',
                    gap: '12px'
                }}>
                    <button
                        onClick={onClose}
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
                            transition: 'all 0.2s ease'
                        }}
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSubmit}
                        onMouseEnter={() => setHoveredButton('create')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            flex: 1,
                            background: hoveredButton === 'create' 
                                ? 'linear-gradient(135deg, #5a67d8 0%, #6b53a6 100%)'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                        作成
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateChildAccountModal;

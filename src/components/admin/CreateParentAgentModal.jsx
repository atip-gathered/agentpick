import React, { useState } from 'react';
import { X, Save, Eye, EyeOff } from 'lucide-react';
import ImageUploader from './ImageUploader';

const CreateParentAgentModal = ({ onClose, onCreate }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
        company: '',
        location: '',
        specialty: [],
        billingAddress: '',
        billingContactName: '',
        status: 'active',
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

    const handleSpecialtyChange = (value) => {
        // Split by comma and trim
        const specialtyArray = value.split(',').map(s => s.trim()).filter(s => s);
        setFormData(prev => ({ ...prev, specialty: specialtyArray }));
    };

    const handleImageChange = (imageUrl, file) => {
        setFormData(prev => ({ ...prev, image: imageUrl }));
    };

    const handleImageRemove = () => {
        setFormData(prev => ({ ...prev, image: null }));
    };

    const validate = () => {
        const newErrors = {};
        
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

        if (!formData.company.trim()) {
            newErrors.company = '企業名を入力してください';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            const newCompanyAccount = {
                id: `company-${Date.now()}`,
                ...formData,
                createdAt: new Date().toISOString(),
                agentAccounts: []
            };
            onCreate(newCompanyAccount);
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
                maxWidth: '600px',
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
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#1a1a2e',
                        margin: 0
                    }}>
                        新規企業アカウント作成
                    </h2>
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
                                企業名 <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                                placeholder="株式会社〇〇"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: `1px solid ${errors.company ? '#ef4444' : '#E5E5E5'}`,
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                            {errors.company && (
                                <div style={{
                                    fontSize: '12px',
                                    color: '#ef4444',
                                    marginTop: '6px'
                                }}>
                                    {errors.company}
                                </div>
                            )}
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

                        {/* Specialty */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                専門分野
                            </label>
                            <input
                                type="text"
                                value={formData.specialty.join(', ')}
                                onChange={(e) => handleSpecialtyChange(e.target.value)}
                                placeholder="IT・Web, コンサルティング, マーケティング"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                            <div style={{
                                fontSize: '11px',
                                color: '#999',
                                marginTop: '6px'
                            }}>
                                カンマ区切りで複数入力できます
                            </div>
                        </div>

                        {/* Billing Address */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                請求先アドレス <span style={{ color: '#999', fontWeight: 'normal' }}>(任意)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.billingAddress}
                                onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                                placeholder="東京都渋谷区1-2-3"
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

                        {/* Billing Contact Name */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                請求先担当者名 <span style={{ color: '#999', fontWeight: 'normal' }}>(任意)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.billingContactName}
                                onChange={(e) => handleInputChange('billingContactName', e.target.value)}
                                placeholder="経理 太郎"
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

export default CreateParentAgentModal;

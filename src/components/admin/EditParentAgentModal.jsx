import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import ImageUploader from './ImageUploader';

const EditParentAgentModal = ({ company, onClose, onSave }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [formData, setFormData] = useState({
        email: company?.email || '',
        phone: company?.phone || '',
        company: company?.company || '',
        location: company?.location || '',
        specialty: company?.specialty || [],
        billingAddress: company?.billingAddress || '',
        billingContactName: company?.billingContactName || '',
        status: company?.status || 'active',
        image: company?.image || null
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSpecialtyChange = (value) => {
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

        if (!formData.company.trim()) {
            newErrors.company = '企業名を入力してください';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            const updatedCompany = {
                ...company,
                ...formData,
                updatedAt: new Date().toISOString()
            };
            onSave(company.id, updatedCompany);
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
                        企業アカウント編集
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
                                <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px' }}>
                                    {errors.email}
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
                                <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px' }}>
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
                            <div style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>
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

                        {/* Status */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                color: '#1a1a2e',
                                marginBottom: '8px',
                                fontWeight: '600'
                            }}>
                                ステータス
                            </label>
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
                </div>
            </div>
        </div>
    );
};

export default EditParentAgentModal;

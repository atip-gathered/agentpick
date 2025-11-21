import React, { useState, useRef } from 'react';
import { Upload, X, User } from 'lucide-react';

const ImageUploader = ({ currentImage, onImageChange, onImageRemove, label = "プロフィール画像" }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [previewImage, setPreviewImage] = useState(currentImage || null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('画像ファイルを選択してください');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('ファイルサイズは5MB以下にしてください');
                return;
            }

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setPreviewImage(imageUrl);
                if (onImageChange) {
                    onImageChange(imageUrl, file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onImageRemove) {
            onImageRemove();
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <label style={{
                display: 'block',
                fontSize: '13px',
                color: '#999',
                marginBottom: '12px',
                fontWeight: '600'
            }}>
                {label}
            </label>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                {/* Image Preview */}
                <div style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid #f0f3ff',
                    background: previewImage 
                        ? `url(${previewImage}) center/cover`
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    {!previewImage && (
                        <User size={40} color="white" strokeWidth={1.5} />
                    )}
                    
                    {previewImage && (
                        <button
                            onClick={handleRemoveImage}
                            onMouseEnter={() => setHoveredButton('remove')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                border: 'none',
                                background: hoveredButton === 'remove' ? '#dc2626' : '#ef4444',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Upload Button */}
                <div style={{ flex: 1 }}>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    
                    <button
                        onClick={handleUploadClick}
                        onMouseEnter={() => setHoveredButton('upload')}
                        onMouseLeave={() => setHoveredButton(null)}
                        type="button"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            border: '2px dashed #E5E5E5',
                            background: hoveredButton === 'upload' ? '#f9fafb' : 'white',
                            color: '#667eea',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Upload size={18} />
                        画像をアップロード
                    </button>
                    
                    <div style={{
                        fontSize: '11px',
                        color: '#999',
                        marginTop: '8px',
                        lineHeight: '1.5'
                    }}>
                        JPG, PNG, GIF (最大5MB)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;

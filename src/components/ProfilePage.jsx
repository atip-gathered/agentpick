import React, { useState, useRef } from 'react';
import { Edit, Download, Upload, Check, X } from 'lucide-react';

const ProfilePage = ({ onNavigate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const resumeInputRef = useRef(null);
    const workHistoryInputRef = useRef(null);

    const [profileData, setProfileData] = useState({
        name: '鈴木 花子',
        image: '/api/placeholder/100/100',
        birthDate: '2000/01/01',
        gender: '女性',
        location: '東京都',
        education: '大学院卒',
        desiredPosition: 'WEBエンジニア',
        desiredSalary: '500万円',
        desiredLocation: '東京都',
        jobChangeTimeline: '2〜3ヶ月以内',
        selfIntroduction: '現在文系大学で留学後、新卒でアパレル販売に飛び込んで約2年います。\n\nランキングをまとめたり、SNSでの購買誘導や提案力が売れるポイントだと感じましたこのため、小売ショップの課題の目的で達成の為、ブランドからお知らせとして集客力を身につけた上で現場でユーザーの目的を正しく広告運用とマーケティングに切り替えし、商品とを用いた上での情報集の為の作成のつもりです。そのため細かいことについても、キャリアの設計の人生のショッピング機能を支援したいという思いで、動機意図を確認します。\n\n現在IT業「専任な技術の現場と基準として課題する形式、名組化、現代社会におけるキャリア立証のために転職希望のサポートに従事。',
        experiencedPositions: [
            'ITエンジニア',
            'WEBディレクター',
            'データマネージャー',
            '旅館クリエイター'
        ],
        resume: 'Hanako_履歴書.pdf',
        workHistory: null // Initially no work history uploaded
    });

    const [editData, setEditData] = useState({ ...profileData });

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({ ...profileData });
    };

    const handleSave = () => {
        setProfileData({ ...editData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ ...profileData });
        setIsEditing(false);
    };

    const handleChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handlePositionChange = (index, value) => {
        const newPositions = [...editData.experiencedPositions];
        newPositions[index] = value;
        setEditData(prev => ({ ...prev, experiencedPositions: newPositions }));
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData(prev => ({ ...prev, resume: file.name }));
        }
    };

    const handleWorkHistoryUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData(prev => ({ ...prev, workHistory: file.name }));
        }
    };

    return (
        <div style={{
            width: '100%',
            height: 'calc(100vh - 80px)',
            overflowY: 'auto',
            background: '#F2F2F7'
        }}>
            <div style={{
                paddingBottom: '120px' // Increased to prevent cut-off
            }}>
                {/* Profile Header with Image and Name */}
                <div style={{
                    background: 'white',
                    padding: '24px 16px 20px 16px'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <img
                            src={profileData.image}
                            alt={profileData.name}
                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                        />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px'
                        }}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#000',
                                        border: '1px solid #007AFF',
                                        borderRadius: '4px',
                                        padding: '4px 8px',
                                        textAlign: 'center'
                                    }}
                                />
                            ) : (
                                <h2 style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#000',
                                    margin: 0
                                }}>
                                    {profileData.name}
                                </h2>
                            )}

                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        background: 'white',
                                        border: '1px solid #007AFF',
                                        borderRadius: '4px',
                                        padding: '5px 10px',
                                        color: '#007AFF',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Edit size={12} strokeWidth={2} />
                                    編集
                                </button>
                            ) : (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={handleSave}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            background: '#007AFF',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '5px 10px',
                                            color: 'white',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            fontWeight: '500'
                                        }}
                                    >
                                        <Check size={12} strokeWidth={2} />
                                        保存
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            background: '#FF3B30',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '5px 10px',
                                            color: 'white',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            fontWeight: '500'
                                        }}
                                    >
                                        <X size={12} strokeWidth={2} />
                                        キャンセル
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Basic Information Section */}
                <div style={{ marginTop: '8px', background: 'white' }}>
                    <SectionHeader title="基本情報" emoji="👤" />
                    <div>
                        <EditableInfoRow
                            label="生年月日"
                            value={profileData.birthDate}
                            editValue={editData.birthDate}
                            isEditing={isEditing}
                            onChange={(val) => handleChange('birthDate', val)}
                        />
                        <EditableInfoRow
                            label="性別"
                            value={profileData.gender}
                            editValue={editData.gender}
                            isEditing={isEditing}
                            onChange={(val) => handleChange('gender', val)}
                        />
                        <EditableInfoRow
                            label="性別"
                            value={profileData.gender}
                            editValue={editData.gender}
                            isEditing={isEditing}
                            onChange={(val) => handleChange('gender', val)}
                        />
                        <EditableInfoRow
                            label="居住地"
                            value={profileData.location}
                            editValue={editData.location}
                            isEditing={isEditing}
                            onChange={(val) => handleChange('location', val)}
                        />
                        <EditableInfoRow
                            label="最終学歴"
                            value={profileData.education}
                            editValue={editData.education}
                            isEditing={isEditing}
                            onChange={(val) => handleChange('education', val)}
                            noBorder
                        />
                    </div>
                </div>

                {/* Job Search Conditions Section */}
                <div style={{ marginTop: '8px', background: 'white' }}>
                    <SectionHeader title="転職経歴条件" emoji="💼" />
                    <div>
                        <EditableInfoRow
                            label="希望職種"
                            value={profileData.desiredPosition}
                            editValue={editData.desiredPosition}
                            isEditing={isEditing}
                            onChange={(val) => handleChange('desiredPosition', val)}
                        />
                        <EditableInfoRow
                            label="希望年収"
                            value={profileData.desiredSalary}
                            editValue={editData.desiredSalary}
                            isEditing={isEditing}
                            onChange={(val) => handleChange('desiredSalary', val)}
                        />
                        <EditableInfoRow
                            label="性別"
                            value={profileData.gender}
                            editValue={editData.gender}
                            isEditing={isEditing}
                            onChange={(val) => handleChange('gender', val)}
                        />
                        <EditableInfoRow
                            label="希望勤務地"
                            value={profileData.desiredLocation}
                            editValue={editData.desiredLocation}
                            isEditing={isEditing}
                            onChange={(val) => handleChange('desiredLocation', val)}
                        />
                        <EditableInfoRow
                            label="転職希望時期"
                            value={profileData.jobChangeTimeline}
                            editValue={editData.jobChangeTimeline}
                            isEditing={isEditing}
                            onChange={(val) => handleChange('jobChangeTimeline', val)}
                            noBorder
                        />
                    </div>
                </div>

                {/* Self Introduction Section */}
                <div style={{ marginTop: '8px', background: 'white' }}>
                    <SectionHeader title="自己紹介" emoji="📝" />
                    {isEditing ? (
                        <textarea
                            value={editData.selfIntroduction}
                            onChange={(e) => handleChange('selfIntroduction', e.target.value)}
                            style={{
                                width: '100%',
                                minHeight: '200px',
                                padding: '16px',
                                fontSize: '13px',
                                lineHeight: '1.8',
                                color: '#333',
                                border: '1px solid #E5E5EA',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                        />
                    ) : (
                        <div style={{
                            padding: '16px',
                            fontSize: '13px',
                            lineHeight: '1.8',
                            color: '#333',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {profileData.selfIntroduction}
                        </div>
                    )}
                </div>

                {/* Experience Section */}
                <div style={{ marginTop: '8px', background: 'white' }}>
                    <SectionHeader title="経験職種" emoji="💼" />
                    <div style={{ padding: '12px 16px' }}>
                        {(isEditing ? editData : profileData).experiencedPositions.map((position, index) => (
                            <div key={index} style={{
                                padding: '6px 0',
                                fontSize: '14px',
                                color: '#333',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span style={{
                                    color: '#007AFF',
                                    fontSize: '8px'
                                }}>●</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={position}
                                        onChange={(e) => handlePositionChange(index, e.target.value)}
                                        style={{
                                            flex: 1,
                                            border: '1px solid #E5E5EA',
                                            borderRadius: '4px',
                                            padding: '4px 8px',
                                            fontSize: '14px'
                                        }}
                                    />
                                ) : (
                                    position
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Documents Section */}
                <div style={{ marginTop: '8px', background: 'white' }}>
                    <SectionHeader title="記録情報" emoji="📄" />
                    <div>
                        {/* Resume */}
                        <input
                            ref={resumeInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            style={{ display: 'none' }}
                            onChange={handleResumeUpload}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px',
                            borderBottom: '1px solid #E5E5EA'
                        }}>
                            <span style={{ fontSize: '14px', color: '#333' }}>履歴書</span>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {profileData.resume ? (
                                    <>
                                        <button style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#007AFF',
                                            fontSize: '13px',
                                            cursor: 'pointer'
                                        }}>
                                            <Download size={14} />
                                            {profileData.resume}
                                        </button>
                                        <button
                                            onClick={() => setProfileData(prev => ({ ...prev, resume: null }))}
                                            style={{
                                                background: '#FF3B30',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '4px 10px',
                                                color: 'white',
                                                fontSize: '12px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            削除
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => resumeInputRef.current?.click()}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#007AFF',
                                            fontSize: '13px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Upload size={14} />
                                        ファイルアップロード
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Work History */}
                        <input
                            ref={workHistoryInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            style={{ display: 'none' }}
                            onChange={handleWorkHistoryUpload}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px'
                        }}>
                            <span style={{ fontSize: '14px', color: '#333' }}>職務経歴書</span>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {profileData.workHistory ? (
                                    <>
                                        <button style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#007AFF',
                                            fontSize: '13px',
                                            cursor: 'pointer'
                                        }}>
                                            <Download size={14} />
                                            {profileData.workHistory}
                                        </button>
                                        <button
                                            onClick={() => setProfileData(prev => ({ ...prev, workHistory: null }))}
                                            style={{
                                                background: '#FF3B30',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '4px 10px',
                                                color: 'white',
                                                fontSize: '12px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            削除
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => workHistoryInputRef.current?.click()}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#007AFF',
                                            fontSize: '13px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Upload size={14} />
                                        ファイルアップロード
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    marginBottom: '20px'
                }}>
                    <button style={{
                        background: 'none',
                        border: 'none',
                        color: '#FF3B30',
                        fontSize: '14px',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}>
                        ログアウト
                    </button>
                </div>

                {/* Action Buttons */}
                <div style={{
                    padding: '0 16px 40px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <button
                        onClick={() => onNavigate && onNavigate('swipe')}
                        style={{
                            width: '100%',
                            background: 'linear-gradient(90deg, #FF9500 0%, #FF6B00 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '24px',
                            padding: '15px',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(255, 149, 0, 0.3)'
                        }}
                    >
                        エージェントをピックする
                    </button>
                    <button style={{
                        width: '100%',
                        background: 'transparent',
                        color: '#007AFF',
                        border: 'none',
                        padding: '8px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        エージェントを探す
                    </button>
                </div>
            </div>
        </div>
    );
};

// Section Header Component
const SectionHeader = ({ title, emoji }) => (
    <div style={{
        background: '#007AFF',
        color: 'white',
        padding: '10px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    }}>
        <span style={{ fontSize: '14px' }}>{emoji}</span>
        {title}
    </div>
);

// Editable Info Row Component
const EditableInfoRow = ({ label, value, editValue, isEditing, onChange, noBorder }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '13px 16px',
        borderBottom: noBorder ? 'none' : '1px solid #E5E5EA'
    }}>
        <span style={{
            fontSize: '14px',
            color: '#666'
        }}>
            {label}
        </span>
        {isEditing ? (
            <input
                type="text"
                value={editValue}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    fontSize: '14px',
                    color: '#333',
                    fontWeight: '500',
                    border: '1px solid #007AFF',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    textAlign: 'right'
                }}
            />
        ) : (
            <span style={{
                fontSize: '14px',
                color: '#333',
                fontWeight: '500'
            }}>
                {value}
            </span>
        )}
    </div>
);

export default ProfilePage;

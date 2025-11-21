import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ThumbsUp } from 'lucide-react';

const SearchPage = ({ agents = [], onPickAgent, onNavigate }) => {
    const [searchFilters, setSearchFilters] = useState({
        keyword: '',
        specialties: [],
        age: '',
        gender: '',
        interviewMethod: '',
        hiringCategory: '',
        companyType: [],
        areas: []
    });

    const [expandedSections, setExpandedSections] = useState({
        keyword: true,
        specialties: false,
        ageGender: false,
        interviewMethod: false,
        hiringCategory: false,
        companyType: false,
        areas: false
    });

    const specialtyOptions = [
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

    const companyTypeOptions = [
        'スタートアップ（Seed/アーリー）',
        'ベンチャー',
        'メガベンチャー',
        '中小企業',
        '大手・上場企業',
        '外資系企業'
    ];

    const prefectures = [
        '北海道', '青森県', '岩手県', '宮城県',
        '秋田県', '山形県', '福島県', '茨城県',
        '栃木県', '群馬県', '埼玉県', '千葉県',
        '東京都', '神奈川県', '新潟県', '富山県',
        '石川県', '福井県', '山梨県', '長野県',
        '岐阜県', '静岡県', '愛知県', '三重県',
        '滋賀県', '京都府', '大阪府', '兵庫県',
        '奈良県', '和歌山県', '鳥取県', '島根県',
        '岡山県', '広島県', '山口県', '徳島県',
        '香川県', '愛媛県', '高知県', '福岡県',
        '佐賀県', '長崎県', '熊本県', '大分県',
        '宮崎県', '鹿児島県', '沖縄県'
    ];

    const toggleSpecialty = (specialty) => {
        setSearchFilters(prev => ({
            ...prev,
            specialties: prev.specialties.includes(specialty)
                ? prev.specialties.filter(s => s !== specialty)
                : [...prev.specialties, specialty]
        }));
    };

    const toggleCompanyType = (type) => {
        setSearchFilters(prev => ({
            ...prev,
            companyType: prev.companyType.includes(type)
                ? prev.companyType.filter(t => t !== type)
                : [...prev.companyType, type]
        }));
    };

    const toggleArea = (area) => {
        setSearchFilters(prev => ({
            ...prev,
            areas: prev.areas.includes(area)
                ? prev.areas.filter(a => a !== area)
                : [...prev.areas, area]
        }));
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div style={{
            width: '100%',
            height: 'calc(100vh - 140px)',
            overflowY: 'auto',
            background: '#F2F2F7'
        }}>
            {/* Search Filters Section */}
            <div style={{
                background: 'white',
                padding: '20px',
                borderBottom: '8px solid #F2F2F7'
            }}>
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#007AFF',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <Search size={20} />
                    エージェント検索
                </h2>
                <p style={{
                    fontSize: '13px',
                    color: '#666',
                    marginBottom: '20px'
                }}>
                    あなたにピッタリのエージェントを見つける
                </p>

                {/* Keyword Search */}
                <div style={{ marginBottom: '16px' }}>
                    <div
                        onClick={() => toggleSection('keyword')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <Search size={16} color="#007AFF" />
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#007AFF'
                        }}>
                            キーワード検索
                        </span>
                        {expandedSections.keyword ? <ChevronUp size={16} color="#999" /> : <ChevronDown size={16} color="#999" />}
                    </div>
                    {expandedSections.keyword && (
                        <input
                            type="text"
                            placeholder="名前、資格名、自己紹介で検索"
                            value={searchFilters.keyword}
                            onChange={(e) => setSearchFilters(prev => ({ ...prev, keyword: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                borderRadius: '6px',
                                border: '1px solid #E5E5EA',
                                fontSize: '14px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    )}
                </div>

                {/* Specialties */}
                <div style={{ marginBottom: '16px' }}>
                    <div
                        onClick={() => toggleSection('specialties')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#007AFF"
                            stroke="none"
                        >
                            <path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm10 15H4V9h16v11z" />
                        </svg>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#007AFF'
                        }}>
                            得意な職種
                        </span>
                        {expandedSections.specialties ? <ChevronUp size={16} color="#999" /> : <ChevronDown size={16} color="#999" />}
                    </div>
                    {expandedSections.specialties && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '8px'
                        }}>
                            {specialtyOptions.map(specialty => (
                                <label
                                    key={specialty}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '13px',
                                        color: '#333',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={searchFilters.specialties.includes(specialty)}
                                        onChange={() => toggleSpecialty(specialty)}
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            accentColor: '#007AFF',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    {specialty}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Age & Gender */}
                <div style={{ marginBottom: '16px' }}>
                    <div
                        onClick={() => toggleSection('ageGender')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle cx="12" cy="12" r="12" fill="#007AFF" />
                            <circle cx="12" cy="9" r="3" fill="white" />
                            <path d="M12 13c-3 0-5 2-5 4v2h10v-2c0-2-2-4-5-4z" fill="white" />
                        </svg>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#007AFF'
                        }}>
                            年代・性別
                        </span>
                        {expandedSections.ageGender ? <ChevronUp size={16} color="#999" /> : <ChevronDown size={16} color="#999" />}
                    </div>
                    {expandedSections.ageGender && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ position: 'relative' }}>
                                <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>年代</label>
                                <select
                                    value={searchFilters.age}
                                    onChange={(e) => setSearchFilters(prev => ({ ...prev, age: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #E5E5EA',
                                        fontSize: '14px',
                                        outline: 'none',
                                        appearance: 'none',
                                        background: 'white',
                                        color: searchFilters.age ? '#333' : '#999',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="">すべて</option>
                                    <option value="20代">20代</option>
                                    <option value="30代">30代</option>
                                    <option value="40代">40代</option>
                                    <option value="50代">50代</option>
                                </select>
                                <ChevronDown
                                    size={16}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        bottom: '12px',
                                        color: '#999',
                                        pointerEvents: 'none'
                                    }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>性別</label>
                                <select
                                    value={searchFilters.gender}
                                    onChange={(e) => setSearchFilters(prev => ({ ...prev, gender: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #E5E5EA',
                                        fontSize: '14px',
                                        outline: 'none',
                                        appearance: 'none',
                                        background: 'white',
                                        color: searchFilters.gender ? '#333' : '#999',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="">すべて</option>
                                    <option value="男性">男性</option>
                                    <option value="女性">女性</option>
                                    <option value="その他">その他</option>
                                </select>
                                <ChevronDown
                                    size={16}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        bottom: '12px',
                                        color: '#999',
                                        pointerEvents: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Interview Method */}
                <div style={{ marginBottom: '16px' }}>
                    <div
                        onClick={() => toggleSection('interviewMethod')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#007AFF"
                        >
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                        </svg>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#007AFF'
                        }}>
                            面談手法（複数選択可）
                        </span>
                        {expandedSections.interviewMethod ? <ChevronUp size={16} color="#999" /> : <ChevronDown size={16} color="#999" />}
                    </div>
                    {expandedSections.interviewMethod && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#007AFF' }} />
                                WEB面談
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#007AFF' }} />
                                対面面談
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#007AFF' }} />
                                電話面談
                            </label>
                        </div>
                    )}
                </div>

                {/* Hiring Category */}
                <div style={{ marginBottom: '16px' }}>
                    <div
                        onClick={() => toggleSection('hiringCategory')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#007AFF"
                        >
                            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
                        </svg>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#007AFF'
                        }}>
                            採用カテゴリ
                        </span>
                        {expandedSections.hiringCategory ? <ChevronUp size={16} color="#999" /> : <ChevronDown size={16} color="#999" />}
                    </div>
                    {expandedSections.hiringCategory && (
                        <div style={{ position: 'relative' }}>
                            <select
                                value={searchFilters.hiringCategory}
                                onChange={(e) => setSearchFilters(prev => ({ ...prev, hiringCategory: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #E5E5EA',
                                    fontSize: '14px',
                                    outline: 'none',
                                    appearance: 'none',
                                    background: 'white',
                                    color: searchFilters.hiringCategory ? '#333' : '#999',
                                    cursor: 'pointer',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <option value="">すべて</option>
                                <option value="新卒採用">新卒採用</option>
                                <option value="中途採用">中途採用</option>
                                <option value="第二新卒">第二新卒</option>
                            </select>
                            <ChevronDown
                                size={16}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#999',
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Company Type */}
                <div style={{ marginBottom: '20px' }}>
                    <div
                        onClick={() => toggleSection('companyType')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#007AFF"
                        >
                            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                        </svg>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#007AFF'
                        }}>
                            得意な企業タイプ（複数選択可）
                        </span>
                        {expandedSections.companyType ? <ChevronUp size={16} color="#999" /> : <ChevronDown size={16} color="#999" />}
                    </div>
                    {expandedSections.companyType && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {companyTypeOptions.map(type => (
                                <label
                                    key={type}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '13px',
                                        color: '#333',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={searchFilters.companyType.includes(type)}
                                        onChange={() => toggleCompanyType(type)}
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            accentColor: '#007AFF',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Area - Prefectures */}
                <div style={{ marginBottom: '20px' }}>
                    <div
                        onClick={() => toggleSection('areas')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#007AFF"
                        >
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#007AFF'
                        }}>
                            得意なエリア（複数選択可）
                        </span>
                        {expandedSections.areas ? <ChevronUp size={16} color="#999" /> : <ChevronDown size={16} color="#999" />}
                    </div>
                    {expandedSections.areas && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '8px'
                        }}>
                            {prefectures.map(prefecture => (
                                <label
                                    key={prefecture}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        fontSize: '13px',
                                        color: '#333',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={searchFilters.areas.includes(prefecture)}
                                        onChange={() => toggleArea(prefecture)}
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            accentColor: '#007AFF',
                                            cursor: 'pointer',
                                            flexShrink: 0
                                        }}
                                    />
                                    <span style={{ fontSize: '12px' }}>{prefecture}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Search Button */}
                <button
                    style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '30px',
                        border: 'none',
                        background: 'linear-gradient(90deg, #FF9500 0%, #FF8000 100%)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <Search size={18} />
                    検索
                </button>

                {/* Reset Link */}
                <div
                    onClick={() => {
                        setSearchFilters({
                            keyword: '',
                            specialties: [],
                            age: '',
                            gender: '',
                            interviewMethod: '',
                            hiringCategory: '',
                            companyType: [],
                            areas: []
                        });
                    }}
                    style={{
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#007AFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                    }}
                >
                    <span style={{ fontSize: '16px' }}>↻</span>
                    リセット
                </div>
            </div>

            {/* Agent Results */}
            <div style={{ padding: '20px 20px 100px 20px' }}>
                {agents.map(agent => (
                    <div
                        key={agent.id}
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '20px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                        }}
                    >
                        {/* Agent Image */}
                        <img
                            src={agent.image}
                            alt={agent.name}
                            style={{
                                width: '100%',
                                height: '200px',
                                borderRadius: '12px',
                                objectFit: 'cover',
                                marginBottom: '16px'
                            }}
                        />

                        {/* Role */}
                        <div style={{
                            fontSize: '13px',
                            color: '#666',
                            marginBottom: '8px'
                        }}>
                            {agent.role}
                        </div>

                        {/* Name */}
                        <div style={{
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: '#007AFF',
                            marginBottom: '12px'
                        }}>
                            {agent.name}
                        </div>

                        {/* Specialty Label */}
                        <div style={{
                            fontSize: '14px',
                            color: '#333',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            得意な職種
                        </div>

                        {/* Specialty Tags */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            marginBottom: '16px'
                        }}>
                            {agent.specialty && agent.specialty.map((spec, index) => (
                                <span
                                    key={index}
                                    style={{
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        background: '#B3E5FC',
                                        color: '#006064',
                                        fontSize: '11px',
                                        fontWeight: '500'
                                    }}
                                >
                                    {spec}
                                </span>
                            ))}
                        </div>

                        {/* Bio */}
                        <p style={{
                            fontSize: '14px',
                            lineHeight: '1.7',
                            color: '#333',
                            marginBottom: '20px'
                        }}>
                            {agent.bio}
                        </p>

                        {/* Pick Button */}
                        <button
                            onClick={() => onPickAgent && onPickAgent(agent)}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '30px',
                                border: 'none',
                                background: 'linear-gradient(90deg, #FF9500 0%, #FF8000 100%)',
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            <ThumbsUp size={20} fill="white" />
                            ピックする
                        </button>

                        {/* Detail Link */}
                        <div
                            onClick={() => onNavigate && onNavigate('detail', agent)}
                            style={{
                                textAlign: 'center',
                                fontSize: '14px',
                                color: '#00695C',
                                cursor: 'pointer',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                            }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#00695C"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="9" y1="9" x2="15" y2="9" />
                                <line x1="9" y1="13" x2="15" y2="13" />
                                <line x1="9" y1="17" x2="12" y2="17" />
                            </svg>
                            <span style={{ textDecoration: 'underline' }}>詳細を見る</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;

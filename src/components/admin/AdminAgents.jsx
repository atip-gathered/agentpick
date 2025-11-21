import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, UserPlus, Shield, Users, Calendar, DollarSign, MessageCircle } from 'lucide-react';

const AdminAgents = ({ companyAccounts = [], messagePickStats = {}, onViewCompanyDetail, onCreateCompany }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
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

    // Calculate message pick count for a company (all agent accounts)
    const getCompanyMessagePicks = (company, month) => {
        let total = 0;
        // Add all agent accounts' picks
        company.agentAccounts?.forEach(agent => {
            if (messagePickStats[agent.id] && messagePickStats[agent.id][month]) {
                total += messagePickStats[agent.id][month];
            }
        });
        return total;
    };

    // Calculate total picks for selected month
    const totalPicksForMonth = useMemo(() => {
        let total = 0;
        Object.keys(messagePickStats).forEach(agentId => {
            if (messagePickStats[agentId][selectedMonth]) {
                total += messagePickStats[agentId][selectedMonth];
            }
        });
        return total;
    }, [messagePickStats, selectedMonth]);

    // Calculate billing amount (¥10,000 per pick, tax excluded)
    const PRICE_PER_PICK = 10000;
    const TAX_RATE = 0.10; // 10% consumption tax
    const totalBillingExcludingTax = totalPicksForMonth * PRICE_PER_PICK;
    const totalBillingIncludingTax = Math.floor(totalBillingExcludingTax * (1 + TAX_RATE));

    // Filter companies based on search query
    const filteredCompanies = companyAccounts.filter(company => 
        company.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate statistics
    const totalCompanyAccounts = companyAccounts.length;
    const totalAgentAccounts = companyAccounts.reduce((sum, company) => 
        sum + (company.agentAccounts?.length || 0), 0
    );
    const activeCompanies = companyAccounts.filter(company => company.status === 'active').length;

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F5F5F5',
            overflowY: 'auto'
        }}>
            {/* Header Section */}
            <div style={{
                background: 'white',
                padding: '24px 20px',
                borderBottom: '1px solid #E5E5E5'
            }}>
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1a1a2e',
                    margin: '0 0 8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <Users size={28} color="#667eea" />
                    アカウント管理
                </h1>
                <p style={{
                    fontSize: '13px',
                    color: '#666',
                    margin: 0
                }}>
                    企業アカウントと個人アカウントの管理
                </p>
            </div>

            {/* Month Filter */}
            <div style={{
                padding: '16px 16px 0 16px'
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '12px 16px',
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
            </div>

            {/* Statistics Cards */}
            <div style={{
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: 'white'
                }}>
                    <div style={{
                        fontSize: '11px',
                        opacity: 0.9,
                        marginBottom: '6px'
                    }}>
                        企業アカウント
                    </div>
                    <div style={{
                        fontSize: '28px',
                        fontWeight: 'bold'
                    }}>
                        {totalCompanyAccounts}
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: 'white'
                }}>
                    <div style={{
                        fontSize: '11px',
                        opacity: 0.9,
                        marginBottom: '6px'
                    }}>
                        個人アカウント
                    </div>
                    <div style={{
                        fontSize: '28px',
                        fontWeight: 'bold'
                    }}>
                        {totalAgentAccounts}
                    </div>
                </div>

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
                        {totalPicksForMonth}
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
                        ¥{totalBillingIncludingTax.toLocaleString()}
                    </div>
                    <div style={{
                        fontSize: '11px',
                        opacity: 0.8,
                        marginTop: '4px'
                    }}>
                        税抜: ¥{totalBillingExcludingTax.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div style={{
                padding: '0 16px 16px 16px'
            }}>
                <div style={{
                    position: 'relative',
                    width: '100%'
                }}>
                    <Search 
                        size={20} 
                        style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#999'
                        }}
                    />
                    <input
                        type="text"
                        placeholder="企業名、メール、所在地で検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '14px 14px 14px 44px',
                            border: '1px solid #E5E5E5',
                            borderRadius: '12px',
                            fontSize: '14px',
                            outline: 'none',
                            background: 'white'
                        }}
                    />
                </div>
            </div>

            {/* Create Agent Button */}
            <div style={{
                padding: '0 16px 16px 16px'
            }}>
                <button
                    onClick={onCreateCompany}
                    onMouseEnter={() => setHoveredButton('create')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        width: '100%',
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
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}
                >
                    <UserPlus size={20} />
                    新規企業アカウント作成
                </button>
            </div>

            {/* Parent Agents List */}
            <div style={{
                padding: '0 16px 100px 16px'
            }}>
                <h2 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1a1a2e',
                    margin: '0 0 16px 0'
                }}>
                    企業アカウント一覧 ({filteredCompanies.length})
                </h2>

                {filteredCompanies.length === 0 ? (
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '40px 20px',
                        textAlign: 'center',
                        color: '#999'
                    }}>
                        <Users size={48} color="#E5E5E5" style={{ marginBottom: '16px' }} />
                        <p style={{ margin: 0, fontSize: '14px' }}>
                            {searchQuery ? '検索結果が見つかりません' : '企業アカウントがまだ登録されていません'}
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        {filteredCompanies.map((company) => (
                            <div
                                key={company.id}
                                onClick={() => onViewCompanyDetail(company)}
                                onMouseEnter={() => setHoveredCard(company.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    transform: hoveredCard === company.id ? 'translateY(-2px)' : 'translateY(0)',
                                    boxShadow: hoveredCard === company.id 
                                        ? '0 6px 20px rgba(0,0,0,0.12)' 
                                        : '0 2px 8px rgba(0,0,0,0.06)',
                                    border: '1px solid #E5E5E5'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '14px'
                                }}>
                                    {/* Company Avatar */}
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        background: company.image 
                                            ? `url(${company.image}) center/cover`
                                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        flexShrink: 0
                                    }}>
                                        {!company.image && company.company.charAt(0)}
                                    </div>

                                    {/* Company Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginBottom: '6px'
                                        }}>
                                            <h3 style={{
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                color: '#1a1a2e',
                                                margin: 0,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {company.company || '企業名未設定'}
                                            </h3>
                                            <Shield size={16} color="#667eea" />
                                        </div>

                                        <div style={{
                                            fontSize: '13px',
                                            color: '#666',
                                            marginBottom: '4px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {company.location || '所在地未設定'}
                                        </div>

                                        <div style={{
                                            fontSize: '12px',
                                            color: '#999',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {company.email}
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginTop: '8px',
                                            flexWrap: 'wrap'
                                        }}>
                                            <span style={{
                                                fontSize: '11px',
                                                color: '#667eea',
                                                background: '#f0f3ff',
                                                padding: '4px 10px',
                                                borderRadius: '6px',
                                                fontWeight: '600'
                                            }}>
                                                個人アカウント: {company.agentAccounts?.length || 0}
                                            </span>
                                            <span style={{
                                                fontSize: '11px',
                                                color: company.status === 'active' ? '#10b981' : '#999',
                                                background: company.status === 'active' ? '#d1fae5' : '#f5f5f5',
                                                padding: '4px 10px',
                                                borderRadius: '6px',
                                                fontWeight: '600'
                                            }}>
                                                {company.status === 'active' ? 'アクティブ' : '非アクティブ'}
                                            </span>
                                            <span style={{
                                                fontSize: '11px',
                                                color: '#f59e0b',
                                                background: '#fef3c7',
                                                padding: '4px 10px',
                                                borderRadius: '6px',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <MessageCircle size={12} />
                                                ピック: {getCompanyMessagePicks(company, selectedMonth)}件
                                            </span>
                                        </div>
                                    </div>

                                    {/* Arrow Icon */}
                                    <ChevronRight
                                        size={24}
                                        color="#999"
                                        style={{
                                            flexShrink: 0,
                                            transition: 'transform 0.2s ease',
                                            transform: hoveredCard === company.id ? 'translateX(4px)' : 'translateX(0)'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAgents;

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Users, Edit, Trash2, Plus, Shield, UserX, Calendar, MessageCircle, DollarSign, TrendingUp } from 'lucide-react';

const AdminAgentDetail = ({ company, messagePickStats = {}, onBack, onEditCompany, onDeleteCompany, onViewAgentDetail, onCreateAgent, onEditAgent, onDeleteAgent }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [hoveredChild, setHoveredChild] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });

    const agentAccounts = company?.agentAccounts || [];

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

    // Calculate message pick count for agent account
    const getAgentMessagePicks = (agentId, month) => {
        if (messagePickStats[agentId] && messagePickStats[agentId][month]) {
            return messagePickStats[agentId][month];
        }
        return 0;
    };

    // Calculate total picks for this company (all agents)
    const totalPicksForMonth = useMemo(() => {
        let total = 0;
        agentAccounts.forEach(agent => {
            total += getAgentMessagePicks(agent.id, selectedMonth);
        });
        return total;
    }, [agentAccounts, messagePickStats, selectedMonth]);

    // Calculate billing amount (¥10,000 per pick, tax excluded)
    const PRICE_PER_PICK = 10000;
    const TAX_RATE = 0.10; // 10% consumption tax
    const totalBillingExcludingTax = totalPicksForMonth * PRICE_PER_PICK;
    const totalBillingIncludingTax = Math.floor(totalBillingExcludingTax * (1 + TAX_RATE));

    // Calculate total picks for all time
    const totalAllTimePicks = useMemo(() => {
        let total = 0;
        agentAccounts.forEach(agent => {
            if (messagePickStats[agent.id]) {
                Object.values(messagePickStats[agent.id]).forEach(count => {
                    total += count;
                });
            }
        });
        return total;
    }, [agentAccounts, messagePickStats]);

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
                    gap: '12px',
                    marginBottom: '12px'
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
                    <h1 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#1a1a2e',
                        margin: 0,
                        flex: 1
                    }}>
                        企業アカウント詳細
                    </h1>
                </div>
            </div>

            {/* Agent Profile Card */}
            <div style={{
                background: 'white',
                margin: '16px',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
                {/* Avatar and Basic Info */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: company?.image 
                            ? `url(${company.image}) center/cover`
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '28px',
                        flexShrink: 0,
                        border: '4px solid #f0f3ff'
                    }}>
                        {!company?.image && company?.company?.charAt(0)}
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px'
                        }}>
                            <h2 style={{
                                fontSize: '22px',
                                fontWeight: 'bold',
                                color: '#1a1a2e',
                                margin: 0
                            }}>
                                {company?.company || '企業名未設定'}
                            </h2>
                            <Shield size={20} color="#667eea" />
                        </div>

                        <div style={{
                            display: 'inline-block',
                            fontSize: '12px',
                            color: company?.status === 'active' ? '#10b981' : '#999',
                            background: company?.status === 'active' ? '#d1fae5' : '#f5f5f5',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontWeight: '600'
                        }}>
                            {company?.status === 'active' ? 'アクティブ' : '非アクティブ'}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '20px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #E5E5E5'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <Mail size={18} color="#667eea" />
                        <span style={{
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            {company?.email || 'メールアドレス未設定'}
                        </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <Phone size={18} color="#667eea" />
                        <span style={{
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            {company?.phone || '電話番号未設定'}
                        </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <Briefcase size={18} color="#667eea" />
                        <span style={{
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            {company?.company || '企業名未設定'}
                        </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <MapPin size={18} color="#667eea" />
                        <span style={{
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            {company?.location || '所在地未設定'}
                        </span>
                    </div>
                </div>

                {/* Specialty */}
                {company?.specialty && company.specialty.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{
                            fontSize: '13px',
                            color: '#999',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            専門分野
                        </div>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px'
                        }}>
                            {company.specialty.map((spec, index) => (
                                <span
                                    key={index}
                                    style={{
                                        background: '#f0f3ff',
                                        color: '#667eea',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}
                                >
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Billing Information */}
                {(company?.billingAddress || company?.billingContactName) && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{
                            fontSize: '13px',
                            color: '#999',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            請求先情報
                        </div>
                        {company?.billingAddress && (
                            <div style={{
                                fontSize: '14px',
                                color: '#666',
                                marginBottom: '6px'
                            }}>
                                <span style={{ fontWeight: '600', marginRight: '8px' }}>住所:</span>
                                {company.billingAddress}
                            </div>
                        )}
                        {company?.billingContactName && (
                            <div style={{
                                fontSize: '14px',
                                color: '#666'
                            }}>
                                <span style={{ fontWeight: '600', marginRight: '8px' }}>担当者:</span>
                                {company.billingContactName}
                            </div>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '12px'
                }}>
                    <button
                        onClick={() => onEditCompany(company)}
                        onMouseEnter={() => setHoveredButton('edit')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            flex: 1,
                            background: hoveredButton === 'edit' 
                                ? 'linear-gradient(135deg, #5a67d8 0%, #6b53a6 100%)'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Edit size={18} />
                        編集
                    </button>

                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        onMouseEnter={() => setHoveredButton('delete')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            flex: 1,
                            background: hoveredButton === 'delete' ? '#dc2626' : '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px',
                            fontSize: '14px',
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
                        削除
                    </button>
                </div>
            </div>

            {/* Message Pick Statistics Section */}
            <div style={{
                background: 'white',
                margin: '0 16px 16px 16px',
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

                {/* Total All Time */}
                <div style={{
                    background: '#f9fafb',
                    borderRadius: '12px',
                    padding: '12px 16px',
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
            </div>

            {/* Agent Accounts Section */}
            <div style={{
                background: 'white',
                margin: '0 16px 100px 16px',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#1a1a2e',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Users size={22} color="#667eea" />
                        個人アカウント ({agentAccounts.length})
                    </h3>

                    <button
                        onClick={() => onCreateAgent(company)}
                        onMouseEnter={() => setHoveredButton('create-child')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            background: hoveredButton === 'create-child'
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
                        <Plus size={16} />
                        追加
                    </button>
                </div>

                {agentAccounts.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: '#999'
                    }}>
                        <UserX size={48} color="#E5E5E5" style={{ marginBottom: '16px' }} />
                        <p style={{ margin: 0, fontSize: '14px' }}>
                            個人アカウントがまだ作成されていません
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        {agentAccounts.map((agent) => (
                            <div
                                key={agent.id}
                                onClick={() => onViewAgentDetail(agent)}
                                onMouseEnter={() => setHoveredChild(agent.id)}
                                onMouseLeave={() => setHoveredChild(null)}
                                style={{
                                    background: hoveredChild === agent.id ? '#f9fafb' : '#fff',
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    transform: hoveredChild === agent.id ? 'translateX(4px)' : 'translateX(0)'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        background: agent.image 
                                            ? `url(${agent.image}) center/cover`
                                            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        flexShrink: 0
                                    }}>
                                        {!agent.image && agent.name?.charAt(0)}
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            color: '#1a1a2e',
                                            marginBottom: '4px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {agent.name || '名前未設定'}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#999',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {agent.email || 'メールアドレス未設定'}
                                        </div>
                                        <div style={{
                                            marginTop: '6px',
                                            display: 'flex',
                                            gap: '8px',
                                            flexWrap: 'wrap'
                                        }}>
                                            <span style={{
                                                fontSize: '11px',
                                                color: agent.status === 'active' ? '#10b981' : '#999',
                                                background: agent.status === 'active' ? '#d1fae5' : '#f5f5f5',
                                                padding: '3px 8px',
                                                borderRadius: '6px',
                                                fontWeight: '600'
                                            }}>
                                                {agent.status === 'active' ? 'アクティブ' : '非アクティブ'}
                                            </span>
                                            {agent.assignedUsers && (
                                                <span style={{
                                                    fontSize: '11px',
                                                    color: '#667eea',
                                                    background: '#f0f3ff',
                                                    padding: '3px 8px',
                                                    borderRadius: '6px',
                                                    fontWeight: '600'
                                                }}>
                                                    担当: {agent.assignedUsers} 人
                                                </span>
                                            )}
                                            <span style={{
                                                fontSize: '11px',
                                                color: agent.isPublic ? '#10b981' : '#ef4444',
                                                background: agent.isPublic ? '#d1fae5' : '#fee2e2',
                                                padding: '3px 8px',
                                                borderRadius: '6px',
                                                fontWeight: '600'
                                            }}>
                                                {agent.isPublic ? '公開' : '非公開'}
                                            </span>
                                            <span style={{
                                                fontSize: '11px',
                                                color: '#f59e0b',
                                                background: '#fef3c7',
                                                padding: '3px 8px',
                                                borderRadius: '6px',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <MessageCircle size={11} />
                                                {getAgentMessagePicks(agent.id, selectedMonth)}件
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
                            企業アカウントの削除
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#666',
                            lineHeight: '1.6',
                            margin: '0 0 24px 0'
                        }}>
                            本当に「{company?.company}」を削除しますか？この操作は取り消せません。
                            {agentAccounts.length > 0 && (
                                <span style={{ color: '#ef4444', fontWeight: '600' }}>
                                    <br /><br />
                                    注意: {agentAccounts.length}個の個人アカウントも同時に削除されます。
                                </span>
                            )}
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
                                    onDeleteCompany(company.id);
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

export default AdminAgentDetail;

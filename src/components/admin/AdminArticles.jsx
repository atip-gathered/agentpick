import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Calendar, Tag, Image as ImageIcon, X, Check, AlertCircle, List, User } from 'lucide-react';
import { agents } from '../../mockData';

const AdminArticles = ({ articles, onCreateArticle, onUpdateArticle, onDeleteArticle }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        imageUrl: '',
        tag: 'インタビュー',
        author: '',
        isPublished: true,
        featuredAgentId: null,
        tableOfContents: [],
        sections: [{ title: '', content: '' }]
    });

    const tagOptions = ['インタビュー', 'ニュース', 'コラム', 'ガイド', 'イベント'];

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            content: '',
            imageUrl: '',
            tag: 'インタビュー',
            author: '',
            isPublished: true,
            featuredAgentId: null,
            tableOfContents: [],
            sections: [{ title: '', content: '' }]
        });
    };

    const handleCreateClick = () => {
        resetForm();
        setShowCreateModal(true);
    };

    const handleEditClick = (article) => {
        setSelectedArticle(article);
        setFormData({
            title: article.title,
            description: article.description,
            content: article.content,
            imageUrl: article.image,
            tag: article.tag,
            author: article.author || '',
            isPublished: article.isPublished,
            featuredAgentId: article.featuredAgentId || null,
            tableOfContents: article.tableOfContents || [],
            sections: article.sections || [{ title: '', content: '' }]
        });
        setShowEditModal(true);
    };

    const handleDeleteClick = (article) => {
        setSelectedArticle(article);
        setShowDeleteDialog(true);
    };

    const handleSubmitCreate = () => {
        if (!formData.title || !formData.description) {
            showToastMessage('タイトルと説明は必須です');
            return;
        }
        
        // Validate sections
        const validSections = formData.sections.filter(s => s.title.trim() && s.content.trim());
        if (validSections.length === 0) {
            showToastMessage('少なくとも1つのセクションが必要です');
            return;
        }
        
        // If interview tag, require agent selection
        if (formData.tag === 'インタビュー' && !formData.featuredAgentId) {
            showToastMessage('インタビュー記事にはエージェントの選択が必要です');
            return;
        }

        const newArticle = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            content: formData.content,
            image: formData.imageUrl || 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=800&q=80',
            tag: formData.tag,
            author: formData.author || '編集部',
            date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
            isPublished: formData.isPublished,
            views: 0,
            createdAt: new Date().toISOString(),
            featuredAgentId: formData.tag === 'インタビュー' ? formData.featuredAgentId : null,
            tableOfContents: validSections.map(s => s.title),
            sections: validSections
        };

        onCreateArticle(newArticle);
        setShowCreateModal(false);
        resetForm();
        showToastMessage('記事を作成しました');
    };

    const handleSubmitEdit = () => {
        if (!formData.title || !formData.description) {
            showToastMessage('タイトルと説明は必須です');
            return;
        }
        
        // Validate sections
        const validSections = formData.sections.filter(s => s.title.trim() && s.content.trim());
        if (validSections.length === 0) {
            showToastMessage('少なくとも1つのセクションが必要です');
            return;
        }
        
        // If interview tag, require agent selection
        if (formData.tag === 'インタビュー' && !formData.featuredAgentId) {
            showToastMessage('インタビュー記事にはエージェントの選択が必要です');
            return;
        }

        const updatedArticle = {
            ...selectedArticle,
            title: formData.title,
            description: formData.description,
            content: formData.content,
            image: formData.imageUrl,
            tag: formData.tag,
            author: formData.author || '編集部',
            isPublished: formData.isPublished,
            updatedAt: new Date().toISOString(),
            featuredAgentId: formData.tag === 'インタビュー' ? formData.featuredAgentId : null,
            tableOfContents: validSections.map(s => s.title),
            sections: validSections
        };

        onUpdateArticle(selectedArticle.id, updatedArticle);
        setShowEditModal(false);
        setSelectedArticle(null);
        resetForm();
        showToastMessage('記事を更新しました');
    };

    const handleConfirmDelete = () => {
        onDeleteArticle(selectedArticle.id);
        setShowDeleteDialog(false);
        setSelectedArticle(null);
        showToastMessage('記事を削除しました');
    };

    const handleTogglePublish = (article) => {
        const updatedArticle = {
            ...article,
            isPublished: !article.isPublished,
            updatedAt: new Date().toISOString()
        };
        onUpdateArticle(article.id, updatedArticle);
        showToastMessage(updatedArticle.isPublished ? '記事を公開しました' : '記事を非公開にしました');
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{
            padding: '20px 16px',
            paddingBottom: '80px'
        }}>
            {/* Header */}
            <div style={{
                marginBottom: '20px'
            }}>
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#333',
                    margin: '0 0 8px 0'
                }}>
                    特集記事管理
                </h1>
                <p style={{
                    fontSize: '14px',
                    color: '#666',
                    margin: 0
                }}>
                    記事の作成・編集・削除を行います
                </p>
            </div>

            {/* Search and Create Button */}
            <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px'
            }}>
                <div style={{
                    flex: 1,
                    position: 'relative'
                }}>
                    <Search
                        size={20}
                        style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#999'
                        }}
                    />
                    <input
                        type="text"
                        placeholder="記事を検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 12px 12px 44px',
                            border: '2px solid #E5E5E5',
                            borderRadius: '12px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                    />
                </div>
                <button
                    onClick={handleCreateClick}
                    style={{
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                        transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <Plus size={18} />
                    新規作成
                </button>
            </div>

            {/* Articles Count */}
            <div style={{
                padding: '12px 16px',
                background: '#F8F9FA',
                borderRadius: '12px',
                marginBottom: '16px',
                fontSize: '14px',
                color: '#666'
            }}>
                <span style={{ fontWeight: '600', color: '#333' }}>
                    {filteredArticles.length}
                </span>
                件の記事
                {searchQuery && (
                    <span style={{ marginLeft: '8px', color: '#667eea' }}>
                        「{searchQuery}」の検索結果
                    </span>
                )}
            </div>

            {/* Articles List */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {filteredArticles.map((article) => (
                    <div
                        key={article.id}
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '16px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            transition: 'transform 0.2s ease'
                        }}
                    >
                        {/* Article Header */}
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '12px'
                        }}>
                            {/* Thumbnail */}
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                flexShrink: 0,
                                background: '#F0F0F0'
                            }}>
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>

                            {/* Article Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '6px'
                                }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        background: article.isPublished ? '#E8F8EC' : '#FFF4E5',
                                        color: article.isPublished ? '#34C759' : '#FF9500',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        {article.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                                        {article.isPublished ? '公開中' : '非公開'}
                                    </span>
                                    <span style={{
                                        padding: '4px 10px',
                                        background: '#E8EBFF',
                                        color: '#667eea',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}>
                                        {article.tag}
                                    </span>
                                </div>
                                <h3 style={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    margin: '0 0 4px 0',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    lineHeight: '1.4'
                                }}>
                                    {article.title}
                                </h3>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#999',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={12} />
                                        {article.date}
                                    </span>
                                    <span>•</span>
                                    <span>{article.views || 0} views</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            paddingTop: '12px',
                            borderTop: '1px solid #F0F0F0'
                        }}>
                            <button
                                onClick={() => handleTogglePublish(article)}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    background: article.isPublished ? '#FFF4E5' : '#E8F8EC',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: article.isPublished ? '#FF9500' : '#34C759',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    transition: 'transform 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {article.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                                {article.isPublished ? '非公開' : '公開'}
                            </button>
                            <button
                                onClick={() => handleEditClick(article)}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    background: '#E8EBFF',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: '#667eea',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    transition: 'transform 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <Edit2 size={14} />
                                編集
                            </button>
                            <button
                                onClick={() => handleDeleteClick(article)}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    background: '#FFE5E5',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: '#FF3B30',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    transition: 'transform 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <Trash2 size={14} />
                                削除
                            </button>
                        </div>
                    </div>
                ))}

                {filteredArticles.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: '#999'
                    }}>
                        <AlertCircle size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                        <p style={{ fontSize: '16px', margin: 0 }}>
                            {searchQuery ? '記事が見つかりませんでした' : '記事がありません'}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={handleCreateClick}
                                style={{
                                    marginTop: '16px',
                                    padding: '12px 24px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                最初の記事を作成
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <ArticleFormModal
                    title="新規記事作成"
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmitCreate}
                    onClose={() => {
                        setShowCreateModal(false);
                        resetForm();
                    }}
                    tagOptions={tagOptions}
                />
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <ArticleFormModal
                    title="記事編集"
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmitEdit}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedArticle(null);
                        resetForm();
                    }}
                    tagOptions={tagOptions}
                    isEdit
                />
            )}

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
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
                        borderRadius: '20px',
                        padding: '24px',
                        maxWidth: '400px',
                        width: '100%',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: '#FFE5E5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px'
                        }}>
                            <AlertCircle size={28} color="#FF3B30" />
                        </div>
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#333',
                            textAlign: 'center',
                            margin: '0 0 8px 0'
                        }}>
                            記事を削除しますか？
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#666',
                            textAlign: 'center',
                            margin: '0 0 24px 0',
                            lineHeight: '1.6'
                        }}>
                            「{selectedArticle?.title}」を削除します。この操作は取り消せません。
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '12px'
                        }}>
                            <button
                                onClick={() => {
                                    setShowDeleteDialog(false);
                                    setSelectedArticle(null);
                                }}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    background: '#F8F9FA',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    background: '#FF3B30',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                削除する
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div style={{
                    position: 'fixed',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#333',
                    color: 'white',
                    padding: '14px 24px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    zIndex: 1001,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    animation: 'slideUp 0.3s ease'
                }}>
                    <Check size={18} />
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

// Article Form Modal Component
const ArticleFormModal = ({ title, formData, setFormData, onSubmit, onClose, tagOptions, isEdit }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            overflowY: 'auto'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '430px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                margin: '20px 0'
            }}>
                {/* Modal Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '20px 20px 0 0',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'white',
                        margin: 0
                    }}>
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            borderRadius: '8px',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div style={{
                    padding: '24px'
                }}>
                    {/* Title */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            タイトル <span style={{ color: '#FF3B30' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="記事のタイトルを入力"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #E5E5E5',
                                borderRadius: '12px',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                        />
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            説明 <span style={{ color: '#FF3B30' }}>*</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="記事の簡単な説明を入力"
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #E5E5E5',
                                borderRadius: '12px',
                                fontSize: '14px',
                                outline: 'none',
                                resize: 'vertical',
                                fontFamily: 'inherit',
                                transition: 'border-color 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                        />
                    </div>

                    {/* Tag */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <Tag size={16} />
                            タグ <span style={{ color: '#FF3B30' }}>*</span>
                        </label>
                        <select
                            value={formData.tag}
                            onChange={(e) => setFormData({ ...formData, tag: e.target.value, featuredAgentId: e.target.value === 'インタビュー' ? formData.featuredAgentId : null })}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #E5E5E5',
                                borderRadius: '12px',
                                fontSize: '14px',
                                outline: 'none',
                                cursor: 'pointer',
                                background: 'white',
                                transition: 'border-color 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                        >
                            {tagOptions.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>

                    {/* Featured Agent (only for Interview tag) */}
                    {formData.tag === 'インタビュー' && (
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#333',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                <User size={16} />
                                紐付けるエージェント <span style={{ color: '#FF3B30' }}>*</span>
                            </label>
                            <select
                                value={formData.featuredAgentId || ''}
                                onChange={(e) => setFormData({ ...formData, featuredAgentId: e.target.value ? parseInt(e.target.value) : null })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #E5E5E5',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    background: 'white',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                            >
                                <option value="">エージェントを選択してください</option>
                                {agents.map(agent => (
                                    <option key={agent.id} value={agent.id}>
                                        {agent.name} - {agent.company}
                                    </option>
                                ))}
                            </select>
                            {formData.featuredAgentId && agents.find(a => a.id === formData.featuredAgentId) && (
                                <div style={{
                                    marginTop: '12px',
                                    padding: '12px',
                                    background: '#E8EBFF',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <img
                                        src={agents.find(a => a.id === formData.featuredAgentId).image}
                                        alt="Agent"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '2px solid white'
                                        }}
                                    />
                                    <div>
                                        <div style={{
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            color: '#333'
                                        }}>
                                            {agents.find(a => a.id === formData.featuredAgentId).name}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#666'
                                        }}>
                                            {agents.find(a => a.id === formData.featuredAgentId).company}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Article Sections */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <List size={16} />
                                記事セクション（目次） <span style={{ color: '#FF3B30' }}>*</span>
                            </span>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, sections: [...formData.sections, { title: '', content: '' }] })}
                                style={{
                                    padding: '6px 12px',
                                    background: '#667eea',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                <Plus size={14} />
                                セクション追加
                            </button>
                        </label>
                        
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            marginTop: '12px'
                        }}>
                            {formData.sections.map((section, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '16px',
                                        background: '#F8F9FA',
                                        borderRadius: '12px',
                                        border: '2px solid #E5E5E5'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '12px'
                                    }}>
                                        <span style={{
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            color: '#667eea'
                                        }}>
                                            セクション {index + 1}
                                        </span>
                                        {formData.sections.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setFormData({
                                                    ...formData,
                                                    sections: formData.sections.filter((_, i) => i !== index)
                                                })}
                                                style={{
                                                    padding: '4px 8px',
                                                    background: '#FFE5E5',
                                                    color: '#FF3B30',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}
                                            >
                                                <X size={12} />
                                                削除
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* Section Title */}
                                    <input
                                        type="text"
                                        value={section.title}
                                        onChange={(e) => {
                                            const newSections = [...formData.sections];
                                            newSections[index].title = e.target.value;
                                            setFormData({ ...formData, sections: newSections });
                                        }}
                                        placeholder="セクションタイトル（例：転職エージェントになったきっかけ）"
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            border: '2px solid #E5E5E5',
                                            borderRadius: '8px',
                                            fontSize: '13px',
                                            outline: 'none',
                                            marginBottom: '10px',
                                            background: 'white'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                                    />
                                    
                                    {/* Section Content */}
                                    <textarea
                                        value={section.content}
                                        onChange={(e) => {
                                            const newSections = [...formData.sections];
                                            newSections[index].content = e.target.value;
                                            setFormData({ ...formData, sections: newSections });
                                        }}
                                        placeholder="セクションの本文を入力..."
                                        rows={6}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            border: '2px solid #E5E5E5',
                                            borderRadius: '8px',
                                            fontSize: '13px',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontFamily: 'inherit',
                                            lineHeight: '1.6',
                                            background: 'white'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                                    />
                                </div>
                            ))}
                        </div>
                        <div style={{
                            marginTop: '8px',
                            fontSize: '12px',
                            color: '#666',
                            lineHeight: '1.5'
                        }}>
                            💡 各セクションのタイトルが目次として表示されます
                        </div>
                    </div>

                    {/* Image URL */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <ImageIcon size={16} />
                            画像URL
                        </label>
                        <input
                            type="text"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #E5E5E5',
                                borderRadius: '12px',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                        />
                        {formData.imageUrl && (
                            <div style={{
                                marginTop: '12px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '2px solid #E5E5E5'
                            }}>
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Author */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            著者
                        </label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder="編集部"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #E5E5E5',
                                borderRadius: '12px',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                        />
                    </div>

                    {/* Publish Status */}
                    <div style={{
                        padding: '16px',
                        background: '#F8F9FA',
                        borderRadius: '12px',
                        marginBottom: '24px'
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}>
                            <input
                                type="checkbox"
                                checked={formData.isPublished}
                                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                style={{
                                    marginRight: '12px',
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer'
                                }}
                            />
                            <div>
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '2px'
                                }}>
                                    記事を公開する
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#666'
                                }}>
                                    チェックを外すと下書きとして保存されます
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '12px'
                    }}>
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '14px',
                                background: '#F8F9FA',
                                border: 'none',
                                borderRadius: '12px',
                                color: '#333',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            キャンセル
                        </button>
                        <button
                            onClick={onSubmit}
                            style={{
                                flex: 1,
                                padding: '14px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                            }}
                        >
                            {isEdit ? '更新する' : '作成する'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminArticles;

import React, { useState } from 'react';

const FeaturedArticlesPage = ({ onNavigateToDetail }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredCard, setHoveredCard] = useState(null);
    const totalPages = 12;
    const articlesPerPage = 5;

    // Sample article data - matching the screenshot
    const recommendedArticles = [
        {
            id: 1,
            author: '山田 明子',
            title: 'IT業界の最新動向と転職市場',
            description: 'IT業界の最新動向と転職市場の状況を詳しく分析します',
            category: '新着記事',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            author: '山田 明子',
            title: 'IT業界の最新動向と転職市場',
            description: 'IT業界の最新動向と転職市場の状況を詳しく分析します',
            category: '新着記事',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            author: '山田 明子',
            title: 'IT業界の最新動向と転職市場',
            description: 'IT業界の最新動向と転職市場の状況を詳しく分析します',
            category: '新着記事',
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];

    // Generate article data for all pages (12 pages * 5 articles per page = 60 articles)
    const allLatestArticles = Array.from({ length: totalPages * articlesPerPage }, (_, index) => ({
        id: index + 4,
        author: '山田 明子',
        title: `IT業界の最新動向と転職市場 (記事 ${index + 1})`,
        description: 'IT業界の最新動向と転職市場の状況を詳しく分析します',
        categories: index % 2 === 0 ? ['新着記事', '中途採用'] : ['中途採用', '新着記事'],
        image: index % 3 === 0 
            ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            : index % 3 === 1
            ? 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }));

    // Get articles for current page
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const latestArticles = allLatestArticles.slice(startIndex, endIndex);

    // Generate pagination numbers
    const getPaginationNumbers = () => {
        const pages = [];
        
        if (totalPages <= 7) {
            // Show all pages if total is 7 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (currentPage <= 3) {
                // Near the start
                pages.push(2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // In the middle
                pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        
        return pages;
    };

    const handlePageChange = (page) => {
        if (typeof page === 'number' && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Scroll to top of the page
            document.querySelector('[style*="overflowY: auto"]')?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#F5F5F5',
            overflowY: 'auto',
            paddingBottom: '20px',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }}>
            {/* Header Section */}
            <div style={{
                background: 'white',
                padding: '24px 16px 20px 16px'
            }}>
                <h1 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#007AFF',
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span style={{
                        width: '4px',
                        height: '20px',
                        background: '#007AFF',
                        display: 'inline-block',
                        borderRadius: '2px'
                    }}></span>
                    エージェント特集
                </h1>
                <p style={{
                    fontSize: '12px',
                    color: '#666',
                    lineHeight: '1.7',
                    margin: 0
                }}>
                    人気エージェントの特集や事例。<br />
                    仕事をする上で役に立てていただきたいおまとめメディア。<br />
                    目的にピッタリのエージェントにはまるメディアです。
                </p>
            </div>

            {/* Recommended Articles Section */}
            <div style={{
                background: 'white',
                padding: '20px 0',
                marginTop: '8px'
            }}>
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#FF9500',
                    margin: '0 0 16px 16px'
                }}>
                    今月のおすすめ記事
                </h2>

                {/* Carousel */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'flex',
                        transform: `translateX(-${currentSlide * 100}%)`,
                        transition: 'transform 0.3s ease'
                    }}>
                        {recommendedArticles.map((article) => (
                            <div
                                key={article.id}
                                style={{
                                    minWidth: '100%',
                                    padding: '0 16px'
                                }}
                            >
                                <div 
                                    onClick={() => onNavigateToDetail && onNavigateToDetail(article)}
                                    onMouseEnter={() => setHoveredCard(`rec-${article.id}`)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        background: '#F8F8F8',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transform: hoveredCard === `rec-${article.id}` ? 'translateY(-4px)' : 'translateY(0)',
                                        boxShadow: hoveredCard === `rec-${article.id}` ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                                        transition: 'all 0.3s ease'
                                    }}>
                                    {/* Category Tag */}
                                    <div style={{
                                        padding: '12px 12px 8px 12px'
                                    }}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '4px 12px',
                                            background: '#E3F2FD',
                                            color: '#1976D2',
                                            fontSize: '11px',
                                            borderRadius: '4px',
                                            fontWeight: '600'
                                        }}>
                                            {article.category}
                                        </span>
                                    </div>

                                    {/* Image */}
                                    <div style={{ padding: '0 12px' }}>
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div style={{ padding: '16px 12px' }}>
                                        <div style={{
                                            fontSize: '13px',
                                            color: '#333',
                                            fontWeight: '600',
                                            marginBottom: '6px'
                                        }}>
                                            {article.author}
                                        </div>
                                        <h3 style={{
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            color: '#007AFF',
                                            margin: '0 0 8px 0',
                                            lineHeight: '1.4'
                                        }}>
                                            {article.title}
                                        </h3>
                                        <p style={{
                                            fontSize: '12px',
                                            color: '#666',
                                            lineHeight: '1.6',
                                            margin: 0
                                        }}>
                                            {article.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Dots */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        marginTop: '16px'
                    }}>
                        {recommendedArticles.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: currentSlide === index ? '#007AFF' : '#D0D0D0',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'background 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Latest Articles Section */}
            <div style={{
                background: 'white',
                padding: '20px 16px',
                marginTop: '8px'
            }}>
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#FF9500',
                    margin: '0 0 16px 0'
                }}>
                    最新記事
                </h2>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    {latestArticles.map((article) => (
                        <div
                            key={article.id}
                            onClick={() => onNavigateToDetail && onNavigateToDetail(article)}
                            onMouseEnter={() => setHoveredCard(`latest-${article.id}`)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                background: '#F8F8F8',
                                borderRadius: '8px',
                                padding: '12px',
                                cursor: 'pointer',
                                transform: hoveredCard === `latest-${article.id}` ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: hoveredCard === `latest-${article.id}` ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {/* Category Tags */}
                            <div style={{
                                display: 'flex',
                                gap: '6px',
                                marginBottom: '10px'
                            }}>
                                {article.categories.map((cat, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            display: 'inline-block',
                                            padding: '4px 10px',
                                            background: cat === '新着記事' ? '#E3F2FD' : '#1976D2',
                                            color: cat === '新着記事' ? '#1976D2' : 'white',
                                            fontSize: '10px',
                                            borderRadius: '4px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>

                            {/* Image */}
                            <img
                                src={article.image}
                                alt={article.title}
                                style={{
                                    width: '100%',
                                    height: '160px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '12px'
                                }}
                            />

                            {/* Content */}
                            <div>
                                <div style={{
                                    fontSize: '13px',
                                    color: '#333',
                                    fontWeight: '600',
                                    marginBottom: '6px'
                                }}>
                                    {article.author}
                                </div>
                                <h3 style={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    color: '#007AFF',
                                    margin: '0 0 8px 0',
                                    lineHeight: '1.4'
                                }}>
                                    {article.title}
                                </h3>
                                <p style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    {article.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                padding: '24px 16px',
                background: 'white',
                marginTop: '8px'
            }}>
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'transparent',
                        color: '#007AFF',
                        fontSize: '18px',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        opacity: currentPage === 1 ? 0.3 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    ‹
                </button>

                {/* Page Numbers */}
                {getPaginationNumbers().map((page, index) => (
                    page === '...' ? (
                        <span 
                            key={`ellipsis-${index}`}
                            style={{ 
                                color: '#999', 
                                fontSize: '14px', 
                                padding: '0 4px' 
                            }}
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: 'none',
                                background: currentPage === page ? '#007AFF' : 'white',
                                color: currentPage === page ? 'white' : '#007AFF',
                                fontSize: '14px',
                                fontWeight: currentPage === page ? 'bold' : 'normal',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {page}
                        </button>
                    )
                ))}

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'transparent',
                        color: '#007AFF',
                        fontSize: '18px',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        opacity: currentPage === totalPages ? 0.3 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    ›
                </button>
            </div>

            {/* CTA Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)',
                padding: '32px 20px',
                textAlign: 'center',
                color: 'white',
                marginTop: '8px'
            }}>
                <p style={{
                    fontSize: '14px',
                    margin: '0 0 8px 0',
                    fontWeight: '500',
                    lineHeight: '1.5'
                }}>
                    自分にピッタリの
                </p>
                <p style={{
                    fontSize: '14px',
                    margin: '0 0 16px 0',
                    fontWeight: '500',
                    lineHeight: '1.5'
                }}>
                    エージェントを探したい方はこちら
                </p>
                <img
                    src="/logo-white.png"
                    alt="AGENT PICK"
                    style={{
                        height: '28px',
                        objectFit: 'contain',
                        marginBottom: '16px'
                    }}
                />
                <button
                    style={{
                        width: '100%',
                        maxWidth: '280px',
                        background: '#FF9500',
                        color: 'white',
                        border: 'none',
                        padding: '14px 24px',
                        borderRadius: '25px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                >
                    エージェントをピックする
                </button>
            </div>

            {/* Footer Links */}
            <div style={{
                background: 'white',
                padding: '24px 20px',
                marginTop: '8px'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    marginBottom: '20px'
                }}>
                    <a href="#" style={{
                        color: '#666',
                        fontSize: '13px',
                        textDecoration: 'none'
                    }}>
                        プライバシーポリシー
                    </a>
                    <a href="#" style={{
                        color: '#666',
                        fontSize: '13px',
                        textDecoration: 'none'
                    }}>
                        利用規約
                    </a>
                    <a href="#" style={{
                        color: '#666',
                        fontSize: '13px',
                        textDecoration: 'none'
                    }}>
                        運営会社
                    </a>
                    <a href="#" style={{
                        color: '#666',
                        fontSize: '13px',
                        textDecoration: 'none'
                    }}>
                        お問い合わせ
                    </a>
                </div>
                <p style={{
                    fontSize: '11px',
                    color: '#999',
                    margin: 0,
                    textAlign: 'left'
                }}>
                    AGENT PICK. ALL RIGHTS RESERVED.
                </p>
            </div>
        </div>
    );
};

export default FeaturedArticlesPage;

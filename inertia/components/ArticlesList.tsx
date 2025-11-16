import NewsArticle from '#models/news_article';
import React from 'react';

interface ArticlesListProps {
  articles: NewsArticle[];
  selectedArticle: NewsArticle | null;
  onArticleSelect: (article: NewsArticle) => void;
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles, selectedArticle, onArticleSelect }) => {
  const getCompletedCount = (article: NewsArticle) => {
    return article.tasks?.filter(task => task.completed).length || 0;
  };

  const getTotalCount = (article: NewsArticle) => {
    return article.tasks?.length || 0;
  };

  return (
    <div className="w-96 bg-surface border-r border-border flex flex-col">
      <h2 className="p-6 text-lg font-semibold border-b border-border text-text-primary">
        News Articles
      </h2>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {articles.map((article) => {
          const completedCount = getCompletedCount(article);
          const totalCount = getTotalCount(article);
          const isActive = selectedArticle?.id === article.id;

          return (
            <div
              key={article.id}
              onClick={() => onArticleSelect(article)}
              className={`
                p-4 mb-3 bg-background rounded-lg cursor-pointer
                transition-all duration-200 border
                ${isActive
                  ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10'
                  : 'border-transparent hover:border-primary hover:translate-x-1'
                }
              `}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded font-semibold uppercase">
                  category
                </span>
                <span className="text-xs text-text-secondary">
                  {article.date?.toFormat('yyyy LLL dd')}
                </span>
              </div>
              <h3 className="text-sm font-medium leading-snug text-text-primary">
                {article.title}
              </h3>
              {totalCount > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                      style={{ width: `${(completedCount / totalCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-secondary">
                    {completedCount}/{totalCount}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticlesList;

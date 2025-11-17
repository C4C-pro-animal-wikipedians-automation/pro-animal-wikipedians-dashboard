import NewsArticle from "#models/news_article";
import { useCallback, useMemo, useState } from "react";
import ArticlesList from "../components/ArticlesList.js";
import TasksPanel from "../components/TasksPanel.js";
import Task from "#models/task";
import axios from 'axios';
import { router } from "@inertiajs/react";

const Tasks: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle['id'] | null>(null);
  const article = useMemo(() => articles.find((article) => article.id === selectedArticle) ?? null, [articles, selectedArticle])
  const switchTaskCompletion = useCallback(async (taskId: Task['id']) => {
    await axios.post(`/task/${taskId}/complete`);
    router.reload();
  }, []);
  return (
    <div className="flex h-screen max-w-7xl mx-auto">
      <ArticlesList
        articles={articles}
        selectedArticle={article}
        onArticleSelect={(newArticle: NewsArticle) => setSelectedArticle(newArticle.id)}
      />
      <TasksPanel
        selectedArticle={article}
        onTaskToggle={switchTaskCompletion}
      />
    </div>
  );
};

export default Tasks;

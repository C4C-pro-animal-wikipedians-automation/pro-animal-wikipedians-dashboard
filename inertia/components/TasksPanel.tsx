import NewsArticle from '#models/news_article';
import React, { useState, useEffect } from 'react';

interface TasksPanelProps {
  selectedArticle: NewsArticle | null;
  onTaskToggle: (taskId: number) => void;
}

const TasksPanel: React.FC<TasksPanelProps> = ({ selectedArticle, onTaskToggle }) => {
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());

  useEffect(() => {
    setExpandedTasks(new Set());
  }, [selectedArticle?.id]);

  const toggleTaskExpansion = (taskId: number) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  if (!selectedArticle) {
    return (
      <div className="flex-1 bg-background flex items-center justify-center">
        <p className="text-text-secondary">Select an article to view tasks</p>
      </div>
    );
  }

  const completedCount = selectedArticle.tasks?.filter(task => task.completed).length || 0;
  const totalCount = selectedArticle.tasks?.length || 0;

  return (
    <div className="flex-1 bg-background flex flex-col">
      <div className="p-6 bg-surface border-b border-border">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-text-primary leading-tight">
            {selectedArticle.title}
          </h3>
          { selectedArticle.source && <a className="text-blue-500 text-underline" href={selectedArticle.source} target="_blank">{selectedArticle.source}</a> }
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              {selectedArticle.date?.toFormat('yyyy LLL dd')}
            </span>
            <span className="text-sm text-text-secondary">
              {completedCount} of {totalCount} completed
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3 custom-scrollbar">
        {selectedArticle.tasks && [...selectedArticle.tasks].sort((a, b) => {
          if (a.completed && !b.completed) return 1;
          if (!a.completed && b.completed) return -1;
          return 0;
        }).map((task) => {
          const isExpanded = expandedTasks.has(task.id);
          const hasDescription = task.description && task.description.trim().length > 0;

          return (
            <div
              key={task.id}
              className={`
                bg-surface rounded-lg border border-border
                transition-all duration-200 hover:border-secondary
                ${task.completed ? 'opacity-60 bg-surface/50' : ''}
              `}
            >
              <div className="flex items-center gap-4 p-4">
                <button
                  onClick={() => onTaskToggle(task.id)}
                  className={`
                    w-6 h-6 border-2 rounded-md flex items-center justify-center
                    transition-all duration-200 flex-shrink-0
                    ${task.completed
                      ? 'bg-primary border-primary hover:bg-accent hover:border-accent animate-check-pulse'
                      : 'border-primary hover:border-accent hover:bg-primary/10 hover:scale-110'
                    }
                    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
                  `}
                  aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {task.completed && (
                    <svg
                      className="w-4 h-4 text-background animate-checkmark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>

                <span className={`
                  flex-1 text-sm text-text-primary transition-all duration-200 select-none
                  ${task.completed ? 'line-through text-text-secondary' : ''}
                `}>
                  {task.task}
                </span>

                {hasDescription && (
                  <button
                    onClick={() => toggleTaskExpansion(task.id)}
                    className="flex-shrink-0 p-1 text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded"
                    aria-label={isExpanded ? 'Collapse task details' : 'Expand task details'}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {hasDescription && isExpanded && (
                <div className="flex flex-col gap-3">
                { task.wikipedia_url && <a href={task.wikipedia_url} target="_blank" className="text-blue-500">{task.wikipedia_url}</a> }
                <div className="px-4 pb-4 border-t border-border/50 mt-2 pt-3">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {task.description}
                  </p>
                </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TasksPanel;

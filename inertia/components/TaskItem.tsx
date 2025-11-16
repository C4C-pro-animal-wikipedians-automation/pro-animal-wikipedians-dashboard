import Task from '#models/task';
import React from 'react';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button
        className={`task-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={onToggle}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        type="button"
      >
        {task.completed && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </button>
      <span className="task-title">{task.task}</span>
    </div>
  );
};

export default TaskItem;

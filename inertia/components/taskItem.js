export function createTaskItem(task) {
  return `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
      <div class="task-checkbox ${task.completed ? 'checked' : ''}"></div>
      <div class="task-content">
        <h4>${task.title}</h4>
        <p>${task.description}</p>
      </div>
      <div class="task-meta">
        <span class="task-deadline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </span>
      </div>
    </div>
  `;
}

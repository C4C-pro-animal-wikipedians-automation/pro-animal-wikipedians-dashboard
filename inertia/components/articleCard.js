export function createArticleCard(article) {
  return `
    <div class="article-card" data-article-id="${article.id}">
      <div class="article-card-header">
        <span class="article-date">${article.date.toFormat('yyyy LLL dd')}</span>
      </div>
      <h3>${article.title}</h3>
      <p>${article.description}</p>
    </div>
  `;
}

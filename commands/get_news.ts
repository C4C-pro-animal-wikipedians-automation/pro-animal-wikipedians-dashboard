import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import env from '#start/env'
import axios from 'axios'
import NewsArticle from '#models/news_article'

interface Exaresult {
  results: { title: string; url: string; publishedDate: string; text: string; author?: string }[]
}

export default class GetNews extends BaseCommand {
  static commandName = 'get:news'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  private async searchAnimalAdvocacyArticles() {
    try {
      const response = await axios.post<Exaresult>(
        'https://api.exa.ai/search',
        {
          query: 'latest animal advocacy news and developments',
          type: 'auto',
          numResults: 10,
          category: 'news',
          // Get articles from the last 6 months
          startPublishedDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
          endPublishedDate: new Date().toISOString(),
          excludeText: ['overview'],
          contents: {
            text: true, // Get full text of articles
            summary: {
              query: 'Key developments in animal advocacy',
            },
            highlights: {
              numSentences: 2,
              highlightsPerUrl: 3,
              query: 'animal advocacy initiatives',
            },
          },
        },
        {
          headers: {
            'x-api-key': env.get('EXA_API_KEY'),
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (error) {
      console.error('Error fetching articles:', error.response?.data || error.message)
      throw error
    }
  }

  async run() {
    const { results } = await this.searchAnimalAdvocacyArticles()
    for (const article of results) {
      const existingArticle = await NewsArticle.query().where('source', article.url)
      console.log('Found article ' + article.title);
      if (existingArticle.length > 0) {
        continue
      }
      await NewsArticle.create({
        title: article.title,
        text: article.text,
        source: article.url,
      })
    }
  }
}

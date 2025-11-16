import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import NewsArticle from './news_article.js';
import { type BelongsTo } from '@adonisjs/lucid/types/relations';

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare task: string;

  @column()
  declare description: string | null;

  @column()
  declare news_article_id: number;

  @column()
  declare completed: boolean;

  @belongsTo(() => NewsArticle, {
    foreignKey: 'news_article_id'
  })
  declare newsArticle: BelongsTo<typeof NewsArticle>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

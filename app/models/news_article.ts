import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Task from './task.js'
import { type HasMany } from '@adonisjs/lucid/types/relations'

export default class NewsArticle extends BaseModel {
  protected tableName = 'news_articles'

  public static $with = ['posts']
  public static with = ['posts']

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare source: string | null

  @column()
  declare text: string

  @hasMany(() => Task, {
    foreignKey: 'news_article_id',
  })
  declare tasks: HasMany<typeof Task>

  @column()
  declare date: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

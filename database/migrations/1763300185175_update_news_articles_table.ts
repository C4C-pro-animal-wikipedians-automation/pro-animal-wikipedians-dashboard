import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'update_news_articles'

  async up() {
    this.schema.table('news_articles', (table) => {
      table.date('date').nullable()
    })
  }

  async down() {
    this.schema.table('news_articles', (table) => {
      table.dropColumn('date')
    })
  }
}

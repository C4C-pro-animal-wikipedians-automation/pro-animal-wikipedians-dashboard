import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'update_tasks'

  async up() {
    this.schema.table('tasks', (table) => {
      table.string('wikipedia_url').nullable();
    });
  }

  async down() {
    this.schema.table('tasks', (table) => {
      table.dropColumn('wikipedia_url');
    });
  }
}

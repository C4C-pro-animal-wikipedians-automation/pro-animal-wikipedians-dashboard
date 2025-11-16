import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'update_tasks'

  async up() {
    this.schema.table('tasks', (table) => {
      table.boolean('completed').defaultTo(false);
    });
  }

  async down() {
    this.schema.table('tasks', (table) => {
      table.dropColumn('completed');
    });
  }
}

import NewsArticle from '#models/news_article'
import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  public async show({ inertia }: HttpContext) {
    const articles = await NewsArticle.query().has('tasks', '>', 0).preload('tasks')
    return inertia.render('tasks', { articles })
  }

  public async markCompleted({ request, response }: HttpContext) {
    const taskId = request.param('id')
    const task = await Task.find(taskId)
    if (!task) return
    task.completed = true
    task.save()
    return response.json({ success: true })
  }
}

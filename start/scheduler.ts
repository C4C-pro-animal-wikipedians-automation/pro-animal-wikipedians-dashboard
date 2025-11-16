
import scheduler from 'adonisjs-scheduler/services/main'

scheduler.command('get:news').everyTenMinutes()
scheduler.command('process:news').everyTenMinutes()

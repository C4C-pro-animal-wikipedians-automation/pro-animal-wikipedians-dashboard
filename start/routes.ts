/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import TasksController from '#controllers/tasks_controller';
import router from '@adonisjs/core/services/router'

router.get('/', [TasksController, 'show']);
router.post('/task/:id/complete', [TasksController, 'markCompleted']);


const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', taskController.getAllTasks);         // GET /api/tasks — получение всех задач (JSON для AJAX)
router.post('/', taskController.createTask);         // POST /api/tasks — добавление новой задачи
router.put('/:id', taskController.updateTask);       // PUT /api/tasks/:id — обновление
router.delete('/:id', taskController.deleteTask);    // DELETE /api/tasks/:id — удаление

module.exports = router;

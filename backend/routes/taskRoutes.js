const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); 
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/tasks', taskController.getAllTasks);         // GET /tasks — получение всех задач
router.post('/tasks', taskController.createTask);         // POST /tasks — добавление новой задачи
router.put('/tasks/:id', taskController.updateTask);      // PUT /tasks/:id
router.delete('/tasks/:id', taskController.deleteTask);   // DELETE /tasks/:id


module.exports = router;
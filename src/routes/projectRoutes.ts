import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleImputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";
import { taskBelongsToProjects, validateExistsTasks } from "../middleware/task";
import { authenticate } from "../middleware/auth";

const router = Router()

router.use(authenticate)
router.post('/',
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es Obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
  body('description')
    .notEmpty().withMessage('El nombre de la descripcion es Obligatorio'),
  handleImputErrors,
  ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleImputErrors,
  ProjectController.getProjectById
)

router.put('/:id',
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es Obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
  body('description')
    .notEmpty().withMessage('El nombre de la descripcion es Obligatorio'),
  param('id').isMongoId().withMessage('ID no válido'),
  handleImputErrors,
  ProjectController.updateProject
)
router.delete('/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleImputErrors,
  ProjectController.deleteProject
)

/* Routes for Tasks*/

router.post('/:projectId/tasks',
  param('projectId').isMongoId().withMessage('ID no Válido'),
  body('name')
    .notEmpty().withMessage('El nombre del tarea es Obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripcion de la tarea es Obligatoria'),
  handleImputErrors,
  validateProjectExists,
  TaskController.createTask
)

router.get('/:projectId/tasks',
  param('projectId').isMongoId().withMessage('ID no Válido'),
  validateProjectExists,
  TaskController.getProjectTask
)


router.get('/:projectId/tasks/:taskId',
  param('projectId').isMongoId().withMessage('ID no Válido'),
  param('taskId').isMongoId().withMessage('ID no Válido'),
  handleImputErrors,
  validateProjectExists,
  validateExistsTasks,
  taskBelongsToProjects,
  TaskController.getProjectTaskById
)
router.put('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no Válido'),
  body('name')
    .notEmpty().withMessage('El nombre del tarea es Obligatorio'),
  body('description')
    .notEmpty().withMessage('La descripcion de la tarea es Obligatoria'),
  handleImputErrors,
  validateProjectExists,
  validateExistsTasks,
  taskBelongsToProjects,
  TaskController.updateTask
)
router.delete('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no Válido'),
  handleImputErrors,
  validateProjectExists,
  validateExistsTasks,
  taskBelongsToProjects,
  TaskController.getProjectTaskByIdDelete
)
router.patch('/:projectId/tasks/:taskId/status',
  param('taskId').isMongoId().withMessage('ID no Válido'),
  body('status').notEmpty().withMessage('El estado es obligatorio'),
  handleImputErrors,
  validateProjectExists,
  validateExistsTasks,
  taskBelongsToProjects,
  TaskController.updateStatus
)
export default router

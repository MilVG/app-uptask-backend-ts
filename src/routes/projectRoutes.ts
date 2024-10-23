import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleImputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router()

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

export default router

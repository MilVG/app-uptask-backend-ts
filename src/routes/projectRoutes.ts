import { Router } from "express";
import { body } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleImputErrors } from "../middleware/validation";

const router = Router()

router.post('/',
  body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es Obligatorio'),
  body('clientName')
    .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
  body('description')
    .notEmpty().withMessage('El nombre de la descripcion es Obligatorio'),
  handleImputErrors,
  ProjectController.createProject)
router.get('/',ProjectController.getAllProjects)

export default router

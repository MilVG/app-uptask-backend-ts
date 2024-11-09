
import { Request, Response, NextFunction } from "express"
import Task, { ITask } from '../models/Task';

declare global {
  namespace Express {
    interface Request {
      task: ITask
    }
  }
}
export const validateExistsTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params
    const task = await Task.findById(taskId)
    if (!task) {
      const error = new Error('Tarea no Encontrado')
      res.status(404).json({ error: error.message })
      return
    }
    req.task = task
    next()
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error' })

  }
}
export const taskBelongsToProjects = async (req: Request, res: Response, next: NextFunction) => {
  if (req.task.project.toString() !== req.project.id) {
    const error = new Error('Acción no válida')
    res.status(404).json({ error: error.message })
    return
  }
  next()
}
export const hasAuthorization = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id.toString() !== req.project.manager.toString()) {
    const error = new Error('Acción no válida')
    res.status(404).json({ error: error.message })
    return
  }
  next()
}

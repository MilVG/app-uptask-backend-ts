import type { Request, Response } from 'express'
import Task from '../models/Task'
export class TaskController {
  static createTask = async (req: Request, res: Response) => {

    try {
      const task = new Task(req.body)
      task.project = req.project.id
      req.project.tasks.push(task.id)
      await Promise.allSettled([task.save(), req.project.save()])
      res.json({ msg: 'Tarea Creada Correctamente' })
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })

    }
  }
  static getProjectTask = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate('project')
      res.json(tasks)
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static getProjectTaskById = async (req: Request, res: Response) => {

    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)
      if (!task) {
        const error = new Error('Tarea no encontrada')
        res.status(404).json({ error: error.message })
        return
      }
      if (task.project.toString() !== req.project.id) {
        const error = new Error('Acción no válida')
        res.status(404).json({ error: error.message })
        return
      }

      res.json(task)
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
      return
    }
  }
  static updateTask = async (req: Request, res: Response) => {

    try {
      const { taskId } = req.params
      const task = await Task.findByIdAndUpdate(taskId, req.body)
      if (!task) {
        const error = new Error('Tarea no encontrada')
        res.status(404).json({ error: error.message })
        return
      }
      if (task.project.toString() !== req.project.id) {
        const error = new Error('Acción no válida')
        res.status(404).json({ error: error.message })
        return
      }

      res.json({ msg: 'Tarea actulizada correctamente' })
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
      return
    }
  }
}

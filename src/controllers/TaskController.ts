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
      const task = await Task.findById(req.task.id).populate({ path: 'completedBy.user', select: 'name email _id' })
      res.json(task)
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
      return
    }
  }
  static updateTask = async (req: Request, res: Response) => {

    try {
      req.task.name = req.body.name
      req.task.description = req.body.description
      await req.task.save()
      res.json({ msg: 'Tarea actualizada correctamente' })
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
      return
    }
  }

  static getProjectTaskByIdDelete = async (req: Request, res: Response) => {

    try {
      req.project.tasks = req.project.tasks.filter(task => task._id.toString() !== req.task.id.toString())
      await req.task.deleteOne()
      await req.project.save()
      res.json({ msg: 'Tarea Eliminada correctamente' })
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
      return
    }
  }

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body
      req.task.status = status

      const data = {
        user: req.user.id,
        status
      }
      req.task.completedBy.push(data)
      await req.task.save()
      res.json({ msg: 'Status Tarea actualizada' })

    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
}

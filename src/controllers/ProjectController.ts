import type { Response, Request } from "express"
import Project from "../models/Project"

export class ProjectController {

  static createProject = async (req: Request, res: Response) => {

    const project = new Project(req.body)

    project.manager = req.user.id
    try {
      await project.save()
      res.json({ msg: 'Proyecto Creado correctamente' })
    } catch (error) {
      console.log(error);

    }
  }

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        $or: [
          { manager: { $in: req.user.id } },
          { team: { $in: req.user.id } }
        ]
      })
      res.json(projects)
    } catch (error) {
      console.log(error);

    }

  }
  static getProjectById = async (req: Request, res: Response) => {

    const { id } = req.params
    try {
      const project = await Project.findById(id).populate('tasks')

      if (!project) {
        const error = new Error('Proyecto no Encontrado')
        res.status(404).json({ error: error.message })
        return
      }
      //Autorizacion jwt projecto especifico manager
      if (project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)) {
        const error = new Error('Acción no válida')
        res.status(404).json({ error: error.message })
      }
      res.json(project)
    } catch (error) {
      console.log(error);

    }

  }
  static updateProject = async (req: Request, res: Response) => {

    const { id } = req.params
    try {

      const project = await Project.findByIdAndUpdate(id, req.body)

      if (!project) {
        const error = new Error('Proyecto no Encontrado')
        res.status(404).json({ error: error.message })
        return
      }
      //Autorizacion jwt projecto para ctulizar solo el manager
      if (project.manager.toString() !== req.user.id.toString()) {
        const error = new Error('Solo el Manager puede actulizar un Proyecto')
        res.status(404).json({ error: error.message })
      }
      await project.save()
      res.json({ msg: 'proyecto actualizado' })
    } catch (error) {
      console.log(error);

    }

  }
  static deleteProject = async (req: Request, res: Response) => {

    const { id } = req.params
    try {
      const project = await Project.findById(id)

      if (!project) {
        const error = new Error('Proyecto no Encontrado')
        res.status(404).json({ error: error.message })
        return
      }
      //Autorizacion jwt solo el manager puede eliminar un projecto
      if (project.manager.toString() !== req.user.id.toString()) {
        const error = new Error('Solo el Manager puede eliminar un proyecto')
        res.status(404).json({ error: error.message })
      }

      await project.deleteOne()
      res.json({ msg: 'proyecto Eliminado' })
    } catch (error) {
      console.log(error);

    }

  }

}

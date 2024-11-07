import type { Request, Response } from "express"
import User from "../models/User"
import Project from "../models/Project";
export class TeamMemberController {
  static findMemberByEmail = async (req: Request, res: Response) => {

    const { email } = req.body

    //Find user
    const user = await User.findOne({ email }).select('_id email name')
    if (!user) {
      const error = new Error('Usuario No Encontrado')
      res.status(404).json({ error: error.message })
      return
    }
    res.json({ user: user })
  };

  static getProjectTeam = async (req: Request, res: Response) => {

    const project = await Project.findById(req.project._id).populate({
      path: 'team',
      select: 'id email name'
    })
    res.json(project.team)
  };
  static AddMemberById = async (req: Request, res: Response) => {

    const { id } = req.body
    const user = await User.findById(id).select('_id')
    if (!user) {
      const error = new Error('Usuario No Encontrado')
      res.status(404).json({ error: error.message })
      return
    }

    if (req.project.team.some(team => team.toString() === user.id.toString())) {
      const error = new Error('Usuario ya existe en el Proyecto')
      res.status(409).json({ error: error.message })
      return

    }
    req.project.team.push(user.id)
    await req.project.save()

    res.json('usuario agregado correctamente')
  };
  static RemoveMemberById = async (req: Request, res: Response) => {
    const { id } = req.body

    if (!req.project.team.some(team => team.toString() === id)) {
      const error = new Error('El Usuario no existe en el Proyecto')
      res.status(409).json({ error: error.message })
      return

    }
    req.project.team = req.project.team.filter(teamMember => teamMember.toString() !== id)

    await req.project.save()
    res.json({ msg: 'Usuario Eliminado correctamente' })
  }
}

import type { Request, Response } from "express"
import User from "../models/User"
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
}

import type { Response,Request } from "express"

export class ProjectController {
  static getAllProjects = async (req: Request, res:Response) => {
      res.json({msg:'hola'})
  }
}

import type { Request, Response } from "express"
import User from "../models/User"
import { hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import Token from "../models/Token"
import { AuthEmail } from "../emails/AuthEmail"
export class AuthController {

  static createAccount = async (req: Request, res: Response): Promise<void> => {
    try {

      const { password, email } = req.body

      //Prevenir usuarios duplicados
      const userExists = await User.findOne({ email })
      if (userExists) {
        const error = new Error('El Usuario ya está registrado')
        res.status(409).json({ error: error.message })
        return
      }

      //Crear Usuario
      const user = new User(req.body)

      //Hash Paswword
      user.password = await hashPassword(password)

      //Generar Token

      const token = new Token()
      token.token = generateToken()
      token.user = user.id

      //enviar email
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token
      })
      await Promise.allSettled([user.save(), token.save()])
      res.json({
        msg:'usuario Creado Correctamente',
        user:user
      })

    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
  static confirmAccount = async (req: Request, res: Response) => {
    try {

      const {token} = req.body
      
      const tokenExists = await Token.findOne({token})
      if (!tokenExists) {
        const error = new Error('token no válido')
        res.status(401).json({error:error.message})
        return
      }
      res.send('el token valido')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
}

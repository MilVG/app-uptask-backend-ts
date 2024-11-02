import type { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import Token from "../models/Token";
import { AuthEmail } from "../emails/AuthEmail";
export class AuthController {
  static createAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const { password, email } = req.body;

      //Prevenir usuarios duplicados
      const userExists = await User.findOne({ email });
      if (userExists) {
        const error = new Error("El Usuario ya está registrado");
        res.status(409).json({ error: error.message });
        return;
      }

      //Crear Usuario
      const user = new User(req.body);

      //Hash Paswword
      user.password = await hashPassword(password);

      //Generar Token

      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      //enviar email
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });
      await Promise.allSettled([user.save(), token.save()]);
      res.json({
        msg: "usuario Creado Correctamente",
        user: user,
      });
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("token no válido");
        res.status(404).json({ error: error.message });
        return;
      }
      const user = await User.findById(tokenExists.user);
      user.confirmed = true;

      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
      res.json({ msg: "Cuenta confirmada Correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("Usuario no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }
      if (!user.confirmed) {
        const token = new Token();
        token.user = user.id;
        token.token = generateToken();
        await token.save();

        //enviar email
        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        });
        const error = new Error(
          "La Cuenta no ha sido Confirmada, hemos enviado un e-mail de confirmacion",
        );
        res.status(404).json({ error: error.message });
        return;
      }

      //Revisar password
      const isPasswordCorrect = await checkPassword(password, user.password);
      if (!isPasswordCorrect) {
        const error = new Error("Password Incorrecto");
        res.status(404).json({ error: error.message });
        return;
      }
      res.send("Autenticando...");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}

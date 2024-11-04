import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleImputErrors } from "../middleware/validation";

const router = Router()


router.post('/create-account',
  body('name')
    .notEmpty().withMessage('El nombre no puede ir vacio'),
  body('password')
    .isLength({ min: 8 }).withMessage('El password es muy corto, min 8 caracteres'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Los Passoword no son iguales')
    }
    return true
  }),
  body('email')
    .isEmail().withMessage('E-mail no válido'),
  handleImputErrors,
  AuthController.createAccount
)
router.post('/confirm-account',
  body('token')
    .notEmpty().withMessage('El token no puede ir vacio'),
  handleImputErrors,
  AuthController.confirmAccount
)
router.post('/login',
  body('email')
    .isEmail().withMessage('E-mail no válido'),
  body('password')
    .notEmpty().withMessage('El password no puede ir vacio'),
  handleImputErrors,
  AuthController.login
)
router.post('/request-code',
  body('email')
    .isEmail().withMessage('E-mail no válido'),
  handleImputErrors,
  AuthController.requestConfirmationCode
)
router.post('/forgot-password',
  body('email')
    .isEmail().withMessage('E-mail no válido'),
  handleImputErrors,
  AuthController.forgotPassword
)

router.post('/validate-token',
  body('token')
    .isEmail().withMessage('El token no puede ir vacio'),
  handleImputErrors,
  AuthController.validateToken
)
export default router

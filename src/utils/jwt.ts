import jwt from 'jsonwebtoken'

export const generateJWT = () => {
  const data = {
    name: 'juan',
    credit_card: '121312123212',
    password: 'password'
  }
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '6m'
  })
  return token
}

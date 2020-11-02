// generate token
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    // expires optional 30 days
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
export default generateToken

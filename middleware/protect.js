import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protect = async (req, res, next) => {
  let token = req.headers.token

  if(!token) {
    return res.status(401).json({
      title: 'Not authorised to access this route'
    })
  }
  
  try {
    const decoded = jwt.verify(token, 'secret_key')

    const user = await User.findById(decoded.id)

    if(!user) {
      return res.status(404).json({
        title: 'User not found'
      })
    }

    req.user = user
    next()

  } catch (err) {
    return next(res.status(401).json({
      title: 'Not authorised to access this route'
    }))
  }
}

export default protect

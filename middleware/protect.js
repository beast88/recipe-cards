import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protect = async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if(!token) {
    res.status(401).json({
      title: 'You are not authorized to use this route'
    })
  }

  try {
    const decoded = jwt.verify(token, 'secret_key')

    const user = await User.findById(decoded.id)

    if(!user) {
      res.status(404).json({
        title: 'User not found'
      })
    }

    req.user = user
    next()
    
  } catch (err) {
    res.status(401).json({
      title: 'Not authorised',
      error: err
    })
    
  }
}

export default protect

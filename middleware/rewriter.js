const rewriter = (req, res, next) => {
  req.body.img = req.file.image

  next()
}

export default rewriter

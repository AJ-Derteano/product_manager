const handleHttpResponse = (res, data, message = 'Success', code = 200) => {
  res.status(code)
  res.send({
    message,
    data
  })
}

module.exports = handleHttpResponse
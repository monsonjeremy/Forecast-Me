export const controllerHandler = (promise, params) => async (req, res) => {
  const boundParams = params ? params(req, res) : []
  try {
    const result = await promise(...boundParams)
    return res.json(result)
  } catch (error) {
    res.status(error.statusCode || 500)
    res.write(`Error Message: ${error.message}. `)
    res.write(`Stack Trace: ${error.stack}`)
    return res.end()
  }
}

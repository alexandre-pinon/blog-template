const runExpressMiddleware = (req: any, res: any, middleware: any) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default runExpressMiddleware

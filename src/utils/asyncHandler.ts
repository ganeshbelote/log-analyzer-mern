import { Request, Response, NextFunction, RequestHandler } from 'express'

type AsyncRequestHandlerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response | void>

const asyncHandler = (
  requestHandler: AsyncRequestHandlerType
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(requestHandler(req, res, next)).catch(err => next(err))
}

export default asyncHandler

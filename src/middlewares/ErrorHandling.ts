import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../helpers/apiError'

export async function errorHandling(
  error: Error & ApiError,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Erro interno do servidor'
  console.log(error)

  return response.json({ message, statusCode })
}
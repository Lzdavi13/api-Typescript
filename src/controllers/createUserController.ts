import { Request, Response } from 'express'
import { CreateUserSevice } from '../useCases/createUser/CreateUserServices'

export class CreateUserController {
  constructor(private createUserSevice: CreateUserSevice) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    console.log(this.createUserSevice)
    try {
      const user = await this.createUserSevice.execute({
        name,
        email,
        password,
      })

      return response.status(201).json({ ...user })
    } catch (error: any) {
      return response.status(500).json({ mensagem: error.message })
    }
  }
}
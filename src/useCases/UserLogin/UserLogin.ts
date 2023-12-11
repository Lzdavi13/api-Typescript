import { IUsersRepository } from '@/repositories/IUsersRepositories'
import { sign } from '@/services/JwtServices'

interface IUserLogin {
  user: {
    id: number
    name: string
    email: string
    password: string
  }
  token: string
}

export class UserLogin {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(email: string, password: string): Promise<IUserLogin> {
    const user = await this.usersRepository.getUserByEmail(email)

    if (!user) {
      throw new Error('Usuario não encontrado')
    }

    if (user.password !== password) {
      throw new Error('Senha incorreta')
    }

    const jwtToken = sign(user.id)

    return { user, token: jwtToken }
  }
}
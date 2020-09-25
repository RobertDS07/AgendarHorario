import bcrypt from 'bcryptjs'
import createToken from './CreateJwt'

import {User} from '../../models/User'
import {Iregister} from './register'

export type Tlogin = Pick<Iregister, 'senha' | 'whatsapp'>

export const loginController = async({whatsapp, senha}: Tlogin) => {
    const user = await User.findOne({whatsapp}).select('+senha')

    if (!user || ! await bcrypt.compare(senha, user.senha)) return new Error('Credenciais invalidas')

    user.senha = 'undefined'

    const token = createToken(user)

    return token
}
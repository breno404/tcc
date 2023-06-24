import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserService from '../services/user.service';
import { Request, Response } from 'express';


class AuthController {

    private static comparePasswords = async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    };

    static async loginUser(email, password) {
        const SECRET = 'tcc2023'
        const service = new UserService();
        const user = await service.findUserByEmail(email);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const isPasswordValid = await AuthController.comparePasswords(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Senha incorreta');
        }

        const token = jwt.sign({ userId: user.id }, SECRET, {
            expiresIn: '1h',
        });

        return { token };
    }

    static async AuthenticateUser(req: Request, res: Response) {
        const { email, password } = req.body
        try {
            const token = await AuthController.loginUser(email, password)

            res.json({token})
        }   
        catch (err) {
            res.json({ err })
        }
    }
}

export default AuthController
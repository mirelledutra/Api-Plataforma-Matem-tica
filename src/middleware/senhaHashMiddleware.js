import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config()

// valiidar se o id é válido
class senhaHashMiddleware {
    // busar o usuario pelo id
    static async criptogafar(senha) {
        let senhaHash = bcrypt.hashSync(senha, 8); // criptografar a senha
        return senhaHash;
    }
}
export default senhaHashMiddleware;

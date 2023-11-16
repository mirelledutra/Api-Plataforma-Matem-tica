// PasswordController.js
import User from "../models/User"; // Importe o modelo de usuário (ou onde você armazena informações de usuário)
import bcrypt from "bcrypt"; // Para manipular senhas criptografadas
import crypto from "crypto"; // Para gerar tokens seguros
import { sendPasswordResetEmail } from "../utils/email"; // Utilitário para enviar e-mails de redefinição de senha

const PasswordController = {
  // Rota para solicitar redefinição de senha
  resetPasswordRequest: async (req, res) => {
    try {
      const { email } = req.body;

      // Verifique se o e-mail existe no banco de dados
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "E-mail não encontrado." });
      }

      // Crie um token seguro para a redefinição de senha
      const token = crypto.randomBytes(20).toString("hex");

      const senhaHash = await senhaHashMiddleware.criptografar(user.password);
      // Defina o token e a data de expiração no usuário
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // Token válido por 1 hora

      // Salve as alterações no banco de dados
      await user.save();

      // Envie um e-mail com o link de redefinição de senha
      await sendPasswordResetEmail(user.email, token);

      return res.status(200).json({ message: "E-mail de redefinição de senha enviado." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  // Rota para definir uma nova senha
  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;

      // Verifique se o token é válido e não expirou
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: "Token inválido ou expirado." });
      }

      // Defina a nova senha para o usuário
      user.password = await bcrypt.hash(password, 10); // Criptografe a senha
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      // Salve as alterações no banco de dados
      await user.save();

      return res.status(200).json({ message: "Senha redefinida com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};

export default PasswordController;

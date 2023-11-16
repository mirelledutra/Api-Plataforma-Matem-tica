import express from "express";
import AlterarSenhaController from "../controllers/AlterarSenhaController";
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router();


/**
 * @swagger
 * paths:
 *  /alterarsenha:
 *    post:
 *      tags:
 *          - Alterar Senha
 *      summary: Rota para alteração de senha do usuário
 *      parameters:
 *        - in: query
 *          name: token
 *          description: Token único encaminhado por e-mail
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/login_token_altera_senha'
 *      responses:
 *        '200':
 *          description: Senha alterada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/login_token_altera_senha'
*/


router
  .post("/alterarsenha", AlterarSenhaController.alterarsenha)


export default router;
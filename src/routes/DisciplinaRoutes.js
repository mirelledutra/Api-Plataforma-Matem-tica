import express from "express";
import DisciplinaController from "../controllers/DisciplinaController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js"

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /disciplinas:
 *    post:
 *      tags:
 *        - Disciplinas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por criar uma Disciplina no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nome:
 *                  type: string
 *                  example: Matemática
 *                descricao:
 *                  type: string
 *                  example: "Neste curso ensinaremos conceitos matemáticos."
 *                codigo:
 *                  type: string
 *                  example: MATH101
 *                cargaHoraria:
 *                  type: integer
 *                  example: 60
 *                professor:
 *                  type: string
 *                  example: "Prof. Silva"
 *      responses:
 *        201:
 *          description: Disciplina cadastrada com sucesso
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *        422:
 *          description: Erro ao cadastrar a Disciplina
 *        498:
 *          description: Erros de Token
 *        500:
 *          description: Erro interno do servidor
 *    get:
 *      tags:
 *        - Disciplinas
 *      summary: Lista todas as Disciplinas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por buscar uma lista de Disciplinas existentes no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: query
 *          name: nome
 *          schema:
 *            type: string
 *          description: Nome da Disciplina para filtrar
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: Número da página para retornar
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *          description: Quantidade de registros por página
 *      responses:
 *        200:
 *          description: Retorna a lista de Disciplinas
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *        498:
 *          description: Erros de Token
 *        500:
 *          description: Erro interno do servidor
 *  /disciplinas/{id}:
 *    get:
 *      summary: Lista uma Disciplina encontrada por ID
 *      operationId: getDisciplinaPorId
 *      tags:
 *        - Disciplinas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por buscar uma Disciplina existente no banco de dados por ID, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da Disciplina para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Retorna a Disciplina por ID
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *        404: 
 *          description: Disciplina não encontrada
 *        498:
 *          description: Erros de Token
 *        500:
 *          description: Erro interno do servidor
 *    patch:
 *      summary: Atualiza atributos de uma Disciplina existente no banco de dados
 *      tags:
 *        - Disciplinas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar uma Disciplina existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nome:
 *                  type: string
 *                  example: Matemática
 *                descricao:
 *                  type: string
 *                  example: "Neste curso ensinaremos conceitos matemáticos."
 *                codigo:
 *                  type: string
 *                  example: MATH101
 *                cargaHoraria:
 *                  type: integer
 *                  example: 60
 *                professor:
 *                  type: string
 *                  example: "Prof. Silva"
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da Disciplina a ser atualizada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        201:
 *          description: Disciplina atualizada com sucesso
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *        404: 
 *          description: Disciplina não encontrada
 *        422:
 *          description: Erro ao atualizar a Disciplina
 *        498:
 *          description: Erros de Token
 *        500:
 *          description: Erro interno do servidor
 *    delete:
 *      summary: Exclui uma Disciplina existente no banco de dados
 *      tags:
 *        - Disciplinas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por eliminar uma Disciplina existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da Disciplina a ser excluída
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Disciplina excluída com sucesso
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *        404:
 *          description: Disciplina não encontrada
 *        498:
 *          description: Erros de Token
 *        500:
 *          description: Erro interno do servidor
*/

router
    .post("/disciplinas", AuthMiddleware, DisciplinaController.cadastrarDisciplina)
    .get("/disciplinas", AuthMiddleware, DisciplinaController.listarDisciplinas)
    .get("/disciplinas/:id", AuthMiddleware, DisciplinaController.listarDisciplinaPorId)
    .patch("/disciplinas/:id", AuthMiddleware, DisciplinaController.atualizarDisciplina)
    .delete("/disciplinas/:id", AuthMiddleware, DisciplinaController.excluirDisciplina);

export default router;

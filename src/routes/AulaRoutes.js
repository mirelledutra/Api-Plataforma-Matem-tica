import express from 'express';
import AulaController from '../controllers/AulaController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
import { validationResult } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Aulas
 *   description: Gerenciamento de aulas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Aula:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *         nomeProfessor:
 *           type: string
 *         disciplina:
 *           type: string
 *         nivel:
 *           type: string
 *         descricao:
 *           type: string
 *         videoUrl:
 *           type: string
 *         arquivos:
 *           type: string
 */

/**
 * @swagger
 * /aulas:
 *   post:
 *     summary: Cria uma nova aula
 *     tags: [Aulas]
 *     security:
 *       - bearerAuth: []
 *     description: Cria uma nova aula no banco de dados, verificando a permissão do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Aula de Estatística
 *               nomeProfessor:
 *                 type: string
 *                 example: Marcos Matos
 *               disciplina:
 *                 type: string
 *                 example: Estatística
 *               nivel:
 *                 type: string
 *                 example: Graduação
 *               descricao:
 *                 type: string
 *                 example: Aula de Estatística para o Curso de ADS
 *               videoUrl:
 *                 type: string
 *                 example: https://www.youtube.com/watch?v=8f7wj_Rcqjg
 *               arquivos:
 *                 type: string
 *                 example: pdf da aula de estatística
 *     responses:
 *       201:
 *         description: Aula criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aula'
 *       401:
 *         description: Não autorizado - O usuário não tem permissão para realizar a operação.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: Erro ao cadastrar a aula - Problema no processamento da solicitação.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       498:
 *         description: Erro de Token - Problema com o token de autenticação.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor - Um erro interno ocorreu no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Lista todas as aulas cadastradas
 *     tags: [Aulas]
 *     description: Lista todas as aulas cadastradas.
 *     responses:
 *       200:
 *         description: Retorna a lista de aulas cadastradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aula'
 */

/**
 * @swagger
 * /aulas/{id}:
 *   get:
 *     summary: Retorna os detalhes de uma aula com base no ID.
 *     tags: [Aulas]
 *     description: Retorna os detalhes de uma aula com base no ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aula a ser recuperada.
 *     responses:
 *       200:
 *         description: Retorna os detalhes da aula.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aula'
 *       401:
 *         description: Não autorizado - O usuário não tem permissão para realizar a operação.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Aula não encontrada - O ID fornecido não corresponde a nenhuma aula.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       498:
 *         description: Erro de Token - Problema com o token de autenticação.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor - Um erro interno ocorreu no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   patch:
 *     summary: Atualiza uma aula existente no banco de dados.
 *     tags: [Aulas]
 *     security:
 *       - bearerAuth: []
 *     description: Atualiza uma aula existente no banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Aula de Matemática
 *               nomeProfessor:
 *                 type: string
 *                 example: Ana Silva
 *               disciplina:
 *                 type: string
 *                 example: Matemática
 *               nivel:
 *                 type: string
 *                 example: Pós-Graduação
 *               descricao:
 *                 type: string
 *                 example: Aula avançada de Matemática
 *     responses:
 *       200:
 *         description: Aula atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aula'
 *       401:
 *         description: Não autorizado - O usuário não tem permissão para realizar a operação.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: Erro ao atualizar a aula - Problema no processamento da solicitação.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       498:
 *         description: Erro de Token - Problema com o token de autenticação.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor - Um erro interno ocorreu no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Exclui uma aula do banco de dados
 *     tags: [Aulas]
 *     security:
 *       - bearerAuth: []
 *     description: Exclui uma aula do banco de dados, verificando a permissão do usuário.
 *     responses:
 *       204:
 *         description: Aula excluída com sucesso
 *       401:
 *         description: Não autorizado - O usuário não tem permissão para realizar a operação.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: Erro ao excluir a aula - Problema no processamento da solicitação.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       498:
 *         description: Erro de Token - Problema com o token de autenticação.
 *         content:
 *           application.json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor - Um erro interno ocorreu no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router
    .get('/aulas', AulaController.listarAulas)
    .get('/aulas/:id', AulaController.listarAulaPorId)
    .post('/aulas', AuthMiddleware, AulaController.criarAula)
    .patch('/aulas/:id', AuthMiddleware, AulaController.atualizarAula)
    .delete('/aulas/:id', AuthMiddleware, AulaController.deletarAula);

export default router;
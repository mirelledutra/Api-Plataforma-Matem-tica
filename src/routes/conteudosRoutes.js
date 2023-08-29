import express from "express";
import ContentController from "../controllers/ContentController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Rota para criar um novo conteúdo
router.post("/conteudos", AuthMiddleware, ContentController.criarConteudo);

// Rota para obter uma lista de todos os conteúdos
router.get("/conteudos", AuthMiddleware, ContentController.listarConteudos);

// Rota para obter um conteúdo específico por ID
router.get("/conteudos/:id", AuthMiddleware, ContentController.obterConteudoPorId);

// Rota para atualizar um conteúdo específico por ID
router.patch("/conteudos/:id", AuthMiddleware, ContentController.atualizarConteudo);

// Rota para excluir um conteúdo específico por ID
router.delete("/conteudos/:id", AuthMiddleware, ContentController.excluirConteudo);

export default router;

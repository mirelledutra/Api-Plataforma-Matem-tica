import Aula from "../models/Aula.js";
import Curso from "../models/Curso.js";
import { validationResult } from "express-validator";

const AulaController = {
    async listarAulas(req, res) {
        try {
            const aulas = await Aula.find();
            res.json(aulas);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Erro no servidor");
        }
    },

    async listarAulaPorId(req, res) {
        try {
            const aula = await Aula.findById(req.params.id);
            if (!aula) {
                return res.status(404).json({ msg: "Aula não encontrada" });
            }
            res.json(aula);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Erro no servidor");
        }
    },

    async criarAula(req, res) {
        try {
            const { titulo, descricao, nomeProfessor, nivel, videoUrl, cursoId } = req.body;

            const aulaExistente = await Aula.findOne({ titulo });

            if (aulaExistente) {
                return res.status(422).json({
                    error: true,
                    code: 422,
                    message: "Aula com o mesmo título já cadastrada!",
                });
            }

            const novaAula = new Aula({
                titulo,
                descricao,
                nomeProfessor,
                nivel,
                videoUrl,
                curso: cursoId,
            });

            await novaAula.save();

            return res.status(201).json(novaAula.toJSON());
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                code: 500,
                message: "Erro interno do Servidor",
            });
        }
    },

    async atualizarAula(req, res) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }

        const { titulo, descricao, videoUrl } = req.body;

        try {
            let aula = await Aula.findById(req.params.id);
            if (!aula) {
                return res.status(404).json({ msg: "Aula não encontrada" });
            }

            aula.titulo = titulo;
            aula.descricao = descricao;
            aula.videoUrl = videoUrl;

            await aula.save();

            res.json(aula);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Erro no servidor");
        }
    },

    async deletarAula(req, res) {
        try {
            let aula = await Aula.findById(req.params.id);
            if (!aula) {
                return res.status(404).json({ msg: "Aula não encontrada" });
            }

            await aula.remove();

            res.json({ msg: "Aula removida" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Erro no servidor");
        }
    },
};

export default AulaController;

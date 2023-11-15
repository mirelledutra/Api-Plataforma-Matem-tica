import Disciplina from "../models/Disciplina.js";
import AuthPermissao from "../middleware/AuthPermissao.js";

class DisciplinaController {
  static listarDisciplinas = async (req, res) => {
    try {
      if (await AuthPermissao.verificarPermissao('disciplinas', 'get', req, res) !== false) {
        return;
      }

      const { page, perPage } = req.query;

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5,
      };

      const disciplinas = await Disciplina.paginate({}, options);
      const disciplinasRetornadas = JSON.parse(JSON.stringify(disciplinas));

      return res.json(disciplinasRetornadas);
    } catch (err) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static listarDisciplinaPorId = async (req, res) => {
    try {
      if (await AuthPermissao.verificarPermissao('disciplinas', 'get', req, res) !== false) {
        return;
      }

      const id = req.params.id;

      Disciplina.findById(id)
        .then(async (disciplina) => {
          return res.status(200).send(disciplina);
        })
        .catch((err) => {
          return res.status(404).json({ error: true, code: 404, message: "Disciplina não encontrada!" });
        });
    } catch (err) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static cadastrarDisciplina = async (req, res) => {
    try {
      console.log('entrou')
      if (await AuthPermissao.verificarPermissao('disciplinas', 'post', req, res) !== false) {
        return;
      }

      const novaDisciplina = new Disciplina(req.body);

      novaDisciplina.save()
        .then(() => {
          res.status(201).send(novaDisciplina.toJSON());
        })
        .catch((err) => {
          return res.status(422).json({ error: true, code: 422, message: "Erro nos dados, confira e repita!" });
        });
    } catch (err) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static atualizarDisciplina = async (req, res) => {
    try {
      if (await AuthPermissao.verificarPermissao('disciplinas', 'patch', req, res) !== false) {
        return;
      }

      const id = req.params.id;

      Disciplina.findByIdAndUpdate(id, { $set: req.body })
        .then(() => {
          res.status(201).json({ code: 201, message: 'Disciplina atualizada com sucesso!' });
        })
        .catch((err) => {
          return res.status(422).json({ error: true, code: 422, message: "Erro nos dados, Verifique e tente novamente!" });
        });
    } catch (err) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static excluirDisciplina = async (req, res) => {
    try {
      if (await AuthPermissao.verificarPermissao('disciplinas', 'delete', req, res) !== false) {
        return;
      }

      const id = req.params.id;

      await Disciplina.findById(id)
        .then(() => {
          Disciplina.findByIdAndDelete(id)
            .then(() => {
              return res.status(200).json({ code: 200, message: "Disciplina excluída com sucesso!" });
            });
        })
        .catch((err) => {
          return res.status(404).json({ error: true, code: 404, message: "Disciplina não Localizada!" });
        });
    } catch (err) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }
}

export default DisciplinaController;

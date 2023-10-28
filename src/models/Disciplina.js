import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const disciplinaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: String,
    codigo: {
        type: String,
        required: true,
        unique: true,
    },
    cargaHoraria: Number,
    nomeProfessor: String,
});


const Disciplina = mongoose.model("Disciplina", disciplinaSchema);

export default Disciplina;
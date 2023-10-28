import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const videoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    link: { type: String, required: true },
});

const arquivoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
});

const aulaSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true, maxlength: 100 },
        curso: { type: mongoose.Schema.Types.ObjectId, ref: "Curso", index: true, required: true },
        nomeProfessor: { type: String, required: true, maxlength: 200 },
        disciplina: { type: String, required: true, maxlength: 100 },
        nivel: { type: String, required: true },
        descricao: { type: String, required: true },
        videoUrl: [videoSchema],
        arquivos: [arquivoSchema],
    },
    {
        timestamps: true,
        versionKey: false 
    }
);

aulaSchema.plugin(mongoosePaginate);

const Aula = mongoose.model("Aula", aulaSchema);

export default Aula;
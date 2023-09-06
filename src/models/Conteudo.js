import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

const videoSchema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  tema: String,
  turma: String,
});

// Adicione o plugin mongoose-paginate-v2 ao schema
videoSchema.plugin(mongoosePaginate);

// Adicionar um método personalizado para criar um novo vídeo
videoSchema.statics.criarVideo = async function (videoData) {
  try {
    const video = new this(videoData);
    await video.save();
    return video;
  } catch (error) {
    throw error;
  }
};

// Adicionar um método personalizado para consultar vídeos por tema
videoSchema.statics.obterVideosPorTemaPaginado = async function (tema, pagina, limite) {
  try {
    const options = {
      page: pagina,
      limit: limite,
    };

    const result = await this.paginate({ tema }, options);
    return result;
  } catch (error) {
    throw error;
  }
};

// Criar o modelo de vídeo
const Video = model('Video', videoSchema);

export default Video;

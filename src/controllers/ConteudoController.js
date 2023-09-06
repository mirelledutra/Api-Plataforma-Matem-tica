// import Conteudo from "../models/Conteudo.js"

//arquivo novo
import AuthPermissao from "../middleware/AuthPermissao.js"

class ConteudoController {

  static listarConteudos = async (req,res) => {
      try{

          if(await AuthPermissao.verificarPermissao('conteúdos', 'get', req, res) !== false){
              return
          }

          const modulo = req.query.modulo
          const {page, perPage} = req.query

          const options = {
              modulo: (modulo),
              page: parseInt(page) || 1,
              limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
          }

          if(!modulo){
              const conteudo = await conteudo.paginate({}, options)
              let conteudoRetorn = JSON.parse(JSON.stringify(curso))
    
              return res.json(conteudoRetorn)

            }else{
              const conteudo = await conteudo.paginate({modulo: new RegExp(modulo, 'i')}, options)
              let conteudoRetorn = JSON.parse(JSON.stringify(curso))
    
              return res.json(conteudoRetorn)
            }       
      }
      
      catch(err){
          //console.error(err)
          return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})
      }
  }

  static listarConteudoPorId = async (req, res) => {
      try{

          if(await AuthPermissao.verificarPermissao('conteúdo', 'get', req, res) !== false){
             return
          }

          const id = req.params.id

          conteudos.findById(id).then(async (curso) =>{
              //let conteudoRetorn = JSON.parse(JSON.stringify(curso))

              return res.status(200).send(curso)
          })
          .catch((err)=> {
            //console.log(err)
            return res.status(404).json({ error: true, code: 404, message: "Conteúdo não encontrado!" })

          })
          
      }catch(err){
          //console.error(err);
          return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor" })
      }
  }

  static cadastrarConteudo = async (req, res) => {
    try{

        if(await AuthPermissao.verificarPermissao('conteudos', 'post', req, res) !== false){
            return
        }
      
        let conteudo = new conteudos(req.body);

        let moduloExiste = await conteudos.findOne({modulo:req.body.modulo})

        if(!moduloExiste){
          
          conteudo.save().then(() => {
            res.status(201).send(conteudo.toJSON())
          })
          .catch((err) =>{
              //console.log(err)
              return res.status(422).json({ error: true, code: 422, message: "Erro nos dados, confira e repita!" })
          })
        }else if(moduloExiste){
          return res.status(422).json({error: true, code: 422, message: "Modulo já cadastrado!" })
        }

    }catch(err){
        //console.error(err);
        return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static atualizarConteudo = async (req,res) => {
      try{

          if(await AuthPermissao.verificarPermissao('conteudos', 'patch', req, res) !== false){
            return
          }
          
          var id = req.params.id
          conteudos.findById(id).then(async ()=>{
            let moduloExiste = await conteudos.findOne({modulo:req.body.modulo})
            
            if(moduloExiste){
              return res.status(422).json({error: true, code: 422, message: "Modulo já cadastrado!" })
            }
            
            conteudos.findByIdAndUpdate(id,{$set: req.body}).then(()=>{
              res.status(201).json({ code: 201, message: 'Conteudo atualizado com sucesso!' })
            })
            .catch((err) => {
              //console.log(err)
              return res.status(422).json({ error: true, code: 422, message: "Erro nos dados, Verifique e tente novamente!" })
            })
          })
          .catch((err)=> {
            //console.log)(err)
            return res.status(404).json({ error: true, code: 404, message: "Conteudo não encontrado!" })
          })
      }

      catch(err){
        //console.error(err);
        return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor" })
      }
  }
  
  static excluirConteudo = async (req, res) => {
      try{
            
          if(await AuthPermissao.verificarPermissao('conteúdos', 'delete', req, res) !== false){
            return
          }
          
          let id = req.params.id
          
          await conteudos.findById(id).then(() => {
              conteudos.findByIdAndDelete(id).then(() => {
                return res.status(200).json({code: 200, message: "Conteúdo excluído com sucesso!" })
              }) 
          })
          .catch((err)=>{
            //console.log(err)
            return res.status(404).json({error: true,code: 404, message:"Conteúdo não Localizado!"})
          })   
      }
        
      catch(err){
          //console.error(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
      }
  }
}

export default ConteudoController;
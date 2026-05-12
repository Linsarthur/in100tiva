import mongoose from "mongoose";

const TarefaSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    status: String
})

export default mongoose.model("Tarefa", TarefaSchema);
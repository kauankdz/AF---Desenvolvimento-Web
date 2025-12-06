import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());  //API aceita JSON


app.use(cors({
    origin: 'http://localhost:4200', //URL DO ANGULAR
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));


//Conectar ao MongoDB 
mongoose.connect(process.env.MONGODB_URI, { dbName: 'Financeiro' })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro na conexão : ', err.message));

//Modelo Financeiro
const movimentacaoSchema = new mongoose.Schema({
    categoriaId: { type: String, required: true, min: 0, max: 120 },
    valor: { type: Number, required: true, min: 0 },
    descricao: { type: String, required: true, trim: true },
    Tipo: { type: String, required: true, enum: ['ENTRADA', 'SAIDA'], trim: true },
}, { timestamps: true });

const Movimentacao = mongoose.model('movimentacao', movimentacaoSchema, 'movimentacoes');

//Rota inicial
app.get('/', (req, res) => res.json({ msg: 'API rodando' }));

//Criar movimentação
app.post('/movimentacoes', async (req, res) => {
    const movimentacao = await Movimentacao.create(req.body);
    res.status(201).json(movimentacao);
});

//Listar movimentações
app.get('/movimentacoes', async (req, res) => {
    const movimentacoes = await Movimentacao.find();
    res.json(movimentacoes);
});

//CRUD
app.put('/movimentacoes/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        const movimentacao = await Movimentacao.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true, overwrite: true }
        );
        if (!movimentacao) return res.status(404).json({ error: 'Movimentacao não encontrada' });
        res.json(movimentacao);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//DELETE POR ID
app.delete('/movimentacoes/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        const movimentacao = await Movimentacao.findByIdAndDelete(req.params.id);
        if (!movimentacao) return res.status(404).json({ error: 'Movimentacao não encontrada' });
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//CONSULTA PELO ID
app.get('/movimentacoes/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        const movimentacoes = await Movimentacao.findById(req.params.id);
        if (!movimentacoes) return res.status(404).json({ error: 'Movimentacao não encontrada' });
        res.json(movimentacoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Financeiro-Categorias
const categoriaSchema = new mongoose.Schema({
    idCat: { type: String, required: true, trim: true },
    nome: { type: String, required: true, trim: true },
    cor: { type: String, required: true, trim: true },
    Tipo: { type: String, required: true, enum: ['ENTRADA', 'SAIDA'], trim: true },
}, { collection: 'Categoria', timestamps: true });
const Categoria = mongoose.model('Categoria', categoriaSchema, 'Categoria');

//Rota inicial
app.get('/', (req, res) => res.json({ msg: 'API rodando' }));

//Listar Movimentações
app.get('/Categoria', async (req, res) => {
    const categorias = await Categoria.find();
    res.json(categorias);
});

//CONSULTA PELO ID
app.get('/Categoria/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) return res.status(404).json({ error: 'Categoria não encontrado' });
        res.json(categoria);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Iniciar servidor
app.listen(process.env.PORT, () =>
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
);  
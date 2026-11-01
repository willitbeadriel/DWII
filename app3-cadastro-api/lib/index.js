"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware para interpretar requisições JSON[cite: 1, 9]
app.use(express_1.default.json());
// Armazenamento em memória (Array de Livros)[cite: 1, 3]
const livros = [];
// Função auxiliar para validação dos dados de entrada[cite: 3, 9]
function validarDadosLivro(body) {
    const { titulo, autor, editora, anoEdicao, genero, isbn } = body;
    if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
        return "O campo titulo é obrigatório";
    }
    if (!autor || typeof autor !== "string" || autor.trim() === "") {
        return "O campo autor é obrigatório";
    }
    if (!editora || typeof editora !== "string" || editora.trim() === "") {
        return "O campo editora é obrigatório";
    }
    if (anoEdicao === undefined || typeof anoEdicao !== "number" || isNaN(anoEdicao)) {
        return "O campo anoEdicao é obrigatório e deve ser numérico";
    }
    if (!genero || typeof genero !== "string" || genero.trim() === "") {
        return "O campo genero é obrigatório";
    }
    if (!isbn || typeof isbn !== "string" || isbn.trim() === "") {
        return "O campo isbn é obrigatório";
    }
    return null;
}
// 1. Rota Principal - GET /[cite: 2]
app.get("/", (_req, res) => {
    res.status(200).json({ mensagem: "API Biblioteca funcionando!" });
});
// 2. Consulta de todos os livros - GET /livros[cite: 2]
app.get("/livros", (_req, res) => {
    res.status(200).json(livros);
});
// 3. Consulta por ISBN - GET /livros/:isbn[cite: 2, 3]
app.get("/livros/:isbn", (req, res) => {
    const { isbn } = req.params;
    const livroEncontrado = livros.find((l) => l.isbn === isbn);
    if (!livroEncontrado) {
        res.status(404).json({ erro: "Livro não encontrado" });
        return;
    }
    res.status(200).json(livroEncontrado);
});
// 4. Cadastro de Livro - POST /livros[cite: 2]
app.post("/livros", (req, res) => {
    // Validação dos campos obrigatórios[cite: 3]
    const erroValidacao = validarDadosLivro(req.body);
    if (erroValidacao) {
        res.status(400).json({ erro: erroValidacao });
        return;
    }
    const { titulo, autor, editora, anoEdicao, genero, isbn } = req.body;
    // Validação de ISBN duplicado[cite: 3]
    const isbnExiste = livros.some((l) => l.isbn === isbn);
    if (isbnExiste) {
        res.status(400).json({ erro: "Já existe um livro cadastrado com este ISBN" });
        return;
    }
    const novoLivro = {
        titulo: titulo.trim(),
        autor: autor.trim(),
        editora: editora.trim(),
        anoEdicao,
        genero: genero.trim(),
        isbn: isbn.trim(),
    };
    livros.push(novoLivro);
    res.status(201).json(novoLivro); // HTTP 201 Created[cite: 2, 6]
});
// Inicialização do servidor[cite: 9]
app.listen(PORT, () => {
    console.log(`🚀 Servidor da Biblioteca rodando em http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarLivro = exports.obterLivroPorIsbn = exports.listarLivros = exports.statusApi = void 0;
// Armazenamento em memória através de array[cite: 1, 3]
const livros = [];
// Função de validação interna[cite: 3]
function validarDadosLivro(body) {
    const { titulo, autor, editora, anoEdicao, genero, isbn } = body;
    if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
        return 'O campo titulo é obrigatório';
    }
    if (!autor || typeof autor !== 'string' || autor.trim() === '') {
        return 'O campo autor é obrigatório';
    }
    if (!editora || typeof editora !== 'string' || editora.trim() === '') {
        return 'O campo editora é obrigatório';
    }
    if (anoEdicao === undefined || typeof anoEdicao !== 'number' || isNaN(anoEdicao)) {
        return 'O campo anoEdicao é obrigatório e deve ser numérico';
    }
    if (!genero || typeof genero !== 'string' || genero.trim() === '') {
        return 'O campo genero é obrigatório';
    }
    if (!isbn || typeof isbn !== 'string' || isbn.trim() === '') {
        return 'O campo isbn é obrigatório';
    }
    return null;
}
// Handler da Rota Principal GET /[cite: 2]
const statusApi = (_req, res) => {
    res.status(200).json({ mensagem: 'API Biblioteca funcionando!' });
};
exports.statusApi = statusApi;
// Handler para consultar todos os livros GET /livros[cite: 2]
const listarLivros = (_req, res) => {
    res.status(200).json(livros);
};
exports.listarLivros = listarLivros;
// Handler para consultar livro por ISBN GET /livros/:isbn[cite: 2, 3]
const obterLivroPorIsbn = (req, res) => {
    const { isbn } = req.params;
    const livroEncontrado = livros.find((l) => l.isbn === isbn);
    if (!livroEncontrado) {
        res.status(404).json({ erro: 'Livro não encontrado' });
        return;
    }
    res.status(200).json(livroEncontrado);
};
exports.obterLivroPorIsbn = obterLivroPorIsbn;
// Handler para cadastrar novo livro POST /livros[cite: 2, 3]
const cadastrarLivro = (req, res) => {
    const erroValidacao = validarDadosLivro(req.body);
    if (erroValidacao) {
        res.status(400).json({ erro: erroValidacao });
        return;
    }
    const { titulo, autor, editora, anoEdicao, genero, isbn } = req.body;
    const isbnExiste = livros.some((l) => l.isbn === isbn);
    if (isbnExiste) {
        res.status(400).json({ erro: 'Já existe um livro cadastrado com este ISBN' });
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
    res.status(201).json(novoLivro);
};
exports.cadastrarLivro = cadastrarLivro;
//# sourceMappingURL=livros.controller.js.map
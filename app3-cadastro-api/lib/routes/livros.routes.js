"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const livros_controller_1 = require("../controllers/livros.controller");
const router = (0, express_1.Router)();
router.get('/', livros_controller_1.statusApi);
router.get('/livros', livros_controller_1.listarLivros);
router.get('/livros/:isbn', livros_controller_1.obterLivroPorIsbn);
router.post('/livros', livros_controller_1.cadastrarLivro);
exports.default = router;
//# sourceMappingURL=livros.routes.js.map
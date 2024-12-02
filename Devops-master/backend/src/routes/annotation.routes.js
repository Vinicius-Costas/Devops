const express = require('express');
const routes = express.Router();
const auth = require('../middlewares/auth');

// Importações dos Controllers
const AnnotationController = require('../controllers/annotation.controller');
const PriorityController = require('../controllers/priority.controller');
const ContentController = require('../controllers/content.controller');

// Rotas para manipulação das anotações
routes.get('/annotations/:userId', auth, AnnotationController.getAllAnnotations);
routes.post('/annotations/:userId', auth, AnnotationController.createAnnotation);
routes.delete('/annotations/:id/:userId', auth, AnnotationController.deleteAnnotation);

// Rota Priority
routes.get('/priorities/:userId', auth, PriorityController.read);
routes.get('/priorities/:priority/:userId', auth, PriorityController.findByPriority);
routes.put('/priorities/:id/:userId', auth, PriorityController.update);

// Rota Content
routes.put('/contents/:id/:userId', auth, ContentController.update);

module.exports = routes;

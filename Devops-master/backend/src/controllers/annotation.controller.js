// annotationsController.js

const Annotations = require('../models/annotation.model');

module.exports = {
    async getAllAnnotations(req, res) {
        try {
            const { userId } = req.params;
            const annotationList = await Annotations.find({ user: userId });
            return res.json(annotationList);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ocorreu um erro ao buscar as anotações.' });
        }
    },

    async createAnnotation(req, res) {
        const { title, notes, priority } = req.body;
        const { userId } = req.params;

        if (!notes || !title || !userId) {
            return res.status(400).json({
                error: 'Dados inválidos ou usuário não autenticado corretamente.',
            });
        }

        try {
            const annotationsCreated = await Annotations.create({
                title,
                notes,
                priority,
                user: userId,
            });

            return res.json(annotationsCreated);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar anotação.' });
        }
    },

    async deleteAnnotation(req, res) {
        const { id, userId } = req.params;

        const annotationDeleted = await Annotations.findOneAndDelete({ _id: id, user: userId });

        if (annotationDeleted) {
            return res.json(annotationDeleted);
        }

        return res.status(401).json({ error: 'Não foi encontrado o registro para deletar' });
    },

    // Outras funções...
};

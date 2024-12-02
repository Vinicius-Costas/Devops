// PriorityController

const Annotations = require('../models/annotation.model');

module.exports = {
    async read(req, res) {
        try {
            const userId = req.params.userId;  // Pegue o userId da solicitação
            const priorityNotes = await Annotations.find({ user: userId, priority: true });
            return res.json(priorityNotes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    async update(req, res) {
        try {
            const userId = req.params.userId;  // Pegue o userId da solicitação
            const { id } = req.params;

            const annotation = await Annotations.findById(id);

            if (!annotation) {
                return res.status(404).json({ error: "Anotação não encontrada" });
            }

            // Verifique se a anotação pertence ao usuário antes de atualizar a prioridade
            if (annotation.user.toString() !== userId) {
                return res.status(403).json({ error: "Você não tem permissão para atualizar esta anotação" });
            }

            // Alternar o valor de 'priority' usando o operador de negação
            annotation.priority = !annotation.priority;

            await annotation.save();

            return res.json(annotation);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    async findByPriority(req, res) {
        try {
            const userId = req.params.userId;  // Pegue o userId da solicitação
            const { priority } = req.params;

            const priorityNotes = await Annotations.find({ user: userId, priority });

            return res.json(priorityNotes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },
};

const Annotations = require('../models/annotation.model');

module.exports = {
    async update(req, res) {
        try {
            const userId = req.params.userId;
            const { id } = req.params;

            const annotation = await Annotations.findById(id);

            if (!annotation) {
                return res.status(404).json({ error: "Anotação não encontrada" });
            }

            // Verifica se a anotação pertence ao usuário antes de atualizar o conteúdo
            if (annotation.user.toString() !== userId) {
                return res.status(403).json({ error: "Você não tem permissão para atualizar esta anotação" });
            }

            // Atualiza os campos da anotação com os dados fornecidos no corpo da requisição
            annotation.notes = req.body.notes || annotation.notes;

            // Salva a anotação atualizada
            const updatedAnnotation = await annotation.save();

            return res.json(updatedAnnotation);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },
};

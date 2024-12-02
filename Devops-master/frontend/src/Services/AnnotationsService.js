import axios from "axios";
import AuthService from "./AuthService";


// Obtendo o token e o userId do armazenamento local
const token = sessionStorage.getItem('token');
const userId = sessionStorage.getItem('userId'); // Certifique-se de armazenar o userId durante o login

export const api = axios.create({
    baseURL: 'http://23.22.151.80:3001/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

export const getAllAnnotations = async () => {
    
    try {
        const response = await api.get(`/annotations/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar as anotações:', error);
        // Se o erro for de autenticação, redirecione para a página de login
        if (error.response && error.response.status === 401) {
             window.location.assign('/login');
        }
        throw error;
    }
};

export const createAnnotation = async (title, notes, priority = false) => {
    try {
        const response = await api.post(`/annotations/${userId}`, {
            title,
            notes,
            priority: priority, // Adicionando prioridade à requisição
            //userId, // Adicionando userId à requisição
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar anotação:', error);
        throw error;
    }
};

export const deleteAnnotation = async (id) => {
    try {
        const response = await api.delete(`/annotations/${id}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar anotação:', error);
        throw error;
    }
};

export const updateAnnotation = async (id, title, notes, priority) => {
    try {
        const response = await api.put(`/contents/${id}/${userId}`, {
            title,
            notes,
            priority,
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar anotação:', error);
        throw error;
    }
}

export const getAnnotationsByPriority = async (priority) => {
    try {
        const response = await api.get(`/priorities/${priority}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar anotações por prioridade:', error);
        throw error;
    }
};

export const updatePriority = async (id) => {
    try {
        const response = await api.put(`/priorities/${id}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar prioridade:', error);
        throw error;
    }
};



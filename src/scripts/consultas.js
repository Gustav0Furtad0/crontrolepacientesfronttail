import axiosInstance from './middleware';

export default class Consultas {
    static async addConsulta(formData) {
        console.log(JSON.stringify(formData));
        try {
            const response = await axiosInstance.post('/consulta/create', formData);

            if (response.status !== 200) {
                throw new Error(response.data.message || 'Falha ao adicionar consulta');
            }

            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar consulta:', error);
            return { message: error.message, code: 500 };
        }
    }

    static async getConsultas(queryParams) {
        try {
            const response = await axiosInstance.get('/consulta/search', {
                params: queryParams
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || 'Falha ao buscar consultas');
            }

            return response.data;
        } catch (error) {
            console.error('Erro ao buscar consultas:', error);
            throw error;
        }
    }

    static async verificarDisponibilidadeConsulta(data) {
        try {
            const response = await axiosInstance.post('/consulta/verificar', data);
            return response.data;
        } catch (error) {
            console.error('Erro ao verificar disponibilidade:', error);
            throw error;
        }
    }

    static async verificarPossiveisHorarios(data) {
        try {
            const response = await axiosInstance.post('/consulta/intervaloLivre', data);
            return response.data;
        } catch (error) {
            console.error('Erro ao verificar possíveis horários:', error);
            throw error;
        }
    }
}

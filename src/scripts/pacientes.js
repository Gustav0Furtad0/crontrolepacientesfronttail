import axiosInstance from './middleware';
export default class Pacientes {
    static async addPaciente(formData) {
        console.log(JSON.stringify(formData));
        try {
            const response = await axiosInstance.post('/paciente/create', formData);

            console.log(response);

            if (response.status !== 200) {
                throw new Error(response.data.message || 'Falha ao adicionar paciente');
            }

            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar paciente:', error);
            throw error;
        }
    }

    static async getAllPacientes() {
        try {
            const response = await axiosInstance.get('/paciente/getall');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch pacientes:', error);
            return [];
        }
    }
}
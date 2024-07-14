import axiosInstance from './middleware';

export default class Users {
    static async addUser(formData) {
        console.log(JSON.stringify(formData));
        try {
            const response = await axiosInstance.post('/usuario/create', formData);

            if (response.status !== 200) {
                throw new Error(response.data.message || 'Falha ao adicionar usuário');
            }

            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            throw error;
        }
    }

    static async getAllUsuarios() {
        try {
            const response = await axiosInstance.get('/usuario/getall');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return [];
        }
    }

    static async getUsersByType(type) {
        try {
            const response = await axiosInstance.get(`/usuario/getbytype/${type}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return [];
        }
    }
}

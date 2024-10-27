import axiosInstance from './middleware';

export default class Pagamento {
    static async addPagamento(formData) {
        console.log(JSON.stringify(formData));
        try {
            const response = await axiosInstance.post('/pagamento/create', formData);

            if (response.status !== 200) {
                throw new Error(response.data.message || 'Falha ao adicionar pagamento');
            }

            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar pagamento:', error);
            return { message: error.message, code: 500 };
        }
    }

    static async getAllPagamentos(queryParams) {
        try {
            const response = await axiosInstance.get('/pagamento/getall');

            if (response.status !== 200) {
                throw new Error(response.data.message || 'Falha ao buscar pagamentos');
            }

            return response.data;
        } catch (error) {
            console.error('Erro ao buscar pagamentos:', error);
            throw error;
        }
    }
}
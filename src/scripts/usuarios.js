import env from "react-dotenv";
import User from "./auth/user";

export default class Users {
    static async addUser(formData) {
        console.log(JSON.stringify(formData));
        try {
            const response = await fetch(env.API_URL + '/usuario/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${User.getToken()}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao adicionar usuário');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            return error;
        }
    }

    static async getAllUsuarios() {
        try {
            const response = await fetch(env.API_URL + '/usuario/getall', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${User.getToken()}`
                }
            });
            let result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return [];
        }
    }

    static async getUsersByType(type) {
        try {
            const response = await fetch(env.API_URL + `/usuario/getbytype/${type}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${User.getToken()}`
                }
            });
            let result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return [];
        }
    }
}
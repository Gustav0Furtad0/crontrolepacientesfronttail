import env from "react-dotenv";
import User from "./auth/user";

export default class Pacientes {
    static async addPaciente(formData) {
        console.log(JSON.stringify(formData));
        try {
            const response = await fetch(env.API_URL + '/paciente/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${User.getToken()}`,
                },
                body: JSON.stringify(formData),
            });

            console.log(response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao adicionar paciente');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            return error;
        }
    }

    static async getAllPacientes() {
        try {
            const response = await fetch(env.API_URL + '/paciente/getall', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${User.getToken()}`
                }
            });
            let result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to fetch pacientes:', error);
            return [];
        }
    }
}
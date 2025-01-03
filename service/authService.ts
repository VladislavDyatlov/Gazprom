import { api } from "@/utils/axios"

export const registerUser = async (data: {email: string, name: string, password: string}) =>{
    try{
        const response = await api.post('http://localhost:3000/api/reg', data);
        return response;
    } catch(e){
        throw new Error("Ошибка при регистрации")
    }
}

export const loginUser = async (data: {email: string, password: string}) =>{
    try{
        const response = await api.post('http://localhost:3000/auth/login', data);
        return response;
    } catch(e){
        throw new Error("Ошибка при регистрации")
    }
}
import { Injectable } from '@angular/core';
import { RegisterUserDTO } from '../../dto/register-user.dto';
import { api } from '../../../../api/axios.config';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {


   async register(data: RegisterUserDTO) {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        'Error inesperado al registrar usuario';

      throw new Error(message);
    }

    throw new Error('Error de conexión con el servidor');
  }
  
}

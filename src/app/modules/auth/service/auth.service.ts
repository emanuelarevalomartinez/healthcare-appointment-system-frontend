import { Injectable } from '@angular/core';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { api } from '../../../api/axios.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

   register(data: RegisterUserDTO) {
    return api.post('/auth/register', data);
  }
  
}

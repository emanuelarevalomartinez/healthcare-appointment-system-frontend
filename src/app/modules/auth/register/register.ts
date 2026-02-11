import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { UserRole } from '../dto/user-role.enum';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {


registerForm!: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // Inicializamos el formulario con validaciones
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ]],

      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]],

      confirmPassword: ['', Validators.required],

      role: [UserRole.ADMIN, Validators.required], // usa el enum
    });
  }

  // ✅ Función para enviar el formulario
  submit() {
    // Si el formulario es inválido, marcamos todos los campos
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Construimos el DTO explícitamente, excluyendo confirmPassword
    const payload: RegisterUserDTO = {
      username: this.registerForm.get('username')!.value!,
      email: this.registerForm.get('email')!.value!,
      password: this.registerForm.get('password')!.value!,
      role: this.registerForm.get('role')!.value!,
    };

    // Llamamos al servicio
    this.authService.register(payload).then(() => {
      console.log('Usuario creado');
      // aquí puedes redirigir o mostrar mensaje
    }).catch(err => {
      console.error('Error al registrar usuario', err);
      // manejar errores
    });
  }

}

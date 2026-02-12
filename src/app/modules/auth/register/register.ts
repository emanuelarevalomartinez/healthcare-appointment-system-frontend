import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRole } from '../dto/user-role.enum';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { RouterLink } from '@angular/router';
import { RegisterService } from './service/register.service';
import { passwordsMatchValidator } from '../../../validators/passwords-match.validator';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock, faKey, faAt } from '@fortawesome/free-solid-svg-icons';
import { InputGeneral } from "../../../components/inputs/input-general/input-general";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, FontAwesomeModule, FaIconComponent, InputGeneral],
  templateUrl: './register.html',
})
export class Register {

faUser = faUser;
faKey = faKey;
faAt = faAt;
registerForm!: ReturnType<FormBuilder['group']>;
errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {

    this.registerForm = this.fb.group({

      username: this.fb.control('', {
        nonNullable: true,
        validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ],
      }),

      email: this.fb.control('', {
        nonNullable: true,
        validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ],
      }),

      password: this.fb.control('', {
        nonNullable: true,
        validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ],
      }),

      confirmPassword: this.fb.control('', {
        nonNullable: true,
        validators: Validators.required,
      }),

      role: this.fb.control<UserRole | null>(null, {
        validators: Validators.required,
      })
    },
    {
      validators: passwordsMatchValidator,
     }
  );
  }

  // ✅ Función para enviar el formulario
  async submit() {
    this.errorMessage = '';
    // Si el formulario es inválido, marcamos todos los campos
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, revisa los campos del formulario';
      console.log("No pasa la validacion");
      
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

    console.log("payload", payload);
    

  /*   // Llamamos al servicio
    this.authService.register(payload).then(() => {
      console.log('Usuario creado');
      // aquí puedes redirigir o mostrar mensaje
    }).catch(err => {
      console.error('Error al registrar usuario', err);
      // manejar errores
    }); */
     try {
    await this.registerService.register(this.registerForm.value);
    // éxito
     console.log('Usuario creado');
  } catch (error: any) {
    this.errorMessage = error.message;
  }
  }

}

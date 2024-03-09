import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,RouterLink],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  registerForm: FormGroup= new FormGroup({});

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private rotas: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'user_email': [null, [Validators.required, Validators.email, Validators.minLength(10)]],
      'user_password': [null, [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,}$/)]],

    })
  }
  onSubmit(form:FormGroup) {
    this.authService.loginUser(form.value.user_email, form.value.user_password).subscribe(
      () => { },
      // Lidar com erros
      (error) => {
        console.error('Erro durante o login:', error);
      }
    );
  }
}

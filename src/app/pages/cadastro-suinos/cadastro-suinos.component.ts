import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { type_suino } from '../../types/type_suino';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-suinos',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './cadastro-suinos.component.html',
  styleUrl: './cadastro-suinos.component.css'
})
export class CadastroSuinosComponent {
  registerSuinoForm: FormGroup= new FormGroup({});

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private rotas: Router) { }

  ngOnInit(): void {
    this.registerSuinoForm = this.formBuilder.group({
      'Brinco': [null, [Validators.required]],
      'BrincoPai': [null, [Validators.required]],
      'BrincoMae': [null, [Validators.required]],
      'DataNascimento': [null, [Validators.required]],
      'DataSaida': [null, [Validators.required]],
      'Status': [null, [Validators.required]],
      'Sexo': [null, [Validators.required]],

    })
  }
  onSubmit(form:FormGroup) {
    this.apiService.cadastroSuino(form.value).subscribe(responseData => {
      console.log(responseData);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Suíno adicionado com sucesso.',
        timer:2500,
        showConfirmButton: false,
      });
      this.registerSuinoForm.reset()
    });
  }
}

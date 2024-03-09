import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { type_suino_peso } from '../../types/type_suino';

@Component({
  selector: 'app-register-peso',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,NgFor,RouterLink],
  templateUrl: './register-peso.component.html',
  styleUrl: './register-peso.component.css'
})
export class RegisterPesoComponent {
  SuinoPesoForm: FormGroup = new FormGroup({});
  suinoId: string = ""
  suinopesoHistorico: type_suino_peso[] = []

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private rotas: Router, private rota: ActivatedRoute) { }

  ngOnInit(): void {
    this.suinoId = this.rota.snapshot.params['id']
    this.SuinoPesoForm = this.formBuilder.group({
      'DataPesagem': [null, [Validators.required]],
      'suinoPeso': [null, [Validators.required]],


    })
    this.apiService.getListPesoSuinos().subscribe((response) => {
      this.suinopesoHistorico = response.filter((suino) => suino.suinoBrinco == this.suinoId) 
    })

  }
  onSubmit(form: FormGroup) {
    const DataPeso = {
      ...form.value,
      suinoBrinco: this.suinoId
    }
    this.apiService.cadastroPesoSuino(DataPeso).subscribe(responseData => {
      console.log(responseData);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Peso adicionado com sucesso.',
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(()=>{
        this.SuinoPesoForm.reset()
        window.location.reload();

      },2500)
    });
  }
}

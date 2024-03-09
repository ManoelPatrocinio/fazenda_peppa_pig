import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { type_suino } from '../../types/type_suino';
import { NgFor } from '@angular/common';
import { CardSuinoDetailComponent } from '../../components/card-suino-detail/card-suino-detail.component';

@Component({
  selector: 'app-listagem-suinos',
  standalone: true,
  imports: [NgFor,CardSuinoDetailComponent],
  templateUrl: './listagem-suinos.component.html',
  styleUrl: './listagem-suinos.component.css'
})
export class ListagemSuinosComponent {
  listSuinos: type_suino[] = []
  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.apiService.getListaSuinos().subscribe((datas)=>{
      this.listSuinos=datas;
    })
  }
}

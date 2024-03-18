import { Component } from '@angular/core';
import { FilterSuinosManejoComponent } from '../../components/filter-suinos-manejo/filter-suinos-manejo.component';
import { FilterSuinosComponent } from '../../components/filter-suinos/filter-suinos.component';
import { type_suino } from '../../types/type_suino';
import { ApiService } from '../../services/api.service';
import { CardSuinoDetailComponent } from '../../components/card-suino-detail/card-suino-detail.component';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-manejo',
  standalone: true,
  imports: [FilterSuinosManejoComponent,FilterSuinosComponent,CardSuinoDetailComponent,NgFor],
  templateUrl: './register-manejo.component.html',
  styleUrl: './register-manejo.component.css'
})
export class RegisterManejoComponent {
  listSuinos: type_suino[] = [];
  filteredListSuinos: type_suino[] = [];
  listSuinosSelectedToManejo: type_suino[] = [];

  optionSelected:any = { propriedade: null, valor: null };

  private subscription: Subscription | null = null;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.apiService.getListaSuinos().subscribe(
      (datas: type_suino[]) => {
        this.listSuinos = datas;
        this.filteredListSuinos = this.listSuinos;
      },
      error => {
        // Lide com o erro de forma adequada, como exibindo uma mensagem de erro.
        console.error('Erro ao obter lista de suínos:', error);
      }
    );
  }

  filterList(filter: { propriedade: keyof type_suino, valor: string }): void {
    this.filteredListSuinos = this.listSuinos.filter(suino => suino[filter.propriedade] === filter.valor);
  }

  clearFilter(): void {
    this.filteredListSuinos = this.listSuinos;
  }

  addSuinoToManejoList(suinoSelected: type_suino): void {
    console.log("suinoSelected",suinoSelected)

    if (!this.listSuinosSelectedToManejo) {
      this.listSuinosSelectedToManejo = []; // Inicialize a lista se ainda não estiver definida

    }
  
    if (suinoSelected && !this.listSuinosSelectedToManejo.includes(suinoSelected)) {
      this.listSuinosSelectedToManejo.push(suinoSelected);
    }
    console.log("this.listSuinosSelectedToManejo",this.listSuinosSelectedToManejo)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

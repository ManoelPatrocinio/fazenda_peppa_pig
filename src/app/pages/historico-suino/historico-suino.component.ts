import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { type_suino, type_suino_peso } from '../../types/type_suino';
import { NgFor, NgIf } from '@angular/common';
import { type_sessao } from '../../types/type_sessao';
import { FormatdatePipe } from '../../pipes/formatdate.pipe';

interface IHistorico {
  data: Date,
  atividade: string,
  detalhe: string
}
@Component({
  selector: 'app-historico-suino',
  standalone: true,
  imports: [NgFor, NgIf,FormatdatePipe],
  templateUrl: './historico-suino.component.html',
  styleUrl: './historico-suino.component.css'
})


export class HistoricoSuinoComponent {
  listaSuinos: type_suino[] = []
  suinopesoHistorico: type_suino_peso[] = []
  suinoSessaoHistorico: type_sessao[] = []
  historico: IHistorico[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getListaSuinos().subscribe((data) => { this.listaSuinos = data });
  }

  SetSuinoSelected(event: any) {
    let SuinoId = event.target.value
    console.log("suino selected: ", SuinoId)

    // retorna  a lista de pesos do suíno selecionado
    this.apiService.getSuinoById(SuinoId).subscribe((data) => {
      if (data != null) {
        console.log("suino data: ", data)
        this.apiService.getListPesoSuinos().subscribe((response) => {
          this.suinopesoHistorico = response.filter((suino) => suino.suinoBrinco == data.Brinco.toString())
          console.log("suino Historico: ", this.suinopesoHistorico)

        })
        // retorna  a lista das sessões do suino selecionado
        this.apiService.getListSessoes().subscribe((response: type_sessao[]) => {
          console.log("sessoes", response)

          const novoArray = response.filter(item => {
            return item.s_animais.some(animal => animal.suinoBrinco === data.Brinco.toString());
          }).map(item => {
            return {
              atividades: item.s_animais.filter(animal => animal.suinoBrinco === data.Brinco.toString())[0].atividades,
              s_date: item.s_date    
            };
          });
 
          novoArray.forEach(item => {
            item.atividades.forEach(atividade => {
              const detalhe = atividade.atv_status ? "Concluido" : "Pendente";
              this.historico.push({
                data: new Date(item.s_date),
                atividade: atividade.atv_name,
                detalhe: detalhe
              });
            });
          });
          // adicionando dados da pesagem ao array de historico
          this.suinopesoHistorico.forEach(pesagem => {
            this.historico.push({
              data: new Date(pesagem.DataPesagem),
              atividade: "Pesagem",
              detalhe: `${pesagem.suinoPeso} Kg`
            });
          });
          // ordenando em ordem  decrescente por data
          this.historico.sort((a, b) => b.data.getTime() - a.data.getTime());
          console.log("this.historico", this.historico)

        })

      }
    })
  }
}

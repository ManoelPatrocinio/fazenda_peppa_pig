import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { type_suino, type_suino_peso } from '../../types/type_suino';
import { NgFor, NgIf } from '@angular/common';
import { type_sessao } from '../../types/type_sessao';
import { FormatdatePipe } from '../../pipes/formatdate.pipe';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';

interface IHistorico {
  data: Date,
  atividade: string,
  detalhe: string
}
@Component({
  selector: 'app-historico-suino',
  standalone: true,
  imports: [NgFor, NgIf, FormatdatePipe, LineChartComponent, BarChartComponent],
  templateUrl: './historico-suino.component.html',
  styleUrl: './historico-suino.component.css'
})


export class HistoricoSuinoComponent {
  listaSuinos: type_suino[] = []
  suinopesoHistorico: type_suino_peso[] = []
  suinoSessaoHistorico: type_sessao[] = []
  historico: IHistorico[] = [];
  noData: boolean = false;
  pesos: number[] = [];
  datas: string[] = []
  historicoAtividades: any[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getListaSuinos().subscribe((data) => { this.listaSuinos = data });
  }

  SetSuinoSelected(event: any) {
    let SuinoId = event.target.value

    if (SuinoId) {
      this.resertVariables()
    }

    this.apiService.getSuinoById(SuinoId).subscribe((data) => {
      if (data != null) {
        this.apiService.getListPesoSuinos().subscribe((response) => {
          this.suinopesoHistorico = response.filter((suino) => suino.suinoBrinco == data.Brinco.toString())
        })
        this.apiService.getListSessoes().subscribe((response: type_sessao[]) => {
          this.AdiconarAtividadeHistorico(data, response);
          this.AdicionarPesoHistorico()

          // ordenando em ordem  decrescente por data
          this.historico.sort((a, b) => b.data.getTime() - a.data.getTime());
          console.log("this.historico", this.historico)
          if (this.historico.length == 0) {
            this.noData = true;
          }

        })


      }
    })
  }


  formatDatasToChart() {

    if (this.suinopesoHistorico.length > 0) {
      //  Transforma a data do formato "yyyy-mm-dd" para o padrão Date()
      this.suinopesoHistorico.forEach(peso => {
        peso.DataPesagem = new Date(peso.DataPesagem);
      });
      // ordena as dados por ordem crescente
      this.suinopesoHistorico.sort((a, b) => a.DataPesagem.getTime() - b.DataPesagem.getTime());

      this.pesos = this.suinopesoHistorico.map(suino => suino.suinoPeso)
      this.datas = this.suinopesoHistorico.map(suino => suino.DataPesagem.toLocaleDateString())

    }

  }

  formatDatasToChartBar() {

      // Cria um objeto para armazenar a contagem de cada atividade
      let contadorAtividades: any = {};

      // Itera sobre o array historico e conta a ocorrência de cada atividade
      this.historico.forEach(item => {
        const atividade = item.atividade;
        contadorAtividades[atividade] = (contadorAtividades[atividade] || 0) + 1;
      });

      // Converte o objeto de contagem em um array de objetos com o nome da atividade e sua contagem
      this.historicoAtividades = Object.entries(contadorAtividades).map(([atividade, quantidade]) => ({
        atividade,
        quantidade
      }));
    
  }

  AdiconarAtividadeHistorico(data: type_suino, response: type_sessao[]) {
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
        const detalhe = atividade.atv_status ? "Concluído" : "Pendente";
        this.historico.push({
          data: new Date(item.s_date),
          atividade: atividade.atv_name,
          detalhe: detalhe
        });
      });
    });
  }

  AdicionarPesoHistorico() {
    this.suinopesoHistorico.forEach(pesagem => {
      this.historico.push({
        data: new Date(pesagem.DataPesagem),
        atividade: "Pesagem",
        detalhe: `${pesagem.suinoPeso} Kg`
      });
    });
  }

  resertVariables(){
    this.historico = []
      this.suinoSessaoHistorico = []
      this.suinopesoHistorico = []
      this.historicoAtividades = []
  }
}

import { ArrayType } from '@angular/compiler';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

interface IAtividade {
  atividade:string, 
  quantidade: number ,
}
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})


export class BarChartComponent {
  chart: any = []
  @Input() datas:IAtividade[] =[]


  ngOnChanges(changes: SimpleChanges) {


    if (changes["datas"].currentValue.length > 0) {
      this.createChart();
    }

  }

  
  createChart() {

    const labels = this.datas.map(item => item.atividade);
    const data = this.datas.map(item => item.quantidade);

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels:labels,
        datasets: [
          {
            label: 'Atividade',
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });


  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Injectable({
  providedIn: 'root'
})

export class ChartService {

  constructor(private router:Router)
  {

  }

  buildPieChart(chartLabels: string[], chartData: number[], chartId: string, targetUrl?: string) {
    const pieChart = new Chart(chartId, {
      type: 'pie',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Medals',
          data: chartData,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          // hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              this.router.navigate([targetUrl, countryName]);
            }
          }
        }
      }
    });

    return pieChart;
  }

  buildLineChart(chartLabels: string[], chartData: number[], chartId: string) {
    const lineChart = new Chart(chartId, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Medals",
            data: chartData,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
    return lineChart;

  }
}
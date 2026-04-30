import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AppChartType } from 'src/app/services/chart-type.type';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnChanges {
  @Input() chartId!: string;
  @Input() type!: AppChartType;
  @Input() labels!: string[]|null;
  @Input() data!: number[]|null;
  @Input() targetPage?: string;

  public chart!:Chart;

  constructor(private chartService: ChartService) {
  }

  ngOnChanges(): void {
    if (! this.chart && document.getElementById(this.chartId))
    {
      switch (this.type)
      {
        case 'pie':
          if (this.labels && this.data && this.chartId && this.targetPage)
          {
            this.hideLoader();
            this.chart = this.chartService.buildPieChart(this.labels, this.data, this.chartId, this.targetPage);
          }

          break;
        case 'line':
          if (this.labels && this.data && this.chartId)
          {
            this.hideLoader();
            this.chart = this.chartService.buildLineChart(this.labels, this.data, this.chartId);
          }
          break;
        default:
          throw 'unknown chart type';
      }
    }
  }

  private hideLoader(): void
  {
    const loader = document.querySelector('#dataloader');
    if (loader) loader.remove();
  }
  
}

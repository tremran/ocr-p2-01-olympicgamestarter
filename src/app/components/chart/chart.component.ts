import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
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
  @Input() type!: string;
  @Input() labels!: string[];
  @Input() data!: number[];
  @Input() targetPage?: string;

  public chart!:Chart;

  constructor(private chartService: ChartService) {
  }

  ngOnChanges(): void {
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

  private hideLoader(): void
  {
    const loader = document.querySelector('#dataloader');
    if (loader) loader.remove();
  }
  
}

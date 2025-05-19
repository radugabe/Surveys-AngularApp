import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Survey } from '@models/survey.model';
import { CHART_COLORS, CHART_CONFIG } from '@core/constants';

@Component({
  selector: 'results-bar-chart',
  templateUrl: './results-chart-template-component.html',
  standalone: false
})
export class ResultsBarChartComponent implements OnChanges {
  @Input() survey!: Survey;
  @Input() aggregatedResults!: { [questionIndex: number]: { [option: string]: number } };

  charts: ChartConfiguration<'bar'>[] = [];

  ngOnChanges(): void {
    if (this.survey && this.aggregatedResults) {
      this.charts = this.generateBarCharts();
    }
  }

  private generateBarCharts(): ChartConfiguration<'bar'>[] {
    return this.survey.questions.map((question, index) => ({
      type: 'bar',
      data: this.getChartData(question, index),
      options: this.getChartOptions()
    }));
  }

  private getChartData(question: any, index: number): any {
    return {
      labels: Object.keys(this.aggregatedResults[index]),
      datasets: [
        {
          label: question.text,
          data: Object.values(this.aggregatedResults[index]),
          backgroundColor: CHART_COLORS.defaultBorderColor
        }
      ]
    };
  }

  private getChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: this.getPluginOptions(),
      scales: this.getScaleOptions()
    };
  }

  private getPluginOptions(): any {
    return {
      legend: {
        display: false
      }
    };
  }

  private getScaleOptions(): any {
    return {
      y: {
        beginAtZero: true,
        ticks: { color: CHART_COLORS.axisColor },
        grid: { color: CHART_COLORS.gridColor }
      },
      x: {
        ticks: { color: CHART_COLORS.axisColor },
        grid: { color: CHART_COLORS.gridColor }
      }
    };
  }
}

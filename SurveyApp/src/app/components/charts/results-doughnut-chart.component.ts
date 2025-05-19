import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Survey } from '@models/survey.model';
import { ChartConfiguration } from 'chart.js';
import { CHART_COLORS, CHART_CONFIG } from '@core/constants';

@Component({
  selector: 'results-doughnut-chart',
  templateUrl: './results-chart-template-component.html',
  standalone: false
})
export class ResultsDoughnutChartComponent implements OnChanges {
  @Input() survey!: Survey;
  @Input() aggregatedResults!: { [index: number]: { [option: string]: number } };

  charts: ChartConfiguration<'doughnut'>[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.survey && this.aggregatedResults) {
      this.charts = this.generateDoughnutCharts();
    }
  }

  private generateDoughnutCharts(): ChartConfiguration<'doughnut'>[] {
    return this.survey.questions.map((question, questionIndex) => ({
      type: 'doughnut',
      data: this.getChartData(question, questionIndex),
      options: this.getChartOptions()
    }));
  }

  private getChartData(question: any, questionIndex: number): any {
    return {
      labels: Object.keys(this.aggregatedResults[questionIndex]),
      datasets: [
        {
          label: question.text,
          data: Object.values(this.aggregatedResults[questionIndex]),
          backgroundColor: CHART_COLORS.backgroundColors
        }
      ]
    };
  }

  private getChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          align: 'center',
          labels: {
            color: CHART_COLORS.axisColor,
            padding: CHART_CONFIG.labelPadding,
            font: {
              size: CHART_CONFIG.fontSize
            }
          }
        }
      }
    };
  }
}

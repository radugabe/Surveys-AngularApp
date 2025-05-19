import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Survey } from '@models/survey.model';
import { CHART_COLORS, CHART_CONFIG } from '@core/constants';
@Component({
  selector: 'results-line-chart',
  templateUrl: './results-chart-template-component.html',
  standalone: false
})
export class ResultsLineChartComponent implements OnChanges {
  @Input() survey!: Survey;
  @Input() aggregatedResults!: { [questionIndex: number]: { [option: string]: number } };

  charts: ChartConfiguration<'line'>[] = [];

  ngOnChanges(): void {
    if (this.survey && this.aggregatedResults) {
      this.charts = this.generateLineCharts();
    }
  }

  private generateLineCharts(): ChartConfiguration<'line'>[] {
    return this.survey.questions.map((question, questionIndex) => ({
      type: 'line',
      data: this.getChartData(question, questionIndex),
      options: this.getChartOptions()
    }));
  }

  private getChartData(question: any, questionIndex: number): any {
    const labels = this.getLabels(questionIndex);
    const data = this.getData(questionIndex);

    return {
      labels,
      datasets: [
        {
          label: question.text,
          data,
          borderColor: CHART_COLORS.defaultBorderColor,
          fill: false,
          tension: CHART_CONFIG.defaultTension,
        }
      ]
    };
  }

  private getLabels(questionIndex: number): string[] {
    const labels = Object.keys(this.aggregatedResults[questionIndex]);
    return questionIndex === 0 ? ['', ...labels] : labels;
  }

  private getData(questionIndex: number): number[] {
    const data = Object.values(this.aggregatedResults[questionIndex]);
    return questionIndex === 0 ? [0, ...data] : data;
  }

  private getChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: this.getScaleOptions()
    };
  }

  private getScaleOptions(): any {
    return {
      x: {
        ticks: {
          color: CHART_COLORS.axisColor
        },
        grid: {
          color: CHART_COLORS.gridColor
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: CHART_COLORS.axisColor
        },
        grid: {
          color: CHART_COLORS.gridColor
        }
      }
    };
  }
}
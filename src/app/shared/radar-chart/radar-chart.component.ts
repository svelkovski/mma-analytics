import { Component, input, OnChanges } from '@angular/core';
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Fighter } from '../../fighters/fighter.model';

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css',
})
export class RadarChartComponent implements OnChanges {
  fighter1 = input.required<Fighter>();
  fighter2 = input.required<Fighter>();

  chart: any;

  ngOnChanges() {
    if (this.fighter1() && this.fighter2()) {
      this.createChart();
    }
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const data1 = this.normalizeStats(this.fighter1());
    const data2 = this.normalizeStats(this.fighter2());

    this.chart = new Chart('radarChart', {
      type: 'radar',
      data: {
        labels: ['Win Rate', 'Leg Reach', 'Arm Reach', 'Height', 'Weight'],
        datasets: [
          {
            label: this.fighter1().name,
            data: data1,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
          },
          {
            label: this.fighter2().name,
            data: data2,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              display: false,
            },
            grid: {
              color: '#444',
            },
            angleLines: {
              color: '#555',
            },
            pointLabels: {
              color: '#ddd',
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label;
                const fighter =
                  context.dataset.label === this.fighter1().name
                    ? this.fighter1()
                    : this.fighter2();

                switch (label) {
                  case 'Win Rate':
                    return `${fighter.name}: ${this.calculateWinRate(fighter)}%`;

                  case 'Height':
                    return `${fighter.name}: ${fighter.height} in`;

                  case 'Weight':
                    return `${fighter.name}: ${fighter.weight} lbs`;

                  case 'Arm Reach':
                    return `${fighter.name}: ${fighter.reach} in`;

                  case 'Leg Reach':
                    return `${fighter.name}: ${fighter.legReach} in`;

                  default:
                    return '';
                }
              },
            },
          },
          legend: {
            labels: {
              color: '#fff',
            },
          },
        },
      },
    });
  }

  normalizeStats(fighter: Fighter): number[] {
    const winRate = this.calculateWinRate(fighter);

    return [
      this.normalize(winRate, 0, 100),
      this.normalize(fighter.legReach, 35, 50),
      this.normalize(fighter.reach, 60, 85),
      this.normalize(fighter.height, 63, 84),
      this.normalize(fighter.weight, 115, 265),
    ];
  }

  normalize(value: number, min: number, max: number): number {
    return ((value - min) / (max - min)) * 100;
  }

  calculateWinRate(fighter: Fighter): number {
    const total = fighter.wins + fighter.losses + fighter.draws;

    if (total === 0) {
      return 0;
    }

    return Math.round((fighter.wins / total) * 100);
  }
}

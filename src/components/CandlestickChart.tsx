import React, { useEffect, useRef } from 'react';
import { Chart, registerables, CategoryScale, LinearScale, Tooltip, Title, TimeScale } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

// Register the necessary components
Chart.register(CandlestickController, CandlestickElement, CategoryScale, LinearScale, Tooltip, Title, TimeScale);
Chart.register(...registerables);

interface CandlestickChartProps {
  data: { x: number; open: number; high: number; low: number; close: number }[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the existing chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'candlestick',
          data: {
            datasets: [{
              label: 'Candlestick Dataset',
              data: data.map(point => ({
                x: point.x, 
                o: point.open,
                h: point.high,
                l: point.low,
                c: point.close
              }))
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const { o, h, l, c } = context.raw as { o: number; h: number; l: number; c: number };
                    return `Open: ${o}, High: ${h}, Low: ${l}, Close: ${c}`;
                  }
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <h2>Candlestick Chart</h2>
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
};

export default CandlestickChart;

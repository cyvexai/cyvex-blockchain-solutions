"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "Platform & Liquidity",
    "Team & Advisors",
    "Community & Airdrops",
    "Ecosystem Fund",
    "Reserve",
  ],
  datasets: [
    {
      data: [40, 20, 20, 10, 10],
      backgroundColor: [
        "#a855f7",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#10b981",
      ],
      hoverOffset: 4,
      borderWidth: 0,
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  cutout: "50%", // 50% inner radius → donut
  plugins: {
    legend: { display: false },
    tooltip: {
      displayColors: false, // hide the little color box
      callbacks: {
        label: (tooltipItem) => {
          const dataset = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex];
          const value = dataset.data[tooltipItem.dataIndex] as number;
          const total = (dataset.data as number[]).reduce((sum, v) => sum + v, 0);
          const pct = ((value / total) * 100).toFixed(1);
          return `${tooltipItem.label}: ${pct}%`;
        },
      },
      backgroundColor: "#1f1f1f",
      titleColor: "#fff",
      bodyColor: "#ddd",
    },
  },
};

export default function TokenomicsChart() {
  return (
    <div className="w-64 h-64 mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
}
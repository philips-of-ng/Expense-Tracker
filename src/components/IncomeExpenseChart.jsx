import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeExpenseChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [500, 800, 600, 900, 750, 1000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Expenses',
        data: [400, 600, 500, 700, 650, 800],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expenses (Monthly)',
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
};

export default IncomeExpenseChart;

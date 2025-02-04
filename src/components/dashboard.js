import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch data from API
    axios
      .get("http://cintabahasa.devdonos.pro/api/dashboard/courses")
      .then((response) => {
        const data = response.data;
        const courses = data.map((course) => course.course);
        const totals = data.map((course) => course.total);

        setChartData({
          labels: courses,
          datasets: [
            {
              label: "Total",
              data: totals,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Cinta Bahasa</p>
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Course Statistics",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;

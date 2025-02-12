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
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from API
    axios
      .get("https://api.cintabahasa.com/api/dashboard/courses")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          const uniqueCourses = Array.from(
            new Set(data.map((course) => course.course))
          );
          const totals = uniqueCourses.map((courseName) => {
            const course = data.find((c) => c.course === courseName);
            return course ? course.total : 0;
          });

          setChartData({
            labels: uniqueCourses,
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
        } else {
          console.error("Unexpected data format:", data);
        }
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
        {chartData ? (
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
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

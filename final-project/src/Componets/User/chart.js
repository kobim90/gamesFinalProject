import React from "react";
import { useEffect, useState } from "react";
import { getUsersGamesScores } from "../../DAL/api";
import { Bar } from "react-chartjs-2";
import Container from "react-bootstrap/esm/Container";
import AOS from 'aos';
import 'aos/dist/aos.css'

function GameChart(props) {
  const [usersScore, setUsersScore] = useState([]);
  const[chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Your Scores",
        data: [],
        backgroundColor: "rgb(0,20,35)",
        borderColor: "rgb(0,20,35)",
        borderWidth: 1,
        hoverBackgroundColor: "rgb(239, 51, 64)",
      },
      {
        label: "Avg Scores",
        data: [],
        backgroundColor: "rgb(156,156,156)",
        borderColor: "rgb(156,156,156)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getScores();
    AOS.init({duration: 3000});
  }, []);


  async function getScores() {
    const scores = await getUsersGamesScores();
    const newdata = {...chartData}
    newdata.labels = scores.lables
    newdata.datasets[0].data = scores.userScores
    newdata.datasets[1].data = scores.avgScores
    setChartData(newdata)
  }


  return (
    <Container className="chart-div">
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          indexAxis: "y",
          responsive: true,
          maintainAspectRatiomaintainAspectRatio: false,
        }}
      />
    </Container>
  );
}

export default GameChart;

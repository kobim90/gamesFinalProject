import React from "react";
import { useEffect, useState } from "react";
import { getUsersGamesScores } from "../../DAL/api";
import { Bar } from "react-chartjs-2";
import Container from "react-bootstrap/esm/Container";

function GameChart(props) {
  const [usersScore, setUsersScore] = useState([]);
  const[chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Your Scores",
        data: [],
        backgroundColor: "rgb(254, 176, 106)",
        borderColor: "rgb(254, 176, 106)",
        borderWidth: 1,
        hoverBackgroundColor: "rgb(54, 214, 231)",
      },
      {
        label: "Avg Scores",
        data: [],
        backgroundColor: "rgb(93, 108, 137)",
        borderColor: "rgb(93, 108, 137)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getScores();
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

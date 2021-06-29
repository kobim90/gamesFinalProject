import React from 'react';
import { useEffect, useState } from 'react';
import { getUsersGamesApi } from "../../DAL/api";
import {Bar} from "react-chartjs-2"

function GameChart(props) {
    const [usersGames, setUsersGames] = useState([]);

  useEffect(() => {
    (async function getData() {
      const games = await getUsersGamesApi("kobi");
      setUsersGames(games);
    })();
  }, []);


  const chartLabels = () => {
      const lables = [];
      usersGames.forEach(game => {
          lables.push(game.gameName)
      });
      return lables;
  }


    return (
        <div>
        <Bar
            data={{
                labels: chartLabels(),
                datasets: [
                  {
                    label: 'Your Scores',
                    data: [8, 10, 9, 5, 7, 8, 9, 7.5, 9.5],
                    backgroundColor:"rgb(254, 176, 106)",
                  borderColor: "rgb(254, 176, 106)",
                  borderWidth: 1,
                  hoverBackgroundColor: "rgb(54, 214, 231)"
                  },
                  {
                    label: 'Avg Scores',
                    data: [10, 8, 6, 7, 9, 5.5, 9.7, 9.5, 6.5],
                    backgroundColor: "rgb(93, 108, 137)",
                  borderColor: "rgb(93, 108, 137)",
                  borderWidth: 1,
                  
                  },
                ],
            }}  
            options={{maintainAspectRatio: false, indexAxis: 'y', responsive: true, maintainAspectRatiomaintainAspectRatio: false}}
        />
        </div>
    )
}

export default GameChart;
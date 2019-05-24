import React from "react";
import { Grid } from "semantic-ui-react";

import GameBoard from "../components/GameBoard";
import Scoreboard from "../components/Scoreboard";
import Timer from "../components/Timer";
import Clue from "../components/Clue";

const MainCanvas = () => (
  <Grid columns={4} centered>
    <Grid.Row verticalAlign="top">
      <Grid.Column width={3}>
        <Scoreboard />
      </Grid.Column>
      <Grid.Column width={10}>
        <Clue />
        <GameBoard />
      </Grid.Column>
      <Grid.Column width={3}>
        <Timer />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered columns={16}>
      <Grid.Column width={3}> </Grid.Column>
      <Grid.Column width={10} align="center">
        Placeholder for Spymaster Component
      </Grid.Column>
      <Grid.Column width={3}> </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default MainCanvas;

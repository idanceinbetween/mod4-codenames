import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import AbsoluteWrapper from '../components/AbsoluteWrapper'

const About = () => (
  <AbsoluteWrapper>
    <Segment raised textAlign='left'>
      <h1>About This Web App</h1>
      <p>
        This project is a digital re-creation of Codenames, a beloved card game
        at Flatiron School, London campus. It is created as a project for Mod 4
        of our learning.
      </p>
      <h2>Technical Details </h2>
      <p>
        The app: Has a Rails API backend with a separate React frontend. Has at
        least three resources on the backend, and has full CRUD actions for at
        least one resource. Has two different client-side routes.
      </p>
      <h2>Authors</h2>
      <p>
        Diogo Costa (@industriousparadigm) and JiaXuan Hon (@idanceinbetween)
        from Inglorious BA$Hterds (aka 031119 cohort), Flatiron School, London.
      </p>
      <Image src='https://camo.githubusercontent.com/b3b1b5373cf1d916785f0adabf0f6cb3a3aef034/68747470733a2f2f692e6962622e636f2f304d68723473772f496d6167652d66726f6d2d692d4f532e6a7067' />
      <h1>About Codenames</h1>
      <p>
        Codenames is a 2015 card game for 4–8 players designed by Vlaada Chvátil
        and published by Czech Games. Two teams compete by each having a
        Spymaster give one word clues which can point to multiple words on the
        board. The other players on the team attempt to guess their team's words
        while avoiding the words of the other team. In the 2–3 player variant,
        one Spymaster gives clues to the other player or players. In 2016
        Codenames won the Spiel des Jahres award for the best board game of the
        year.
      </p>
    </Segment>
  </AbsoluteWrapper>
)
export default About

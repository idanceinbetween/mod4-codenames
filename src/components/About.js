import React from 'react'
import { Grid, Image, Segment, Icon } from 'semantic-ui-react'
import AbsoluteWrapper from '../components/AbsoluteWrapper'
import { Link } from 'react-router-dom'

const About = () => (
  <AbsoluteWrapper>
    <Grid columns={3} textAlign='center' verticalAlign='top'>
      <Grid.Row verticalAlign='top'>
        <Grid.Column width={3} />
        <Grid.Column width={10}>
          <Segment.Group>
            <Segment raised textAlign='left'>
              <h1>About CodenamesIB</h1>
              <p>
                This project CodenamesIB is a digital re-creation of Codenames,
                a card game loved by the Inglorious BA$Hterds cohort at Flatiron
                School, London. It is created as a project for Mod 4 of the
                bootcamp where we focused on creating React.
              </p>
              <h2>Technical Details </h2>
              <p>
                The app has:
                <ul>
                  <li>a React frontend</li>
                  <li>a Rails API backend</li>
                  <li>at least three resources on the backend</li>
                  <li>full CRUD actions for at least one resource</li>
                  <li>has two different client-side routes</li>
                </ul>
              </p>
              <h2>Authors</h2>
              <p>
                Diogo Costa (
                <a
                  href='https://github.com/industriousparadigm'
                  target='_blank'
                >
                  @industriousparadigm
                </a>
                ) and JiaXuan Hon (
                <a href='https://github.com/idanceinbetween/' target='_blank'>
                  @idanceinbetween
                </a>
                ) from Inglorious BA$Hterds (aka 031119 cohort), Flatiron
                School, London.
              </p>
              <p align='center'>
                <Image src='https://camo.githubusercontent.com/b3b1b5373cf1d916785f0adabf0f6cb3a3aef034/68747470733a2f2f692e6962622e636f2f304d68723473772f496d6167652d66726f6d2d692d4f532e6a7067' />
              </p>
            </Segment>
            <Segment textAlign='left'>
              <h1>
                About Codenames{' '}
                <a href='https://czechgames.com/en/codenames/' target='_blank'>
                  <Icon link name='external alternate' />
                </a>
              </h1>
              <p>
                Codenames is a 2015 card game for 4–8 players designed by Vlaada
                Chvátil and published by Czech Games.
              </p>
              <p>
                Two teams compete by each having a Spymaster give one word clues
                which can point to multiple words on the board. The other
                players on the team attempt to guess their team's words while
                avoiding the words of the other team. In the 2–3 player variant,
                one Spymaster gives clues to the other player or players.{' '}
              </p>
              <p>
                In 2016 Codenames won the Spiel des Jahres award for the best
                board game of the year.
              </p>
            </Segment>
          </Segment.Group>
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid.Row>
    </Grid>
  </AbsoluteWrapper>
)
export default About

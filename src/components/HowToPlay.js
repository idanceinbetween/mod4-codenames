import React from 'react'

const HowToPlay = () => {
  return (
    <div>
      <h1>How to Play Codenames</h1>
      <div align='justify'>
        <p>
          You are a spy and I need your help. We need to contact all our agents
          in the field via their special codenames, but I can only give you one
          word for a clue as your spymaster. We need to hurry before the rival
          spies contact all their agents before us! Hurry before it's too late,
          but beware of the assassin!!
        </p>
        <p>
          {' '}
          The games starts with 25 codenames lined up in a 5 x 5 grid in the
          center of the table, and everyone divided up into 2 teams.{' '}
        </p>
        <p>
          Each team picks a spymaster. The spymasters are the only ones who
          could identify which codenames line up with which field agents. The
          spymaster must give a one word clue to help identify an agent(s) in
          the field (on the table) along with a number, which corresponds to the
          number of agents. Ideally they will be connecting 2 or more agents via
          the clue and their codename. For example they will say things like:
          “Elements: 2” “Animals: 3”{' '}
        </p>
        <p>
          You and your team must then decide on which codenames the spymaster is
          trying to connect. Once you decide you touch the codename and the
          spymaster puts an agent/bystander/assassin (blue and red/beige/black
          respectively) onto the clue. Whoever contacts (i.e. correctly guesses)
          all their field agents’ first, wins!{' '}
        </p>
        <p>
          If you guess incorrectly, your team’s turn is over. If you guess the
          dreaded assassin (see picture below), you lose!
        </p>
        <p>
          You must guess at least once, and you can have an extra guess (above
          the given number) if you want to try to get a previous clue you messed
          up on. Spymasters must not communicate in any way other than a clue
          and a number.
        </p>
      </div>
    </div>
  )
}

export default HowToPlay

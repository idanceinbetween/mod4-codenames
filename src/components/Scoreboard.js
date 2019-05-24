import React from "react";
import { Header, Image, Table } from "semantic-ui-react";

const Scoreboard = props => (
  <Table basic="very" celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Team</Table.HeaderCell>
        <Table.HeaderCell>Score</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image>
            <Image
              src="https://react.semantic-ui.com/images/avatar/small/lena.png"
              rounded
              size="mini"
            />
            <Header.Content>Red</Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
          {props.scores.find(o => o.color === "red").score}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image>
            <Image
              src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
              rounded
              size="mini"
            />
            <Header.Content>Blue</Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
          {props.scores.find(o => o.color === "blue").score}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default Scoreboard;

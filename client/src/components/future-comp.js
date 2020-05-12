import React from 'react'
import {Container, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap'

const AboutComp = (props) => {
  return (
    <Container>
      <ListGroupItemHeading>Future Ideas</ListGroupItemHeading>
      <ListGroup>
        <ListGroupItem>Allow user to add to custom data for model</ListGroupItem>
        <ListGroupItem>Load real-world dataset from Kaggle</ListGroupItem>
        <ListGroupItem>Make graph interactive</ListGroupItem>
      </ListGroup>
    </Container>
  );
}
export default AboutComp


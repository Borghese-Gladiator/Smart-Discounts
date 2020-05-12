import React from 'react'
import {Container, Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap'

const AboutComp = (props) => {
  return (
    <Container>
      <h1><b>LOGISTIC REGRESSION</b></h1>
      <p>Welcome to my project. I use logistic regression to determine which users should receive discount codes based on amount spent. I use gradient descent to create my model (though it is based off of a small set of custom data as seen below)</p>
      <Row>
        <Col sm="6">
          <Card body>
            <CardTitle>Just Want to see the Codelab?</CardTitle>
            <Button><a href="https://colab.research.google.com/drive/1slwE2MJMbi4L9J0YQMRIpiaIGhPA4E1C">Click Here</a></Button>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardTitle>See the GitHub Repo?</CardTitle>
            <Button><a href="">Click Here</a></Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default AboutComp


import React, { Component } from 'react'
import { Container, Row, Col, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const RegressionTable = (props) => {
  return (
    <Table dark>
      <thead>
        <tr>
          <th>#</th>
          <th>Amount Spent</th>
          <th>Send Discount</th>
        </tr>
      </thead>
      <tbody>
        {
          props.data.map((value, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{value["amount_spent"]}</td>
                <td>{value["send_discount"]}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  );
}

const RegressionGraph = (props) => {
  return (
    <ScatterChart
      width={400}
      height={400}
      margin={{
        top: 20, right: 20, bottom: 20, left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="amount_spent" name="Amount Spent" />
      <YAxis type="number" dataKey="send_discount" name="YES / NO" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="Amount Spent vs Send Discount" data={props.data} fill="#8884d8" />
    </ScatterChart>
  )
}

class RegressionDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "data":[{
          "key": 1,
          "name": "James",
          "amount_spent": 50,
          "send_discount": 0
        },
        {
          "key": 2,
          "name": "Meghan",
          "amount_spent": 10,
          "send_discount": 1
        },
        {
          "key": 3,
          "name": "John",
          "amount_spent": 20,
          "send_discount": 1
        },
        {
          "key": 4,
          "name": "Jessica",
          "amount_spent": 5,
          "send_discount": 1
        },
        {
          "key": 5,
          "name": "Kevin",
          "amount_spent": 95,
          "send_discount": 0
        },
        {
          "key": 6,
          "name": "Juliet",
          "amount_spent": 70,
          "send_discount": 0
        },
        {
          "key": 7,
          "name": "Oscar",
          "amount_spent": 100,
          "send_discount": 0
        },
        {
          "key": 8,
          "name": "Mary",
          "amount_spent": 200,
          "send_discount": 0
        },
        {
          "key": 9,
          "name": "Tim",
          "amount_spent": 0,
          "send_discount": 1
        }
      ],
      "formData": 0,
      "predPoint": 0
    }
    this.predictDiscount = this.predictDiscount.bind(this)
  }

  componentDidMount() {
    fetch('/time').then(res => res.json()).then(data => {
      console.log("TIME: " + data.time.toString())
    });
    fetch('/api/data/all').then(res => res.json()).then(data => {
      console.log(data)
    });
  }

  onInputChange(value) {
    this.setState({
      formData: value
    })
  }

  predictDiscount() {
    // let data = new FormData();
    // data.append("arr_amount_spent", [Number(this.state.formData)] );
    let data = JSON.stringify({ "arr_amount_spent" :[Number(this.state.formData)] })
    console.log(data)
    fetch('/api/data/predict/1',
    {
      method: "POST",
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      this.setState({
        predPoint: data.predictions
      })
    })
  }

  render() {
  
    return (
      <Container>
        <Row>
          <Col sm="6">
            <h2>Custom Data</h2>
            <RegressionTable data={this.state.data}/>
            <br />
            <Form>
              <FormGroup>
                <Label for="exampleAmount">Amount Spent</Label>
                <Input name="amount" type="number" onChange={(e) => this.onInputChange(`${e.target.value}`)} placeholder="enter number" />
              </FormGroup>
              <Button onClick={() => this.predictDiscount()}>Predict Discount</Button>
            </Form>
            <Label for="blah">Send Discount: {this.state.predPoint} , for Amount: { this.state.formData }</Label>
          </Col>
          <Col sm="6">
            <h2>Amount Spent vs Discount</h2>
            <RegressionGraph data={this.state.data} />
            <p>Note: 1 = Send Discount, 0 = No Discount</p>
            <RegressionGraph data={this.state.tempPoint} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RegressionDisplay;
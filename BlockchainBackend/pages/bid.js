import React, { Component } from "react";
import { Form, Input, Button } from "semantic-ui-react";

import web3 from "ethereum/web3";
import contract from "ethereum/contract";
import Layout from "components/Layout";

class Bid extends Component {
  state = {
    bidAmount: 0
  };

  handleOnSubmit = async event => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      console.log(this.state.bidAmount);
      await contract.methods.bid().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.bidAmount, "ether")
      });

      // reset state
      this.setState({
        bidAmount: 0
      });
    } catch (err) {
      console.log("An Error occured: " + err);
    }
  };

  render() {
    return (
      <Layout>
        <h3>Place Bid</h3>
        <Form onSubmit={this.handleOnSubmit}>
          <Form.Field required>
            <Input
              label="Bid Amount in Ether"
              type="number"
              icon="money"
              value={this.state.bidAmount}
              onChange={event =>
                this.setState({ bidAmount: event.target.value })
              }
            />
          </Form.Field>
          <Button type="submit">Place Bid</Button>
        </Form>
      </Layout>
    );
  }
}

export default Bid;

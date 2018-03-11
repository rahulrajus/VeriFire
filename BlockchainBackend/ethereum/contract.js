// import our web3 instance
import web3 from "./web3";
import Contract from "./build/SimpleAuction.json";

// get Contract instance
// replace <> with the address of your deployed Contract instance
// use web3 to get the contract instance
const instance = new web3.eth.Contract(
  JSON.parse(Contract.interface),
  "0xc0D975bf8F418a8d01ad6fe7AA32e1b3330b63B3"
);

export default instance;

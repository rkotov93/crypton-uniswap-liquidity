import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
};

export default config;

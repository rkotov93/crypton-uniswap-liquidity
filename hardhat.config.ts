import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import { HardhatUserConfig } from "hardhat/config";

require('./tasks')

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      metadata: {
        bytecodeHash: "none",
      },
      optimizer: {
        enabled: true,
        runs: 800,
      }
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC
      },
      forking: {
        url: <string>process.env.GOERLI_RPC_URI,
        blockNumber: 9317394
      }
    },
    goerli: {
      url: <string>process.env.GOERLI_RPC_URI
    }
  }
};

export default config;

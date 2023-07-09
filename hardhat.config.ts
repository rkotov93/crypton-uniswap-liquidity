import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+"/.env" });

import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
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
      },
      chainId: 31337
    },
    goerli: {
      url: <string>process.env.GOERLI_RPC_URI,
      accounts: {
        mnemonic: process.env.MNEMONIC
      },
      chainId: 5
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default config;

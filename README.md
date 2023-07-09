# Uniswap Liquiduty Example
TokenA address is [0x5f8f3129d2Fa64C889bb7eaB558B1fCDa8A5929e](https://goerli.etherscan.io/address/0x5f8f3129d2Fa64C889bb7eaB558B1fCDa8A5929e)

TokenB address is [0x9A2c1403893abBF8C92D076869259076623856Ce](https://goerli.etherscan.io/address/0x9A2c1403893abBF8C92D076869259076623856Ce)

LiquidityManager address is [0x77048d8B69F5d77Fb454Bfa9f18C0BE4DD6d54A6](https://goerli.etherscan.io/address/0x77048d8B69F5d77Fb454Bfa9f18C0BE4DD6d54A6)

LiquidityPool for TokenA and TokenB address is [0x8347AFED966b05BaEEf39552E7F1F2F76830F245](https://goerli.etherscan.io/address/0x8347AFED966b05BaEEf39552E7F1F2F76830F245)

## Installation
Clone the repository using the following command:
Install the dependencies using the following command:
```bash
yarn install
```

## Deployment

Fill in all the required environment variables(copy .env-example to .env and fill it).

Deploy contract to the chain (mumbai testnet):
```bash
npx hardhat run scripts/deployTokens.ts --network <localhost|goerli>
npx hardhat run scripts/deployLiquidityManager.ts --network <localhost|goerli>
```

## Tasks
Running a task:
```bash
npx hardhat addLiquidity --amount-a 100000000000000000 --amount-b 100000000000000000 --network <localhost|goerli>
```

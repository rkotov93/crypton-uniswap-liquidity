import { ethers } from "hardhat";

async function main() {
  const LiquidityManager = await ethers.getContractFactory("LiquidityManager")
  const factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
  const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
  const liquidityManager = await LiquidityManager.deploy(factoryAddress, routerAddress)
  await liquidityManager.deployed()
  console.log(`LiquidityManager deployed to ${liquidityManager.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

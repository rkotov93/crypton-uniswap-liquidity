import { ethers } from "hardhat"
import { Contract } from "ethers"
// import IUniswapV2Factory from "@uniswap/v2-core/build/IUniswapV2Factory.json"
// import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"

async function liquidityManagerDeploymentFixture() {
  const factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
  const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"

  const iUniswapV2Factory: Contract = await ethers.getContractAt("IUniswapV2Factory", factoryAddress)
  const iUniswapV2Router02: Contract = await ethers.getContractAt("IUniswapV2Router02", routerAddress)

  const LiquidityManager = await ethers.getContractFactory("LiquidityManager")
  const liquidityManager: Contract = await LiquidityManager.deploy(iUniswapV2Factory.address, iUniswapV2Router02.address)
  await liquidityManager.deployed()

  return { iUniswapV2Factory, iUniswapV2Router02, liquidityManager }
}

export { liquidityManagerDeploymentFixture }

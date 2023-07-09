import { ethers } from "hardhat";
import { BigNumber, Contract } from "ethers";

async function deployPairToken(name: string, symbol: string, supply: BigNumber) {
	const PairToken = await ethers.getContractFactory("PairToken")
  const pairToken: Contract = await PairToken.deploy(name, symbol, supply)
	await pairToken.deployed()
  return pairToken
}

async function pairTokensDeploymentFixture() {
  const tokenA = await deployPairToken("PairToken1", "PTK1", ethers.utils.parseUnits("10", "ether"))
  const tokenB = await deployPairToken("PairToken2", "PTK2", ethers.utils.parseUnits("10", "ether"))

  return { tokenA, tokenB };
}

export { pairTokensDeploymentFixture };

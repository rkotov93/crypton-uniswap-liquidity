import { ethers } from "hardhat";
import { BigNumber } from "ethers";

async function deployPairToken(name: string, symbol: string, supply: BigNumber) {
	const PairToken = await ethers.getContractFactory("PairToken");
  const pairToken = await PairToken.deploy(name, symbol, supply);
	await pairToken.deployed();
  console.log(`${name} deployed to ${pairToken.address}`);
}

async function main() {
  await deployPairToken("PairToken1", "PTK1", ethers.utils.parseUnits("10", "ether"))
  await deployPairToken("PairToken2", "PTK2", ethers.utils.parseUnits("10", "ether"))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

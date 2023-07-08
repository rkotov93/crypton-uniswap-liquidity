import fs from "fs"
import { task } from "hardhat/config"
import { BigNumber, Contract, ContractReceipt, ContractTransaction } from "ethers"
import { Address } from "cluster"

function loadAddresses() {
  const json = JSON.parse(fs.readFileSync("./.addresses", "utf-8"))
  const network = hre.network.name
  const addresses = json[network]
  if (!addresses) throw `Contracts not yet deployed to ${network}`

  return addresses
}

async function approve(name: string, token: Contract, spender: string, amount: BigNumber) {
  const transaction: ContractTransaction = await token.approve(spender, amount);
  const receipt: ContractReceipt = await transaction.wait()
  if (!receipt.status) throw `Spending of ${name} was not approved for ${spender}`

  console.log(`Spending of ${name} was approved for ${spender}`)
}

task("addLiquidity", "Adds liquidity for pair tokens")
  .addParam("amountA", "Amount for the first token")
  .addParam("amountB", "Amount for the second token")
  .setAction(async ({ amountA, amountB }, { ethers }) => {
    const addresses = loadAddresses()

    const Token = await ethers.getContractFactory("PairToken")
    const tokenA: Contract = Token.attach(addresses["TokenA"])
    const tokenB: Contract = Token.attach(addresses["TokenB"])

    const LiquidityManager = await ethers.getContractFactory("LiquidityManager")
    const liquidityManager: Contract = LiquidityManager.attach(addresses["LiquidityManager"])

    await approve("TokenA", tokenA, liquidityManager.address, amountA)
    await approve("TokenB", tokenB, liquidityManager.address, amountB)

    const transaction: ContractTransaction =
      await liquidityManager.addLiquidity(tokenA.address, tokenB.address, amountA, amountB)
    const receipt: ContractReceipt = await transaction.wait()

    const event = receipt.events?.find(event => event.event === 'AddedLiquidity');
    if (!receipt.status) throw "addLiquidity was reverted"
    if (!event) throw "AddedLiquidity event was not found"

    const eTokenA: Address = event.args!['tokenA'];
    const eTokenB: Address = event.args!['tokenB'];
    const eAmountA: BigNumber = event.args!['amountA'];
    const eAmountB: BigNumber = event.args!['amountB'];
    const eCreator: Address = event.args!['amountB'];
    const eLPpair: Address = event.args!['LPpair'];

    console.log(`eTokenA: ${eTokenA}`)
    console.log(`eTokenB: ${eTokenB}`)
    console.log(`eAmountA: ${eAmountA}`)
    console.log(`eAmountB: ${eAmountB}`)
    console.log(`eCreator: ${eCreator}`)
    console.log(`eLPpair: ${eLPpair}`)
  })

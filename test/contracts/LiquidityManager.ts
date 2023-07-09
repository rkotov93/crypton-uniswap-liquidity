import { expect } from "chai"
import { ethers } from "hardhat"
import { BigNumber, Contract } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"

import { pairTokensDeploymentFixture } from "../fixtures/pairTokens"
import { liquidityManagerDeploymentFixture } from "../fixtures/liquidityManager"

describe("LiquidityManager", () => {
  let owner: SignerWithAddress
  let accounts: SignerWithAddress[]
  let tokenA: Contract
  let tokenB: Contract
  let iUniswapV2Factory: Contract
  let iUniswapV2Router02: Contract
  let liquidityManager: Contract

  before(async () => {
    [owner, ...accounts] = await ethers.getSigners();
    ({ tokenA, tokenB } = await loadFixture(pairTokensDeploymentFixture));
    ({ iUniswapV2Factory, iUniswapV2Router02, liquidityManager }
        = await loadFixture(liquidityManagerDeploymentFixture));
  })

  describe("#addLiquidity", () => {
    let amountA: BigNumber
    let amountB: BigNumber
    const expectedPairAddress = async () => await iUniswapV2Factory.getPair(tokenA.address, tokenB.address)

    beforeEach(() => {
      amountA = ethers.utils.parseUnits("1", "ether")
      amountB = ethers.utils.parseUnits("1", "ether")
    })

    context("when owner approved LiquidityManager with required balance", () => {
      beforeEach(async () => {
        await tokenA.approve(liquidityManager.address, amountA)
        await tokenB.approve(liquidityManager.address, amountB)
      })

      it("puts owner's tokens to liquidity pool", async () => {
        let pairAddress
        expect(await liquidityManager.addLiquidity(tokenA.address, tokenB.address, amountA, amountB))
          .to.emit(liquidityManager, "AddedLiquidity")
          .withArgs(
            tokenA.address, tokenB.address, amountA, amountB, owner.address, pairAddress = await expectedPairAddress()
          )
          .to.changeTokenBalance(tokenA, [owner, pairAddress], [-amountA, amountA])
          .to.changeTokenBalance(tokenB, [owner, pairAddress], [-amountB, amountB])
      })
    })

    context("when owner did'nt approve LiquidityManager with required balance", () => {
      it("reverts transaction", async () => {
        await expect(liquidityManager.addLiquidity(tokenA.address, tokenB.address, amountA, amountB))
          .to.be.revertedWith("ERC20: insufficient allowance")
      })
    })
  })
})

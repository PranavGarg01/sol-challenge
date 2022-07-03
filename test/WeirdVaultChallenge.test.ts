import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { WeirdVaultChallenge, ForceSender } from '../typechain-types'

const toWei = ethers.utils.parseEther

describe('WeirdVaultChallenge', async function () {
  let player: SignerWithAddress
  let challenge: WeirdVaultChallenge
  let fs: ForceSender

  beforeEach(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('WeirdVaultChallenge')
    challenge = (await Challenge.deploy()) as WeirdVaultChallenge
  })

  it('Attack', async function () {
    const Fs = await ethers.getContractFactory('ForceSender')
    fs = (await Fs.deploy(challenge.address, {
      value: toWei('100'),
    })) as ForceSender
    await challenge.complete()
    expect(await challenge.isSolved()).to.be.true
  })
})

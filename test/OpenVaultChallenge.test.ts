import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { OpenVaultChallenge, OpenVaultSolution } from '../typechain-types'
import { toWei } from './helpers/utils'

describe('OpenVaultChallenge', async function () {
  let player: SignerWithAddress
  let challenge: OpenVaultChallenge
  let ovs: OpenVaultSolution

  beforeEach(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('OpenVaultChallenge')
    challenge = (await Challenge.deploy({
      value: toWei('1'),
    })) as OpenVaultChallenge
  })

  it('Attack', async function () {
    const Ovs = await ethers.getContractFactory('OpenVaultSolution')
    ovs = (await Ovs.deploy(challenge.address)) as OpenVaultSolution
    expect(await challenge.isSolved()).to.be.true
  })
})

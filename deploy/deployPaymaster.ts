import { deployContract, getWallet, getProvider } from "./utils"
import { getDeployer, verifyContract } from "./utils"
import * as ethers from "ethers"

import dotenv from "dotenv"
dotenv.config()

export default async function () {
    // Load the stable coin contract
    const provider = getProvider()
    const wallet = getWallet()
    const deployer = getDeployer()
    const stableCoinAddress = process.env.STABLE_COIN_ADDRESS
    const stableCoinArtifact = await deployer.loadArtifact("AAFactory")
    const stableCoinContract = new ethers.Contract(
        stableCoinAddress,
        stableCoinArtifact.abi,
        wallet
    )
    console.log(`Stable Coin address: ${stableCoinAddress}`)

    // Supplying the ERC20 tokens to the wallet:
    // We will give the wallet 3 units of the token:
    await (await stableCoinContract.mint(wallet.address, 10000)).wait()
    console.log("Minted 10000 tokens for the wallet")

    // deploy paymaster
    const paymaster = await deployContract("StableCoinPaymaster", [
        stableCoinAddress
    ])
    const paymasterAddress = await paymaster.getAddress()
    console.log(`Paymaster address: ${paymasterAddress}`)

    // Supplying paymaster with ETH
    console.log("Funding paymaster with ETH...")
    await (
        await wallet.sendTransaction({
            to: paymasterAddress,
            value: ethers.parseEther("0.01")
        })
    ).wait()
    const paymasterBalance = await provider.getBalance(paymasterAddress)
    console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`)

    console.log(`Done!`)
}

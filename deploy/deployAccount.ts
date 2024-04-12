;

// load env file
import dotenv from "dotenv";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { utils } from "zksync-ethers";
import { getDeployer, getWallet, verifyContract } from "./utils";


;








dotenv.config()
export default async function (hre: HardhatRuntimeEnvironment) {
    // Load the factory
    const wallet = getWallet()
    const deployer = getDeployer()
    const factoryArtifact = await deployer.loadArtifact("AAFactory")
    const aaArtifact = await deployer.loadArtifact("Account")
    const vaultAddress = process.env.VAULT_ADDRESS
    const factoryAddress = process.env.ACCOUNT_FACTORY_ADDRESS
    console.log(`AA factory address: ${factoryAddress}`)
    const aaFactory = new ethers.Contract(
        factoryAddress,
        factoryArtifact.abi,
        wallet
    )

    // Deploy account with factory
    const ownerAddress = wallet.address
    const salt = ethers.randomBytes(32)
    const tx = await aaFactory.deployAccount(salt, ownerAddress)
    await tx.wait()

    const abiCoder = new ethers.AbiCoder()
    const constructorArgs = abiCoder.encode(
        ["address", "address"],
        [ownerAddress, vaultAddress]
    )
    console.log(constructorArgs)
    const accountAddress = utils.create2Address(
        factoryAddress,
        await aaFactory.aaBytecodeHash(),
        salt,
        constructorArgs
    )
    console.log(`Account deployed on address ${accountAddress}`)

    // Funding account with ETH
    console.log("Funding smart contract account with some ETH")
    await (
        await wallet.sendTransaction({
            to: accountAddress,
            value: ethers.parseEther("0.00001")
        })
    ).wait()

    // Verify the account
    const fullContractSource = `${aaArtifact.sourceName}:${aaArtifact.contractName}`
    if (hre.network.config.verifyURL) {
        const retryTime = 1
        for (let i = 0; i < retryTime; i++) {
            try {
                console.log(`Requesting contract verification...`)
                await verifyContract({
                    address: accountAddress,
                    contract: fullContractSource,
                    constructorArguments: constructorArgs,
                    bytecode: aaArtifact.bytecode
                })
                break
            } catch (e) {
                console.log(e)
                await timeout(3000)
            }
        }
    }
    console.log(`Done!`)
}

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
import { utils } from "zksync-ethers"
import * as ethers from "ethers"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { getWallet, getDeployer, verifyContract } from "./utils"

// load env file
import dotenv from "dotenv"
dotenv.config()
export default async function (hre: HardhatRuntimeEnvironment) {
    // Load the factory
    const wallet = getWallet()
    const deployer = getDeployer()
    const factoryArtifact = await deployer.loadArtifact("AAFactory")
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
    const accountAddress = utils.create2Address(
        factoryAddress,
        await aaFactory.aaBytecodeHash(),
        salt,
        abiCoder.encode(["address"], [ownerAddress])
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
    // doesn't support for account now
    // https://github.com/matter-labs/zksync-era/issues/1629

    /**
  const aaArtifact = await deployer.loadArtifact("Account");
  const constructorArgs = abiCoder.encode(
    ["bytes32", "address"],
    [salt, ownerAddress]
  );
  const fullContractSource = `${aaArtifact.sourceName}:${aaArtifact.contractName}`;
  if (hre.network.config.verifyURL) {
    console.log(`Requesting contract verification...`);
    for (let i = 0; i < 50; i++) {
      console.log(i);
      try {
        await verifyContract({
          address: accountAddress,
          contract: fullContractSource,
          constructorArguments: constructorArgs,
          bytecode: aaArtifact.bytecode,
        });
        break;
      } catch (e) {
        console.log(e);
        await timeout(3000);
      }
    }
  }
 */
    console.log(`Done!`)
}

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

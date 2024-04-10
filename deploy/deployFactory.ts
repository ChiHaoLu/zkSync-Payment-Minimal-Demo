import { utils } from "zksync-ethers";
import { getDeployer, verifyContract } from "./utils";
import * as hre from "hardhat";

import dotenv from "dotenv";
dotenv.config();

export default async function () {
  const vault = process.env.VAULT_ADDRESS;
  const deployer = getDeployer()
  const factoryArtifact = await deployer.loadArtifact("AAFactory");
  const aaArtifact = await deployer.loadArtifact("Account");
  const constructorArguments = [utils.hashBytecode(aaArtifact.bytecode), vault]
  const factory = await deployer.deploy(
    factoryArtifact,
    constructorArguments,
    undefined,
    [aaArtifact.bytecode]
  );
  const factoryAddress = await factory.getAddress();
  console.log(`Factory address: ${factoryAddress}`);

  const constructorArgs = factory.interface.encodeDeploy(constructorArguments);
  const fullContractSource = `${factoryArtifact.sourceName}:${factoryArtifact.contractName}`;
  if (hre.network.config.verifyURL) {
    console.log(`Requesting contract verification...`);
    await verifyContract({
      address: factoryAddress,
      contract: fullContractSource,
      constructorArguments: constructorArgs,
      bytecode: factoryArtifact.bytecode,
    });
  }
}

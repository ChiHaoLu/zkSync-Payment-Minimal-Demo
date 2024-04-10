import { Wallet, Provider } from "zksync-ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
// load env file
import dotenv from "dotenv";
dotenv.config();

const DEPLOYER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

export default async function (hre: HardhatRuntimeEnvironment) {
  const provider = new Provider(hre.config.networks.zkSyncSepoliaTestnet.url);
  const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, provider);
  const deployer = new Deployer(hre, wallet);
  const tokenArtifact = await deployer.loadArtifact("StableCoin");

  const token = await deployer.deploy(tokenArtifact, ["Test SGD", "TSGD", 6]);
  const tokenAddress = await token.getAddress();
  console.log(`Token address: ${tokenAddress}`);
}

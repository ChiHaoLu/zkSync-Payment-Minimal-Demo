import { Wallet, Provider } from "zksync-ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
// load env file
import dotenv from "dotenv";
dotenv.config();

const DEPLOYER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;

export default async function (hre: HardhatRuntimeEnvironment) {
  const provider = new Provider(hre.config.networks.zkSyncSepoliaTestnet.url);
  const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, provider);
  const deployer = new Deployer(hre, wallet);
  const vaultArtifact = await deployer.loadArtifact("Vault");

  const vault = await deployer.deploy(vaultArtifact, [OWNER_ADDRESS]);
  const vaultAddress = await vault.getAddress();
  console.log(`Vault address: ${vaultAddress}`);
}

import { deployContract } from "./utils";
import dotenv from "dotenv";
dotenv.config();

export default async function () {
  const owner = process.env.OWNER_ADDRESS;
  const token = process.env.STABLE_COIN_ADDRESS;

  const vault = await deployContract("Vault", [owner, token]);
  const vaultAddress = await vault.getAddress();
  console.log(`Vault address: ${vaultAddress}`);
}

import { deployContract } from "./utils";

export default async function () {
  const token = await deployContract("StableCoin", ["Test SGD", "TSGD", 6]);
  const tokenAddress = await token.getAddress();
  console.log(`Token address: ${tokenAddress}`);
}

import { expect } from "chai";
import { Utils } from "./utils/utils";
import { localConfig } from "../../tests/testConfig";
import * as eth from "ethers";
import { Helper } from "../utils/helper";
import { Wallets } from "../../tests/testData";
import * as zks from "zksync-ethers";

describe("Custom AA Tests", function () {
  let result: any;
  let factory: zks.Contract;
  let richWallet: zks.Wallet;
  const helper = new Helper();
  const utils = new Utils();
  let factoryAddress: string;

  before(async function () {
    richWallet = new zks.Wallet(localConfig.privateKey);
  });

  describe("Factory", function () {
    before(async function () {
      this.timeout(10000);
      factory = await utils.deployFactory(localConfig.privateKey);
      factoryAddress = await factory.getAddress();
    });

    it("Should have a correct address", async function () {
      result = await helper.isValidEthFormat(factoryAddress);
      expect(result).to.be.true;
    });

    it("Should have the Signer address value as a rich wallet address", async function () {
      result = factory.runner;
      expect(await result.getAddress()).to.equal(Wallets.firstWalletAddress);
    });
    // Removed some tests as we don't get the deployTransaction object from the deployer
  });
});

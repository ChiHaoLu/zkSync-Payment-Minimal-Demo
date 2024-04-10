# zkSync Payment Minimal Demo

-   Requirement:
    -   [Docker](https://docs.docker.com/get-docker/)
    -   node v18.16.1 (npm v9.5.1)

---

## Test w/ zkSync Local Devnet

-   To run zkSync local chain, do:

```shell
cd local-setup
./start.sh
```

-   Compile:

```shell
yarn hardhat compile
```

-   Test

```shell
yarn hardhat test
```

-   Format code

```shell
yarn format
```

---

## Deployment w/ zkSync Sepolia

### 0. Preparation

1. Make sure you have [enough ETH in deployer address](https://portal.zksync.io/bridge).
2. Make sure your `.env` is fully filled.
3. Deploy stable coin (just for test demo, not for product) or fill the [deployed coin](https://github.com/circlefin/stablecoin-evm?tab=readme-ov-file) address in `.env`.

```shell
$ yarn execute:eraSepolia deployStableCoin.ts
>
Starting deployment process of "StableCoin"...
Estimated deployment cost: 0.006374441 ETH

"StableCoin" was successfully deployed:
 - Contract address: 0x42571823eA0Eb3AE6403ab4D912d948265590E9F
 - Contract source: contracts/StableCoin.sol:StableCoin
 - Encoded constructor arguments: 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000008546573742053474400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000045453474400000000000000000000000000000000000000000000000000000000

Requesting contract verification...
Your verification ID is: 10459
Contract successfully verified on zkSync block explorer!
Token address: 0x42571823eA0Eb3AE6403ab4D912d948265590E9F
✨  Done in 12.01s.
```

### 1. Deploy Vault

```shell
$ yarn execute:eraSepolia deployVault.ts
>
Starting deployment process of "Vault"...
Estimated deployment cost: 0.0017894608 ETH

"Vault" was successfully deployed:
 - Contract address: 0x305A6E5796d41774c21BdC2c0474628B1Bf2f86E
 - Contract source: contracts/Vault.sol:Vault
 - Encoded constructor arguments: 0x0000000000000000000000008fc8ecf8a75877e51aa595bb1a02cf3804b2461300000000000000000000000042571823ea0eb3ae6403ab4d912d948265590e9f

Requesting contract verification...
Your verification ID is: 10460
Contract successfully verified on zkSync block explorer!
Vault address: 0x305A6E5796d41774c21BdC2c0474628B1Bf2f86E
✨  Done in 9.46s.
```

### 2. Deploy Account Factory

```shell
$ yarn execute:eraSepolia deployFactory.ts
>
Requesting contract verification...
Your verification ID is: 10463
Contract successfully verified on zkSync block explorer!
Factory address: 0xF330C22ac63237802B7DBe4e8d4B0d730589bCA5
✨  Done in 12.16s.
```

### 3. Deploy Account

```shell
$ yarn execute:eraSepolia deployAccount.ts
>
```

### 4. Deploy Paymaster

```shell
$ yarn execute:eraSepolia deployPaymaster.ts
>
```

### 5. Demo: transfer with paymaster

```shell
$ yarn execute:eraSepolia transferWithPaymaster.ts
>
```

---

## Spec.

### Account Contract

### Factory

### Paymaster

### Collection

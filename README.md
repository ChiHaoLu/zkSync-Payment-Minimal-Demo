# zkSync Payment Minimal Demo

- Requirement: 
  - [Docker](https://docs.docker.com/get-docker/)
  - node v18.16.1 (npm v9.5.1)

---

## Test w/ zkSync Local Devnet

- To run zkSync local chain, do:

```shell
cd local-setup
./start.sh
```

- Compile:

```shell
yarn hardhat compile
```

- Test

```shell
yarn hardhat test
```

---

## Deployment w/ zkSync Sepolia

### 0. Preparation

1. Make sure you have enough ETH in deployer.
2. Make sure your `.env` is fully filled.

### 1. Deploy Vault

```shell
$ yarn execute:eraSepolia deployVault.ts
>
```

### 2. Deploy Account Factory

```shell
$ yarn execute:eraSepolia deployFactory.ts
>
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

---

## Demo

TBD

---

## Spec.

### Account Contract

### Factory

### Paymaster

### Collection
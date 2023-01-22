# About the project

[GoalsWei.io](https://www.goalswei.io/) is a goals tracker where users can allocate an amount of Ether to their goals and set a deadline. Once the deadline is reached, an arbiter will determine if the goal has been achieved, and will either send the locked Ether back to the user who created the goal if the goal has been achieved, or send it to a beneficiary if the goal was not achieved. The DApp is based on a web interface built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) and a backed based on smart contracts deployed to the Goerli testnet.

The idea is indpired by the [Go Fucking Do It](https://gofuckingdoit.com/) site by [levelsio](https://github.com/levelsio) and presented as part of the [Alchemy University Ethereum Bootcamp](https://university.alchemy.com/).

# Getting started

## Project structure

The project is divided in two parts:

1. The project's root is based on the [Hardhat](https://hardhat.org/) starter template. The smart contracts are located under the **/contracts** folder.
2. The **/app** folder contains the DApp, based on [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Running locally

You can run the project locally by following these steps:

1. Clone the repo:
```
git clone https://github.com/bartomolina/goalswei.git
```
2. Install dependencies (both in the root folder and the apps folder):
```
npm i
```
3. Set your local envirnoment variables on the **.env** and **/app/.env.local** files. Use the **.evn.example** and **/app/.env.local.example** files as a guide.
4. Start a hardhat node, run the scripts to deploy the smart contracts and load the mock data:
```
npx hardhat node
npx hardhat run scripts/deploy.ts
npx hardhat run scripts/mock.ts
```
5. Start the DApp under the **/app** folder:
```
npm run dev
```

# Roadmap

- [ ] Deploy as a Proxy contract
- [ ] Integrate with PLW3 DAO
- [ ] Deploy to mainnet
- [ ] Tests

# License

[![CC0](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
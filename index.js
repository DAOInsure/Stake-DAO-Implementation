const abi = require("./abis/abi");
const Web3 = require("web3");
const stakeAbi = require("./abis/stakeabi");
const strategyAbi = require("./abis/strategyabi");
const rewardsAbi = require("./abis/rewardsAbi");
const am3crvAbi = require("./abis/am3crvAbi");
const controllerAbi = require("./abis/controllerAbi");
const colors = require("colors");

const web3 = new Web3("http://localhost:8545");

const stakeVaultAddress = "0x7d60F21072b585351dFd5E8b17109458D97ec120";
const am3crvAddress = "0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171"; 

// controller
const controllerAddress = "0x91aE00aaC6eE0D7853C8F92710B641F68Cd945Df";

// contract
const treasury = "0xfDBe4969B21283a9A6D739a7241a2b4F658a3C84";


const stakeVault = new web3.eth.Contract(stakeAbi.abi, stakeVaultAddress);
const am3crvTokenContract = new web3.eth.Contract(am3crvAbi.abi, am3crvAddress);
const controllerContract = new web3.eth.Contract(controllerAbi.abi, controllerAddress);



const depositInStakeVault = async (amount) => {
    console.log("Depositing!");
    await stakeVault.methods.withdrawAll().send({ from: treasury });
    await stakeVault.methods.deposit(amount).send({ from: treasury });
    console.log(colors.green("Deposit done!"));
    let newBalance = await stakeVault.methods.balanceOf(treasury).call();
    console.log(colors.yellow(`Treasury sdam3crv balance: ${newBalance}`));
    console.log();
}

// const earnStakeDao = async () => {
//     console.log("Proceeding to earn!");
//     let result = await stakeVault.methods.earn().send({ from: treasury });
//     console.log(result);
//     console.log("Funds moved to the controller!");
//     console.log();
// }


// const earnOnController = async (amount) => {
//     console.log("Proceeding to earn on Controller!");
//     await controllerContract.methods.earn(stakeVaultAddress, amount).send({ from: treasury });
//     console.log(colors.green("Earning yield"));
//     console.log();
// }


const withdraw = async () => {
    console.log("Proceeding to Withdraw");
    await stakeVault.methods.withdrawAll().send({ from: treasury });
    console.log(colors.green("Withdraw Complete!"));
    let newBalance = await am3crvTokenContract.methods.balanceOf(treasury).call();
    console.log(colors.yellow(`Treasury am3crv balance: ${newBalance}`));
    console.log();
}

let treasuryam3crvBalance;

const init = async () => {
    let treasuryam3crvBalance = await am3crvTokenContract.methods.balanceOf(treasury).call();
    console.log(colors.yellow(`Treasury am3crv balance: ${treasuryam3crvBalance}`));
    
    treasurysdam3crvBalance = await stakeVault.methods.balanceOf(treasury).call();
    console.log(colors.red(`Treasury sdam3crv balance: ${treasurysdam3crvBalance}`));

    let approveResult = await am3crvTokenContract.methods.approve(stakeVaultAddress, treasuryam3crvBalance).send({ from: treasury });
    console.log(colors.green(`${treasuryam3crvBalance} tokens approved!`));
    console.log();
}

console.log();

init();
// depositInStakeVault("2625845448188299633817659");
// earnStakeDao();
// earnOnController("2625845448188299633817659");
// withdraw();


import {ethers} from "./ethers-5.6.esm.min.js";

document.getElementById("checkBalanceButton").addEventListener("click", getBalance);

async function getBalance() {

    let address = document.getElementById("ethAddressInput").value;

    let provider = new  ethers.providers.InfuraProvider("goerli",'XXX7f317cedb484dXXX3953c54344XXX'); // paste your infura api key here

    let balance = await provider.getBalance(address);

    let balanceInEth = ethers.utils.formatEther(balance);

    alert(`wallet balance: ${balanceInEth} ETH`);    

}



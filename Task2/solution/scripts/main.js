import {ethers} from "./ethers-5.6.esm.min.js";

let INFURA_API_KEY="XXXXXXXXXXX"; // paste your infura api key here

document.getElementById("sendEtheButton").addEventListener("click", sendEth);

async function sendEth() {

    let privateKey = document.getElementById("privateKey").value;

    let transferToAddress = document.getElementById("transferToAddress").value;

    let amountInEth = document.getElementById("amountInEth").value;    

    let provider = new  ethers.providers.InfuraProvider("goerli",INFURA_API_KEY); 

    let wallet =  new ethers.Wallet(privateKey,provider);

    let transaction = {
        to: transferToAddress,
        value: ethers.utils.parseEther(amountInEth)
    }

    let transactionResult = await wallet.sendTransaction(transaction);

    alert(transactionResult.hash)
}

document.getElementById("checkBalanceButton").addEventListener("click", getBalance);

async function getBalance() {

    let privateKey = document.getElementById("privateKey").value;

    let provider = new  ethers.providers.InfuraProvider("goerli",INFURA_API_KEY); 

    let wallet =  new ethers.Wallet(privateKey,provider);

    let balance = await provider.getBalance(wallet.address);

    let balanceInEth = ethers.utils.formatEther(balance);

    document.getElementById("balanceText").innerText = `Balance: ${balanceInEth} ETH`;  

}




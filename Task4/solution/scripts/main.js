import { ethers } from "./ethers-5.6.esm.min.js";


document.getElementById("addNewAddressButton").addEventListener("click", addNewAddressInput);
document.getElementById("removeLastAddressButton").addEventListener("click", removeLastAddressInput);
document.getElementById("sendEthButton").addEventListener("click", sendETH);
document.getElementById("checkTokenBalance").addEventListener("click", checkTokenBalanceOnAddress);

async function init() {

    let provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    let signer = provider.getSigner();

    let signerAddress = await signer.getAddress();

    let balance = await signer.getBalance();

    let balanceInEth = ethers.utils.formatEther(balance);


    document.getElementById("balanceText").innerText = `Balance: ${balanceInEth} ETH`;
    document.getElementById("addressText").innerText = `Address: ${signerAddress}`;

}

async function checkTokenBalanceOnAddress() {

    let provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    let signer = provider.getSigner();

    let tokenContractAddress = document.getElementById("erc20TokenAddressInput").value;
    let tokenABI = document.getElementById("erc20TokenAbiInput").value;

    let token = new ethers.Contract(tokenContractAddress, tokenABI, provider);

    let tokenBalance = await token.connect(signer).myBalance();

    document.getElementById("erc20BalanceText").innerText = `ERC20 Balance: ${ethers.utils.formatEther(tokenBalance)} ETH`;
}


function addNewAddressInput() {

    document.getElementById("addressInputs").innerHTML += "<p></p><input type=\"text\" class = \"addressInput\" placeholder=\"ETH address here\" size=\"90\">";

}

function removeLastAddressInput() {

    let inputsList = document.getElementById("addressInputs");
    if (inputsList.childElementCount > 1) {
        inputsList.removeChild(inputsList.lastChild);
        inputsList.removeChild(inputsList.lastChild);
    }
}

async function sendETH() {

    let provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    let signer = provider.getSigner();

    let tokenContractAddress = document.getElementById("erc20TokenAddressInput").value;
    let tokenABI = document.getElementById("erc20TokenAbiInput").value;

    let token = new ethers.Contract(tokenContractAddress, tokenABI, provider);

    let decimals = await token.connect(signer).decimals();

    let addressesInputs = document.getElementsByClassName("addressInput");


    for (let i = 0; i < addressesInputs.length; i++) {
        let element = addressesInputs[i];
        if (element.className == "addressInput") {

            try {

                await token.connect(signer).transfer(element.value, String((document.getElementById("tokenAmountToSend").value * 10 ** decimals) / addressesInputs.length));

            } catch (error) {

                console.error(error);

            }
        }
    }

}

init();



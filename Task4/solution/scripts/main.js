import {ethers} from "./ethers-5.6.esm.min.js";


document.getElementById("addNewAddressButton").addEventListener("click", addNewAddressInput);
document.getElementById("removeLastAddressButton").addEventListener("click", removeLastAddressInput);
document.getElementById("sendEthButton").addEventListener("click", sendETH);

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

function addNewAddressInput(){

    document.getElementById("addressInputs").innerHTML+="<p></p><input type=\"text\" class = \"addressInput\" placeholder=\"ETH address here\" size=\"90\">";

}

function  removeLastAddressInput(){

let inputsList = document.getElementById("addressInputs");
    if (inputsList.childElementCount>1){
        inputsList.removeChild(inputsList.lastChild);
        inputsList.removeChild(inputsList.lastChild);
    }
}

function sendETH(){

    let inputsList = document.getElementById("addressInputs");

    for (let i=0;i<=inputsList.childElementCount;i++){
        let element = inputsList.childNodes[i];
        if (element.className == "addressInput"){
            console.log(element.value);
        }
    }

}

init();



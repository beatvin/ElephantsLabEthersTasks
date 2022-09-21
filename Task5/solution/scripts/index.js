import {ethers} from "./ethers-5.6.esm.min.js";

let provider = ethers.providers.Web3Provider;

let signer = ethers.Signer;



let token = ethers.Contract ;

let checkTokenContractAddressButton = document.querySelector('#checkTokenContractAddressButton');
checkTokenContractAddressButton.addEventListener('click',displayERC20InfoOnWebpage);

let generateAddressesInputsFormButton = document.querySelector("#generateAddressesInputsFormButton");
generateAddressesInputsFormButton.addEventListener('click',generateAddressesInputsForm);

let getBalancesButton;


async function connectToMetamask(){

    const _provider = new ethers.providers.Web3Provider(window.ethereum);

    await _provider.send("eth_requestAccounts", []);

    return _provider;

}

async function connectToERC20(){

    const tokenContractAddress = document.querySelector("#tokenContractAddressInput").value;

    const tokenABI = [

        "function name() view returns (string)",

        "function symbol() view returns (string)",

        "function totalSupply() external view returns (uint256)",

        "function balanceOf(address) view returns (uint256)",

        "function transfer(address to, uint256 amount)",
        
    ];

    const token = new ethers.Contract(tokenContractAddress, tokenABI, provider);

    return token;
}

async function displayERC20InfoOnWebpage(){

    token = await connectToERC20();

    let tokenNameTextElement = document.querySelector("#tokenNameText");
    tokenNameTextElement.textContent=`Token name: ${await token.name()}`;

    let tokenSymbolTextElement = document.querySelector("#tokenSymbolText");
    tokenSymbolTextElement.textContent=`Token symbol: ${await token.symbol()}`;

    let tokenTotalSupplyTextElement = document.querySelector("#tokenTotalSupplyText");
    tokenTotalSupplyTextElement.textContent=`Total supply: ${ethers.utils.formatEther(await token.totalSupply())}`;

}

function generateAddressesInputsForm(){

        let addressesInputsForm = document.querySelector("#addressesInputsForm");

        let addressesQuantityInput = document.querySelector("#addressesQuantityInput");

        let formHTML = [];
        
        for (let i=0; i<addressesQuantityInput.value;i++){

            formHTML+=[
                "<input type=\"text\" class=\"addressToCheckInput\" size = \"90\"><text class=\"addressBalanceText\"></text><br><br>"
            ];

        }

        formHTML+="<button id=\"getBalancesButton\">Get Balances</button><br><br>";

        addressesInputsForm.innerHTML = formHTML;

        getBalancesButton = document.querySelector("#getBalancesButton");
        getBalancesButton.addEventListener('click',getBalancesForAddresses);

}


async function getERC20Balance(_address){

    return await token.connect(signer).balanceOf(_address);

}

async function getBalancesForAddresses(){

    let addressesToCheckInputs= document.querySelectorAll(".addressToCheckInput");

    
    for (let i=0;i<addressesToCheckInputs.length;i++){
        let element = addressesToCheckInputs[i];
        element.nextSibling.innerText = ` ${ethers.utils.formatEther(await getERC20Balance(element.value))} ${await token.symbol()}`;
    }
    

}

async function init(){

    provider = await connectToMetamask();
    signer = provider.getSigner();

}

init();

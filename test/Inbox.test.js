const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert');

const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');
// contract test code will go here

let accounts;
let inbox; 

beforeEach(async () => {
    // Get a list of all accounts
   accounts = await web3.eth.getAccounts();
   
   // Use one of those accounts to deploy the contract
   inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ 
        data: bytecode, 
        arguments: ['Hi there!'] 
    })
    .send({ from: accounts[0], gas: '1000000' });

});

describe('Inbox',() => {
    it('Deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('Has a default message', () => {
        
    });
});
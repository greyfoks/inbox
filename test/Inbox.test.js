const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert');

const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');
// contract test code will go here

let accounts;
let inbox; 
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
    // Get a list of all accounts
   accounts = await web3.eth.getAccounts();
   
   // Use one of those accounts to deploy the contract
   inbox = await new web3.eth.Contract(abi)
    .deploy({ 
        data: evm.bytecode.object, 
        arguments: [INITIAL_STRING] 
    })
    .send({ from: accounts[0], gas: '1000000' });

});

describe('Inbox',() => {
    it('Deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('Has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('Can change the message', async () => {
        await inbox.methods.setMessage('The new message!').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'The new message!');
    });
});
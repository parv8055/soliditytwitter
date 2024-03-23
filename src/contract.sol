// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PausableToken {
    address public owner;
    bool public paused;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
        paused = false;
        balances[owner] = 100;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner!!");
        _;
    }
    modifier notPaused() {
        require(paused == false, "Contract is paused");
        _;
    }

    // 2️⃣ Implement the modifier to check if the contract is not paused

    function pause() public onlyOwner {
        paused = true;
    }

    function unpause() public onlyOwner {
        paused = false;
    }

    // Returns the paused state of the contract
    function getPauseState() public view returns (bool) {
        return paused; // Returns the value of the paused variable
    }

    // 3️⃣ use the notPaused modifier in this function
    function transfer(address to, uint256 amount) public notPaused {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}

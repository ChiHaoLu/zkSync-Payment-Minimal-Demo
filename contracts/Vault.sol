// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault {
    IERC20 public immutable token;
    address public owner;

    constructor(address _owner, address _token) {
        owner = _owner;
        token = IERC20(_token);
    }

    function withdraw(uint256 amount) external {
        token.transfer(owner, amount);
    }
}

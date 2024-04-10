// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Vault {
    IERC20 public immutable token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function withdraw(uint256 amount) external {
        token.transfer(msg.sender, amount);
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount)
        external
        returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(
        address indexed owner, address indexed spender, uint256 amount
    );
}

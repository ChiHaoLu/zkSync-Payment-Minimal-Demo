// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/libraries/SystemContractsCaller.sol";

contract AAFactory {
    bytes32 public aaBytecodeHash;
    address public vault;

    constructor(bytes32 _aaBytecodeHash, address _vault) {
        aaBytecodeHash = _aaBytecodeHash;
        vault = _vault;
    }

    function deployAccount(
        bytes32 salt,
        address owner
    ) external returns (address accountAddress) {
        (bool success, bytes memory returnData) = SystemContractsCaller
            .systemCallWithReturndata(
                uint32(gasleft()),
                address(DEPLOYER_SYSTEM_CONTRACT),
                uint128(0),
                abi.encodeCall(
                    DEPLOYER_SYSTEM_CONTRACT.create2Account,
                    (
                        salt,
                        aaBytecodeHash,
                        abi.encode(owner, vault),
                        IContractDeployer.AccountAbstractionVersion.Version1
                    )
                )
            );
        require(success, "Deployment failed");

        (accountAddress) = abi.decode(returnData, (address));
    }
}

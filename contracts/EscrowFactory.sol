// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Escrow.sol";

//  _                _                        _ _                   _   _     
// | |              | |                      | (_)                 | | | |    
// | |__   __ _ _ __| |_ ___  _ __ ___   ___ | |_ _ __   __ _   ___| |_| |__  
// | '_ \ / _` | '__| __/ _ \| '_ ` _ \ / _ \| | | '_ \ / _` | / _ \ __| '_ \ 
// | |_) | (_| | |  | || (_) | | | | | | (_) | | | | | | (_| ||  __/ |_| | | |
// |_.__/ \__,_|_|   \__\___/|_| |_| |_|\___/|_|_|_| |_|\__,_(_)___|\__|_| |_|

contract EscrowFactory is Ownable {
    address escrowAddress;

    event NewInstance(address indexed _instance);

    constructor() {
        escrowAddress = address(new Escrow());
    }

    function createEscrow(
        address _arbiter,
        address _beneficiary
    ) public payable returns (address clone) {
        clone = Clones.clone(escrowAddress);
        Escrow(clone).initialize{value: msg.value}(_arbiter, _beneficiary);
        emit NewInstance(clone);
    }
}

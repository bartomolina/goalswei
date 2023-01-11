// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

//  _                _                        _ _                   _   _
// | |              | |                      | (_)                 | | | |
// | |__   __ _ _ __| |_ ___  _ __ ___   ___ | |_ _ __   __ _   ___| |_| |__
// | '_ \ / _` | '__| __/ _ \| '_ ` _ \ / _ \| | | '_ \ / _` | / _ \ __| '_ \
// | |_) | (_| | |  | || (_) | | | | | | (_) | | | | | | (_| ||  __/ |_| | | |
// |_.__/ \__,_|_|   \__\___/|_| |_| |_|\___/|_|_|_| |_|\__,_(_)___|\__|_| |_|

contract Escrow is Initializable {
    string public goal;
    address public arbiter;
    address public beneficiary;
    address public depositor;
    uint256 public unlockTime;
    bool public isApproved;

    constructor() initializer {}

    function initialize(
        string calldata _goal,
        address _arbiter,
        address _beneficiary,
        uint256 _unlockTime
    ) public payable initializer {
        // require(
        //     block.timestamp < _unlockTime,
        //     "Goal due date should be in the future"
        // );
        goal = _goal;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        unlockTime = _unlockTime;
        depositor = msg.sender;
    }

    event Approved(uint);

    function approve() external {
        require(msg.sender == arbiter);
        require(block.timestamp >= unlockTime, "Goal not due");
        uint balance = address(this).balance;
        (bool sent, ) = payable(beneficiary).call{value: balance}("");
        require(sent, "Failed to send Ether");
        emit Approved(balance);
        isApproved = true;
    }

    function reject() external {
        require(msg.sender == arbiter);
        require(block.timestamp >= unlockTime, "Goal not due");
        uint balance = address(this).balance;
        (bool sent, ) = payable(beneficiary).call{value: balance}("");
        require(sent, "Failed to send Ether");
        emit Approved(balance);
        isApproved = true;
    }

    function withdraw() external {
    }
}

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
    struct EscrowStruct {
        address addr;
        string goal;
        address arbiter;
        address beneficiary;
        uint256 unlockTime;
        address depositor;
        uint256 value;
    }
    EscrowStruct[] public escrowInstances;

    struct BeneficiaryStruct {
        address addr;
        string info;
    }
    BeneficiaryStruct[] public beneficiariesList;
    mapping(address => bool) allowedBeneficiaries;

    constructor() {
        escrowAddress = address(new Escrow());
    }

    event NewInstance(address indexed _instance);

    function createEscrow(
        string calldata _goal,
        address _arbiter,
        address _beneficiary,
        uint256 _unlockTime
    ) public payable returns (address clone) {
        require(
            allowedBeneficiaries[_beneficiary],
            "Beneficiary not registered"
        );

        clone = Clones.clone(escrowAddress);

        EscrowStruct memory newEscrow = EscrowStruct(
            clone,
            _goal,
            _arbiter,
            _beneficiary,
            _unlockTime,
            msg.sender,
            msg.value
        );
        escrowInstances.push(newEscrow);
        Escrow(clone).initialize{value: msg.value}(
            msg.sender,
            _goal,
            _arbiter,
            _beneficiary,
            _unlockTime
        );
        emit NewInstance(clone);
    }

    function getInstances() external view returns (EscrowStruct[] memory) {
        return escrowInstances;
    }

    event BeneficiaryAdded(address indexed beneficiary, string info);

    function addBeneficiary(address _address, string calldata info) external {
        allowedBeneficiaries[_address] = true;
        beneficiariesList.push(BeneficiaryStruct(_address, info));

        emit BeneficiaryAdded(msg.sender, info);
    }

    function getBeneficiaries() external view returns (BeneficiaryStruct[] memory) {
        return beneficiariesList;
    }
}

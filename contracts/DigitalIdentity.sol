// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DigitalIdentity {

    struct Identity {
        string name;
        string email;
        string nationalId;
        uint256 createdAt;
    }

    mapping(address => Identity) public identities;

    event IdentityCreated(address indexed user, string name, string email, string nationalId);

    function createIdentity(string memory _name, string memory _email, string memory _nationalId) public {
        require(bytes(identities[msg.sender].name).length == 0, "Identity already exists");

        identities[msg.sender] = Identity({
            name: _name,
            email: _email,
            nationalId: _nationalId,
            createdAt: block.timestamp
        });

        emit IdentityCreated(msg.sender, _name, _email, _nationalId);
    }

    function getIdentity(address _user) public view returns (string memory, string memory, string memory, uint256) {
        Identity memory id = identities[_user];
        return (id.name, id.email, id.nationalId, id.createdAt);
    }
}

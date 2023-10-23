// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract eip838errors {
    // Error definitions
    error TestError1(address addr, uint256 value);
    error TestError2(bytes data);

    // Function that might throw TestError1
    function testError1(
        bool pass,
        address addr,
        uint256 value
    ) public pure returns (bool) {
        if (!pass) {
            revert TestError1(addr, value);
        }
        return true;
    }

    // Function that might throw TestError2
    function testError2(
        bool pass,
        bytes memory data
    ) public pure returns (bool) {
        if (!pass) {
            revert TestError2(data);
        }
        return true;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./libraries/lib.sol";

contract Consumer {
    function f() public pure {
        Lib.f();
    }
}

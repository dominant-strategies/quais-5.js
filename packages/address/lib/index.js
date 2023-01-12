"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShardFromAddress = exports.validShard = exports.grindContractAddress = exports.getCreate2Address = exports.getContractAddress = exports.getIcapAddress = exports.isAddress = exports.getAddress = void 0;
var bytes_1 = require("@quais/bytes");
var bignumber_1 = require("@quais/bignumber");
var strings_1 = require("@quais/strings");
var keccak256_1 = require("@quais/keccak256");
var random_1 = require("@quais/random");
var rlp_1 = require("@quais/rlp");
var logger_1 = require("@quais/logger");
var _version_1 = require("./_version");
var constants_1 = require("@quais/constants");
var logger = new logger_1.Logger(_version_1.version);
function getChecksumAddress(address) {
    if (!(0, bytes_1.isHexString)(address, 20)) {
        logger.throwArgumentError("invalid address", "address", address);
    }
    address = address.toLowerCase();
    var chars = address.substring(2).split("");
    var expanded = new Uint8Array(40);
    for (var i = 0; i < 40; i++) {
        expanded[i] = chars[i].charCodeAt(0);
    }
    var hashed = (0, bytes_1.arrayify)((0, keccak256_1.keccak256)(expanded));
    for (var i = 0; i < 40; i += 2) {
        if ((hashed[i >> 1] >> 4) >= 8) {
            chars[i] = chars[i].toUpperCase();
        }
        if ((hashed[i >> 1] & 0x0f) >= 8) {
            chars[i + 1] = chars[i + 1].toUpperCase();
        }
    }
    return "0x" + chars.join("");
}
// Shims for environments that are missing some required constants and functions
var MAX_SAFE_INTEGER = 0x1fffffffffffff;
function log10(x) {
    if (Math.log10) {
        return Math.log10(x);
    }
    return Math.log(x) / Math.LN10;
}
// See: https://en.wikipedia.org/wiki/International_Bank_Account_Number
// Create lookup table
var ibanLookup = {};
for (var i = 0; i < 10; i++) {
    ibanLookup[String(i)] = String(i);
}
for (var i = 0; i < 26; i++) {
    ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
}
// How many decimal digits can we process? (for 64-bit float, this is 15)
var safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
function ibanChecksum(address) {
    address = address.toUpperCase();
    address = address.substring(4) + address.substring(0, 2) + "00";
    var expanded = address.split("").map(function (c) { return ibanLookup[c]; }).join("");
    // Javascript can handle integers safely up to 15 (decimal) digits
    while (expanded.length >= safeDigits) {
        var block = expanded.substring(0, safeDigits);
        expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
    }
    var checksum = String(98 - (parseInt(expanded, 10) % 97));
    while (checksum.length < 2) {
        checksum = "0" + checksum;
    }
    return checksum;
}
;
function getAddress(address) {
    var result = null;
    if (typeof (address) !== "string") {
        logger.throwArgumentError("invalid address", "address", address);
    }
    if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
        // Missing the 0x prefix
        if (address.substring(0, 2) !== "0x") {
            address = "0x" + address;
        }
        result = getChecksumAddress(address);
        // It is a checksummed address with a bad checksum
        if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
            logger.throwArgumentError("bad address checksum", "address", address);
        }
        // Maybe ICAP? (we only support direct mode)
    }
    else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        // It is an ICAP address with a bad checksum
        if (address.substring(2, 4) !== ibanChecksum(address)) {
            logger.throwArgumentError("bad icap checksum", "address", address);
        }
        result = (0, bignumber_1._base36To16)(address.substring(4));
        while (result.length < 40) {
            result = "0" + result;
        }
        result = getChecksumAddress("0x" + result);
    }
    else {
        logger.throwArgumentError("invalid address", "address", address);
    }
    return result;
}
exports.getAddress = getAddress;
function isAddress(address) {
    try {
        getAddress(address);
        return true;
    }
    catch (error) { }
    return false;
}
exports.isAddress = isAddress;
function getIcapAddress(address) {
    var base36 = (0, bignumber_1._base16To36)(getAddress(address).substring(2)).toUpperCase();
    while (base36.length < 30) {
        base36 = "0" + base36;
    }
    return "XE" + ibanChecksum("XE00" + base36) + base36;
}
exports.getIcapAddress = getIcapAddress;
// http://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed
function getContractAddress(transaction) {
    var from = null;
    try {
        from = getAddress(transaction.from);
    }
    catch (error) {
        logger.throwArgumentError("missing from address", "transaction", transaction);
    }
    var nonce = (0, bytes_1.stripZeros)((0, bytes_1.arrayify)(bignumber_1.BigNumber.from(transaction.nonce).toHexString()));
    return getAddress((0, bytes_1.hexDataSlice)((0, keccak256_1.keccak256)((0, rlp_1.encode)([from, nonce])), 12));
}
exports.getContractAddress = getContractAddress;
function getCreate2Address(from, salt, initCodeHash) {
    if ((0, bytes_1.hexDataLength)(salt) !== 32) {
        logger.throwArgumentError("salt must be 32 bytes", "salt", salt);
    }
    if ((0, bytes_1.hexDataLength)(initCodeHash) !== 32) {
        logger.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", initCodeHash);
    }
    return getAddress((0, bytes_1.hexDataSlice)((0, keccak256_1.keccak256)((0, bytes_1.concat)(["0xff", getAddress(from), salt, initCodeHash])), 12));
}
exports.getCreate2Address = getCreate2Address;
//convert bytes to hex string
function toHexString(byteArray) {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}
// convert hex string to bytes
function toByteArray(hexString) {
    var result = [];
    while (hexString.length >= 2) {
        result.push(parseInt(hexString.substring(0, 2), 16));
        hexString = hexString.substring(2, hexString.length);
    }
    return result;
}
function grindContractAddress(nonce, matchShard, sendAddress, bytecode) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, contractBytes, nonceBytes, found, initCode, addressAndNonce, createInput, preComputedAddress, shard;
        return __generator(this, function (_a) {
            if (nonce == undefined) {
                logger.throwArgumentError("missing nonce", "nonce", nonce);
            }
            if (matchShard == undefined || !validShard(matchShard)) {
                logger.throwArgumentError("missing matchShard", "matchShard", matchShard);
            }
            nonceBytes = (0, strings_1.formatBytes32String)(nonce.toString());
            found = false;
            while (!found) {
                // replace last two bytes of bytecode with salt
                salt = (0, random_1.randomBytes)(1);
                initCode = bytecode.substring(0, bytecode.length - 2).concat(toHexString(salt));
                contractBytes = toByteArray(initCode);
                addressAndNonce = (0, bytes_1.concat)([sendAddress, nonceBytes]);
                createInput = (0, bytes_1.concat)([addressAndNonce, contractBytes]);
                preComputedAddress = getAddress((0, bytes_1.hexDataSlice)((0, keccak256_1.keccak256)(createInput), 12));
                shard = getShardFromAddress(preComputedAddress);
                if (shard == undefined) {
                    continue;
                }
                if (shard == matchShard) {
                    found = true;
                }
            }
            return [2 /*return*/, toHexString(contractBytes)];
        });
    });
}
exports.grindContractAddress = grindContractAddress;
function validShard(shard) {
    var shardData = constants_1.ShardData.filter(function (obj) {
        return obj.shard == shard;
    });
    if (shardData.length === 0) {
        return false;
    }
    return true;
}
exports.validShard = validShard;
function getShardFromAddress(address) {
    var shardData = constants_1.ShardData.filter(function (obj) {
        var num = Number(address.substring(0, 4));
        var start = Number("0x" + obj.byte[0]);
        var end = Number("0x" + obj.byte[1]);
        return num >= start && num <= end;
    });
    if (shardData.length === 0) {
        return null;
    }
    return shardData[0].shard;
}
exports.getShardFromAddress = getShardFromAddress;
//# sourceMappingURL=index.js.map
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var quais_1 = require("quais");
var testcases_1 = require("@quais/testcases");
describe('Private key generation', function () {
    var tests = (0, testcases_1.loadTests)('accounts');
    tests.forEach(function (test) {
        if (!test.privateKey) {
            return;
        }
        it(('correctly converts private key - ' + test.name), function () {
            var wallet = new quais_1.quais.Wallet(test.privateKey);
            assert_1.default.equal(wallet.address.toLowerCase(), test.address.toLowerCase(), 'correctly computes privateKey - ' + test.privateKey);
        });
    });
});
describe('Checksum and ICAP address generation', function () {
    var tests = (0, testcases_1.loadTests)('accounts');
    tests.forEach(function (test) {
        it(('correctly transforms address - ' + test.name), function () {
            assert_1.default.equal(quais_1.quais.utils.getAddress(test.address), test.checksumAddress, 'correctly computes checksum address from address');
            assert_1.default.equal(quais_1.quais.utils.getIcapAddress(test.address), test.icapAddress, 'correctly computes ICAP address from address');
            assert_1.default.equal(quais_1.quais.utils.getAddress(test.checksumAddress), test.checksumAddress, 'correctly computes checksum address from checksum address');
            assert_1.default.equal(quais_1.quais.utils.getIcapAddress(test.checksumAddress), test.icapAddress, 'correctly computes ICAP address from checksum address');
            assert_1.default.equal(quais_1.quais.utils.getAddress(test.icapAddress), test.checksumAddress, 'correctly computes checksum address from icap address');
            assert_1.default.equal(quais_1.quais.utils.getIcapAddress(test.icapAddress), test.icapAddress, 'correctly computes ICAP address from icap address');
        });
    });
});
//# sourceMappingURL=test-account.js.map
const fs = require('fs');
const quais = require('quais');

async function updateJsonFile(filePath) {
    // Read the JSON file
    const rawData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(rawData);

    // Connect to a provider (assuming local Ethereum node)
    const provider = new quais.providers.JsonRpcProvider('http://localhost:8610');
    console.log("UPDATING JSON")
    for (let entry of jsonData) {
        // Check for extra data (excluding the specified keys)
        console.log("UPDATING " + entry.name)
        if (!entry.type) {
            entry.type = 0;
        }
        if (entry.gasPrice) {
            entry.maxFeePerGas = entry.gasPrice;
        }
        const extraData = {};
        for (let key in entry) {
            console.log(key)
            if (!['accountAddress', 'name', 'privateKey', 'unsignedTransaction', 'unsignedTransactionChainId5', 'signedTransaction', 'signedTransactionChainId5'].includes(key)) {
                (extraData)[key] = entry[key];
            }
        }

        const tx = { ...extraData };
        const wallet = new quais.Wallet(entry.privateKey, provider);
        const populatedTx = await wallet.populateTransaction(tx);
        // Build a transaction using the extra data (assuming the extra data contains valid transaction fields)
        
        for (let key in populatedTx) {
            entry[key] = populatedTx[key];
        }

        // Compute the unsigned transaction hash
        console.log(JSON.stringify(tx, null, 4))
        const serializedTx = quais.utils.serializeTransaction(populatedTx);
        entry.unsignedTransaction = serializedTx;


        // const signedTx = await wallet.signTransaction(tx);
        // entry.signedTransaction = signedTx;

        // If you want to update 'unsignedTransactionChainId5' and 'signedTransactionChainId5' too, you can repeat similar steps
        // Ensure you're considering the chainId properly
    }

    // Overwrite the JSON file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 4));
}

updateJsonFile("/Users/denis26/Desktop/QUAI/quais-5.js/packages/testcases/testcases/parsing-transactions.json");

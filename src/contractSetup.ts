import Moralis from 'moralis';
import { EvmChain } from 'moralis/common-evm-utils';

const Contract_Factory_ABI = [{
  "anonymous": false,
  "inputs": [
    { "indexed": true, "name": "from", "type": "address" },
    { "indexed": true, "name": "to", "type": "address" },
    { "indexed": true, "name": "contract", "type": "address" },
  ],
  "name": "factoryEvent",
  "type": "event",
}];

const options = {
  chains: [EvmChain.BASE],
  description: "monitor a contract factory",
  tag: "contract_Factory",
  abi: Contract_Factory_ABI,
  includeContractLogs: true,
  allAddresses: true,
  topic0: ["factoryEvent(address,address,address)"],
  webhookUrl: "https://YOUR_WEBHOOK_URL",
};

// Function to initialize Moralis and add the stream
async function setupStream() {
  // Initialize Moralis with your appId and serverUrl
  Moralis.start({ appId: "198e0ce1-bf50-4b2a-87c6-ea3ba6ee5017", serverUrl: "https://deep-index.moralis.io/api/v2.2/nft/0x524cab2ec69124574082676e6f654a18df49a048/7603" });

  const stream = await Moralis.Streams.add(options);
  console.log(stream);
}

export { setupStream };
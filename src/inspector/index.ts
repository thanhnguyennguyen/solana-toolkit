import { Message } from "@solana/web3.js";
import { nameMapper } from "../name-mapper"

const base58 = require("bs58");


type Account = {
  name: string | undefined;
  address: string;
};
type InstructionData = {
  raw: string;
  hex: string;
};
type Instruction = {
  program: Account;
  accounts: Array<Account>;
  data: InstructionData;
};
type InspectorMessage = {
  raw: string | undefined;
  hex: string | undefined;
  message: Message;
  signatures: string[];
  parsed: {
    accountList: Array<Account>;
    instructions: Array<Instruction>;
  };
};

const MIN_MESSAGE_LENGTH =
  3 + // header
  1 + // accounts length
  32 + // accounts, must have at least one address for fees
  32 + // recent blockhash
  1; // instructions length

const MIN_TRANSACTION_LENGTH =
  1 + // signatures length
  64 + // signatures, must have at least one for fees
  MIN_MESSAGE_LENGTH;

const MAX_TRANSACTION_SIGNATURES =
  Math.floor((1232 - MIN_TRANSACTION_LENGTH) / (64 + 32)) + 1;



export const inspectMessage = async (
  base64: string
): Promise<InspectorMessage | undefined> => {
  let buffer;
  try {
    buffer = Buffer.from(base64, "base64"); //.toString('base64') //  Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)); // Buffer.from(base64, 'base64').toString('binary')
  } catch (err) {
    throw new Error("Input must be base64 encoded");
  }

  try {
    if (buffer.length < MIN_MESSAGE_LENGTH) {
      throw new Error("Input is not long enough to be valid.");
    } else if (buffer[0] > MAX_TRANSACTION_SIGNATURES) {
      throw new Error(`Input starts with invalid byte: "${buffer[0]}"`);
    }

    const tx = deserializeTransaction(buffer);
    let rawMessage, message;
    if (tx) {
      message = tx.message;
      rawMessage = message.serialize();
    } else {
      message = Message.from(buffer);
    }

    // parse instructions
    let accountList: Array<Account> = [];
    for (const a of message.accountKeys) {
        accountList.push({
          name: nameMapper(a.toString()),
          address: a.toString()
        })
    }
    let parsedInstructions : Array<Instruction> = []
    for (const ins of message.instructions) {
      let program = accountList[ins.programIdIndex]
      let instructionAccounts = ins.accounts.map(a => accountList[a])
      parsedInstructions.push({
        program: program,
        accounts: instructionAccounts,
        data: {
          raw: ins.data,
          hex: Buffer.from(ins.data, "base64").toString('hex')
        }
      })
    }
    return {
      raw: rawMessage?.toString("base64"),
      hex: rawMessage?.toString("hex"),
      message: message,
      signatures: tx && tx.signatures ? tx.signatures : [],
      parsed: {
        accountList: accountList,
        instructions: parsedInstructions
      }
    };
  } catch (err) {
    console.error(err);
    throw new Error("Cannot inspect data");
  }
};

function deserializeTransaction(bytes: Buffer) {
  const SIGNATURE_LENGTH = 64;
  const signatures = [];
  try {
    const signaturesLen = bytes[0];
    bytes = bytes.slice(1);
    for (let i = 0; i < signaturesLen; i++) {
      const rawSignature = bytes.slice(0, SIGNATURE_LENGTH);
      bytes = bytes.slice(SIGNATURE_LENGTH);
      signatures.push(base58.encode(rawSignature));
    }

    const requiredSignatures = bytes[0];
    if (requiredSignatures !== signaturesLen) {
      throw new Error(
        `Signature length mismatch ${requiredSignatures}, ${signaturesLen}`
      );
    }
  } catch (err) {
    console.log(err);
    // Errors above indicate that the bytes do not encode a transaction.
    return undefined;
  }

  const message = Message.from(bytes);

  return { message, signatures };
}

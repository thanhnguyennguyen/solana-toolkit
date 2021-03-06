import { Transaction, Message, PublicKey } from "@solana/web3.js"
import { nameMapper } from '../name-mapper'
import axios from 'axios'

import base58 from "bs58"

type Account = {
  name: string | undefined
  address: string
  signer: boolean
  writable: boolean
  feePayer: boolean
  balance: number
  exist: boolean
  executable: boolean
}
type InstructionData = {
  raw: string
  hex: string
}
type Instruction = {
  program: Account
  accounts: Array<Account>
  data: InstructionData
}
type InspectorMessage = {
  raw: string | undefined
  hex: string | undefined
  message: Message
  txSize: number
  maxTxSize: number
  feePerSignature: number
  fee: number
  signatures: string[]
  parsed: {
    accountList: Array<Account>
    instructions: Array<Instruction>
  }
}

const FEE_PER_SIGNATURE = 5000

const MIN_MESSAGE_LENGTH =
  3 + // header
  1 + // accounts length
  32 + // accounts, must have at least one address for fees
  32 + // recent blockhash
  1 // instructions length

const MIN_TRANSACTION_LENGTH =
  1 + // signatures length
  64 + // signatures, must have at least one for fees
  MIN_MESSAGE_LENGTH

const MAX_TRANSACTION_SIGNATURES =
  Math.floor((1232 - MIN_TRANSACTION_LENGTH) / (64 + 32)) + 1

export const inspectMessage = async(base64: string, rpcEndpoint: string): Promise<InspectorMessage> => {
  const buffer = Buffer.from(base64, "base64")
  // const buffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))

  if (buffer.length < MIN_MESSAGE_LENGTH) {
    throw new Error("Input is not long enough to be valid.")
  } else if (buffer[0] > MAX_TRANSACTION_SIGNATURES) {
    throw new Error(`Input starts with invalid byte: "${buffer[0]}"`)
  }

  const tx = deserializeTransaction(buffer)
  const rawMessage = Buffer.from(base64, "base64")
  let message : Message
  let feePayer : PublicKey | undefined
  if (tx) {
    message = tx.message
    const tran = Transaction.from(buffer)
    feePayer = tran.feePayer
  } else {
    message = Message.from(buffer)
  }


  // parse instructions
  const accountList: Array<Account> = []
  var accKeys :string[] = []
  message.accountKeys.forEach( (a, i)=> {
    accountList.push({
      name: nameMapper(a.toString()),
      address: a.toString(),
      signer: message.isAccountSigner(i),
      writable: message.isAccountWritable(i),
      feePayer: feePayer && a.equals(feePayer) ? true : false,
      balance: 0,
      exist: true,
      executable: false
    })
    accKeys.push(a.toString())
  })

  const getAccountParams = {
    method: 'getMultipleAccounts',
    jsonrpc: '2.0',
    params: [accKeys, 
      {
        "dataSlice": {
          "offset": 0,
          "length": 0
        }
      }],
    id: '3',
  }
  var accInfos = await axios({
    url: rpcEndpoint,
    method: 'POST',
    data: getAccountParams,
  })

  // fetch account infos
  if (accInfos?.data?.result?.value) {
    accInfos.data.result.value.forEach ((acc: any, i: number)=> {
      if (acc == null) {
        accountList[i].exist = false
        return
      }
      accountList[i].executable = acc.executable
      accountList[i].balance = acc.lamports
    })
  }

  const parsedInstructions: Array<Instruction> = []
  for (const ins of message.instructions) {
    const program = accountList[ins.programIdIndex]
    const instructionAccounts = ins.accounts.map((a) => accountList[a])
    parsedInstructions.push({
      program: program,
      accounts: instructionAccounts,
      data: {
        raw: ins.data,
        hex: Buffer.from(ins.data, "base64").toString("hex"),
      },
    })
  }
  return {
    raw: rawMessage?.toString("base64"),
    hex: rawMessage?.toString("hex"),
    message: message,
    txSize: buffer.length,
    maxTxSize: 1232,
    feePerSignature: FEE_PER_SIGNATURE,
    fee: FEE_PER_SIGNATURE * (tx && tx.signatures ? tx.signatures.length : 1),
    signatures: tx && tx.signatures ? tx.signatures : [],
    parsed: {
      accountList: accountList,
      instructions: parsedInstructions,
    },
  }
}

export const deserializeTransaction = (bytes: Uint8Array): {
  message: Message
  signatures: string[]
} | null => {
  const SIGNATURE_LENGTH = 64
  const signatures = []
  try {
    const signaturesLen = bytes[0]
    bytes = bytes.slice(1)
    for (let i = 0; i < signaturesLen; i++) {
      const rawSignature = bytes.slice(0, SIGNATURE_LENGTH)
      bytes = bytes.slice(SIGNATURE_LENGTH)
      signatures.push(base58.encode(rawSignature))
    }

    const requiredSignatures = bytes[0]
    if (requiredSignatures !== signaturesLen) {
      throw new Error("Signature length mismatch")
    }
  } catch (err) {
    // Errors above indicate that the bytes do not encode a transaction.
    return null
  }
  const message = Message.from(bytes)
  return { message, signatures }
}



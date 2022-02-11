import { nameMapper } from '../name-mapper'
import { getTransactionInstructionError } from "./program-err"

type PrettyLog = {
  logs: Array<{ prefix: string, text: string, style: string, depth: number }>;
  program: {
    name: string | null,
    address: string
  } | null,
  failed: boolean;
};


export const prettyProgramLogs = async (
  logs: string[],
  error: any,
): Promise<PrettyLog[]> => {
  let depth = 0
  const prettyLogs : PrettyLog[] = []
  const prefixBuilder = (depth: number): string => {
    const prefix : string = new Array(depth - 1).fill("\u00A0\u00A0").join("")
    return prefix + "> "
  }

  let prettyError
  if (!logs) {
    if (error) throw new Error(JSON.stringify(error))
    throw new Error("No logs detected")
  } else if (error) {
    prettyError = getTransactionInstructionError(error)
  }

  logs.forEach((log) => {
    if (log.startsWith("Program log:")) {
      prettyLogs[prettyLogs.length - 1].logs.push({
 
          prefix: prefixBuilder(depth),
          text: log,
          style: "muted",
          depth: depth,
        
      })
    } else {
      const regex = /Program (\w*) invoke \[(\d)\]/g
      const matches = [...log.matchAll(regex)]

      if (matches.length > 0) {
        const programAddress = matches[0][1]
        const pName = nameMapper(programAddress)
        const programName = pName ||
          `Unknown (${programAddress}) Program`

        if (depth === 0) {
          prettyLogs.push({
            logs: [],
            program : {
              name: pName,
              address: programAddress
            },
            failed: false,
          })
        } else {
          if (pName) {
            prettyLogs[prettyLogs.length - 1].program = {
              name: pName,
              address: programAddress
            }
          }
          prettyLogs[prettyLogs.length - 1].logs.push({
            prefix: prefixBuilder(depth),
            style: "info",
            text: `Invoking ${programName}`,
            depth,
          })
        }

        depth++
      } else if (log.includes("success")) {
        prettyLogs[prettyLogs.length - 1].logs.push({
          prefix: prefixBuilder(depth),
          style: "success",
          text: `Program returned success`,
          depth,
        })
        depth--
      } else if (log.includes("failed")) {
        const instructionLog = prettyLogs[prettyLogs.length - 1]
        if (!instructionLog.failed) {
          instructionLog.failed = true
          instructionLog.logs.push({
            prefix: prefixBuilder(depth),
            style: "warning",
            text: `Program returned error: ${log.slice(log.indexOf(": ") + 2)}`,
            depth,
          })
        }
        depth--
      } else {
        if (depth === 0) {
          prettyLogs.push({
            logs: [],
            program: null,
            failed: false,
          })
          depth++
        }
        // system transactions don't start with "Program log:"
        prettyLogs[prettyLogs.length - 1].logs.push({
          prefix: prefixBuilder(depth),
          text: log,
          style: "muted",
          depth,
        })
      }
    }
  })

  // If the instruction's simulation returned an error without any logs then add an empty log entry for Runtime error
  // For example BpfUpgradableLoader fails without returning any logs for Upgrade instruction with buffer that doesn't exist
  if (prettyError && prettyLogs.length === 0) {
    prettyLogs.push({
      logs: [],
      program: null,
      failed: true,
    })
  }

  if (prettyError && prettyError.index === prettyLogs.length - 1) {
    const failedIx = prettyLogs[prettyError.index]
    failedIx.failed = true
    failedIx.logs.push({
      prefix: prefixBuilder(1),
      text: `Runtime error: ${prettyError.message}`,
      style: "warning",
      depth: 1,
    })
  }

  return prettyLogs
}
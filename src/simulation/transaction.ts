import { default as axios } from "axios";

export const simulateTransaction = async (
  message: string,
  rpcEndpoint: string | undefined | null
): Promise<any> => {
  if (!rpcEndpoint) {
    rpcEndpoint = "https://api.mainnet-beta.solana.com";
  }
  const { data } = await axios({
    url: rpcEndpoint,
    method: "POST",
    data: {
      method: "simulateTransaction",
      jsonrpc: "2.0",
      params: [message, { encoding: "base64", commitment: "confirmed" }],
      id: "6b9174e1-be33-4d7e-823d-ed22f53d21bb",
    },
  });
  return data;
};

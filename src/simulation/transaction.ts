import { default as axios } from "axios";

export const simulateTransaction = async (
  message: string,
  rpcEndpoint: string
): Promise<any> => {

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

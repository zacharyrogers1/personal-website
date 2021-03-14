import { ApiGatewayManagementApi, Endpoint } from "aws-sdk";


export function sendMessageToClient(ws: ApiGatewayManagementApi, params: ISendMessageParams):Promise<{}> {
  ws.endpoint = new Endpoint(`${params.domainName}/${params.stage}`);

  const postParams = {
    Data: params.message,
    ConnectionId: params.connectionId
  }

  return ws.postToConnection(postParams).promise();
}


export interface ISendMessageParams {
  domainName: string,
  stage: string,
  connectionId: string,
  message: string
}







// export const executeSend = (ws, { domainName, stage, connectionId, message }) => {
//   ws.endpoint = `${domainName}/${stage}`;

//   const postParams = {
//     Data: message,
//     ConnectionId: connectionId
//   };

//   return ws.postToConnection(postParams).promise();
// };
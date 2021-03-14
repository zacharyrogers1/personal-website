import { ApiGatewayManagementApi, Endpoint } from "aws-sdk";


export function sendMessageToClient(ws: ApiGatewayManagementApi, params: ISendMessageParams):Promise<{}> {
  ws.endpoint = new Endpoint(`${params.domainName}/${params.stage}`);

  const postParams: ApiGatewayManagementApi.PostToConnectionRequest = {
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

import { ApiGatewayManagementApi } from 'aws-sdk';
import 'source-map-support/register';

export const executeConnect = async (event) => {
  console.log('connect event', event);
  return {
    statusCode: 200,
  };
};

export const executeDisconnect = async (event) => {
  console.log('disconnect event', event);
  return {
    statusCode: 200,
  };
};
//disconnect event cannot be directly triggered. It is triggered as a side effect once the user application has disconnectd

export const executeDefault = async (event) => {
  console.log('default event', event);
  const { connectionId: connectionId, domainName: domainName, stage: stage } = event.requestContext;
  await executeSend(new ApiGatewayManagementApi(), {
    domainName,
    stage,
    connectionId,
    message: 'You were rerouted to the default route. Did you type in the route name correctly?'
  });
  return {
    statusCode: 200
  };
};

export const executeSend = (ws, { domainName, stage, connectionId, message }) => {
  ws.endpoint = `${domainName}/${stage}`;

  const postParams = {
    Data: message,
    ConnectionId: connectionId
  };

  return ws.postToConnection(postParams).promise();
};
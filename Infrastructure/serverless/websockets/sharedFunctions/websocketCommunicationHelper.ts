export const executeSend = (ws, { domainName, stage, connectionId, message }) => {
    ws.endpoint = `${domainName}/${stage}`;
  
    const postParams = {
      Data: message,
      ConnectionId: connectionId
    };
  
    return ws.postToConnection(postParams).promise();
  };
  
import { ApiGatewayManagementApi } from "aws-sdk";
import { sendMessageToClient } from "../../sharedFunctions/websocketCommunicationHelper";

export const executeDefault = async (event) => {
    console.log('default event', event);
    const { connectionId: connectionId, domainName: domainName, stage: stage } = event.requestContext;
    await sendMessageToClient(new ApiGatewayManagementApi(), {
        domainName,
        stage,
        connectionId,
        message: 'You were rerouted to the default route. Did you type in the route name correctly?'
    });
    return {
        statusCode: 200
    };
};
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { sendMessageToClient } from '../../sharedFunctions/websocketCommunicationHelper';

export class SomeLambda {
    private _webSocket: ApiGatewayManagementApi;

    constructor(webSocket?: ApiGatewayManagementApi) {
        if (webSocket) {
            this._webSocket = webSocket;
        } else {
            this._webSocket = new ApiGatewayManagementApi();
        }
    }

    public async executeSomeLambda(event: APIGatewayProxyEvent) {
        console.log('Here is the event :', event);
        const theRequest = JSON.parse(event.body)
        console.log('Here is the request: ', theRequest);
        const { connectionId: connectionId, domainName: domainName, stage: stage } = event.requestContext;

        await sendMessageToClient(this._webSocket, {
            domainName,
            stage,
            connectionId,
            message: `Your message body: ${theRequest.message}`
        });
        return {
            statusCode: 200
        };
    };
}

export interface ISomeLambdaRequest {
    thing: string,
    serialNumber: number
}



export const someLambdaHandler = new SomeLambda();
export const executeSomeLambda = someLambdaHandler.executeSomeLambda.bind(someLambdaHandler);
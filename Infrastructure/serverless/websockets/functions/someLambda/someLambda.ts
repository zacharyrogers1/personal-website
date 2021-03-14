import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { executeSend } from '../handler';

export class SomeLambda {
    private _webSocket: ApiGatewayManagementApi;

    constructor(webSocket?: ApiGatewayManagementApi) {
        if (webSocket) {
            this._webSocket = webSocket;
        } else {
            this._webSocket = new ApiGatewayManagementApi();
        }
    }

    public async executesomeLambda(event: APIGatewayProxyEvent) {
        console.log('Here is the event :', event.requestContext);
        const { connectionId: connectionId, domainName: domainName, stage: stage } = event.requestContext;

        await executeSend(this._webSocket, {
            domainName,
            stage,
            connectionId,
            message: 'Yay you did it!'
        });
        return {
            statusCode: 200
        };
    };
}

export const someLambdaHandler = new SomeLambda();
export const executeSomeLambda = someLambdaHandler.executesomeLambda.bind(someLambdaHandler);
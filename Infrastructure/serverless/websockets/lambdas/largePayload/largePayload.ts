import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { sendMessageToClient } from '../../sharedFunctions/websocketCommunicationHelper';

export class LargePayload {
    private _webSocket: ApiGatewayManagementApi;

    constructor(webSocket?: ApiGatewayManagementApi) {
        if (webSocket) {
            this._webSocket = webSocket;
        } else {
            this._webSocket = new ApiGatewayManagementApi();
        }
    }

    public async executeLargePayload(event: APIGatewayProxyEvent) {
        console.log('Here is the event :', event);
        const theRequest = JSON.parse(event.body)
        console.log('Here is the request: ', theRequest);
        const { connectionId: connectionId, domainName: domainName, stage: stage } = event.requestContext;

        const arraySizes = [4096, 8192, 16384, 32768, 65536, 131072, 262144]

        for (let index = 0; index < arraySizes.length; index++) {
            const arraySize = arraySizes[index];
            const largeString = `Array Size ${arraySize}: `.concat(new Array(arraySize).join('X'))
            await sendMessageToClient(this._webSocket, {
                domainName,
                stage,
                connectionId,
                message: largeString
            });
        }

        return {
            statusCode: 200
        };
    };
}

export interface ISomeLambdaRequest {
    thing: string,
    serialNumber: number
}



export const largePayloadHandler = new LargePayload();
export const executeLargePayload = largePayloadHandler.executeLargePayload.bind(largePayloadHandler);
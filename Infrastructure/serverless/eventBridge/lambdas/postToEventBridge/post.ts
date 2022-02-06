import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { EventBridge } from 'aws-sdk';


export class SomeLambda {
  constructor() { }

  public async executeSomeLambda(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> {
    console.log('Here is the event :', event);

    const payloadToSend = {
      orderId: '28304',
      price: 900,
      registration: {
        status: 'good',
        participantCount: 13
      }
    }

    const eventBridgeRequest: EventBridge.PutEventsRequest = {
      Entries: [{
        Source: "Order Service",
        DetailType: "New Order",
        Detail: JSON.stringify(payloadToSend),
        EventBusName: "zach-personal-event-bus",
      }]
    };

    console.log('eventBridge Request :', eventBridgeRequest);

    const eventBridge = new EventBridge()
    await eventBridge.putEvents(eventBridgeRequest).promise()


    return {
      statusCode: 200,
      body: 'SUCCESS!!!'
    };
  };
}

export interface ISomeLambdaRequest {
  thing: string,
  serialNumber: number
}



export const someLambdaHandler = new SomeLambda();
export const executePostToEventBridge = someLambdaHandler.executeSomeLambda.bind(someLambdaHandler);
Client -> Server Messaging

The websocket API accepts json payloads when making requests. The payload must have an "action" property specified to route it to the correct lambda. The rest of the object can look like anything.

Example payloads:
{"action": "someLambda", "message": "Poo"}
{"action": "doSomething2", "serialNumber": 827398}
{"action": "findTemp", "temperature": 97}

The action property correlates with the serverless.yml file lambda.events.websocket.route property. So If the yml file route property specifies "burger" then to trigger that lambda you would need to send a message that looked like: {"action": "burger", "message": "doesNotMatter"}


Server -> Client Messaging

Whenever a client connects to websockets API they are given a connectionId. To send a message from the server to the client the lambda must be given this connectionId and the url that the client is connected to. In technical terms to send a message the lambda needs to create a new ApiGatewayManagementApi(), set the endpoint property to ws.endpoint = new Endpoint(`${domainName}/${stage}`), postToTheConnection with the message and connectionId.
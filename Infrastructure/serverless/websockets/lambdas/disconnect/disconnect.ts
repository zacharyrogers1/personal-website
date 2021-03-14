export const executeDisconnect = async (event) => {
    console.log('disconnect event', event);
    return {
        statusCode: 200,
    };
};
  //disconnect event cannot be directly triggered. It is triggered as a side effect once the user application has disconnectd
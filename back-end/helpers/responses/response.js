const { CommandCompleteMessage } = require("pg-protocol/dist/messages");
const errorMessages = require("../../constants/errorMessages.constants");

module.exports = {

sendSuccess(responseInstance, message = '', data = []) {
    const response =  {
        status: true,
        message: message,
        data: data
    }
    return responseInstance.status(200).send(response)
  },



sendError(responseInstance, message = '', err = [], data = [], type, code = 422) {
    const response = {
          status: false,
          message: (message == '' ) ? (errorMessages[err.constructor.name] ?? '') : message,
          errors: err,
          typeOfError: type,
          data: data
      }
    return responseInstance.status(code).send(response)
  },

sendCatchedError(responseInstance, message = '', err = [], data = []) {
  const response = {
    status: false,
    message: (message == '' ) ? (errorMessages[err.constructor.name] ?? '') : message,
    errors: err,
    typeOfError: err.constructor.name,
    data: data
    } 
  return responseInstance.status(500).send(response);
  }
};

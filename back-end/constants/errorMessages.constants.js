const errorMessages = {
    ReferenceError: 'Something went wrong.',
    emailAlreadyExists: 'Same email already exists in our system, please try again with a different one.',
    unAuthenticatedUser: 'Your session is expired, please login.',
    invalidToken: 'Invalid token.',
    unableToStoreData: 'Invalid inputs, please try again.',
    recordNotFound: 'Record not found.',
    errorOnUpdate: 'Unable to update record.',
    recordNotAccessible: 'You are not authorized to view this record',
}

module.exports = errorMessages;
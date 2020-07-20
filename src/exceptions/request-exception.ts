export class RequestException extends Error {
    constructor(message = '') {
        super(`An error occurred during the request. ${message}`);
    }
}
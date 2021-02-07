export function getErrorMessage(e: any): string {
    if (e.message === 'Network Error') {
        return 'Server connection error';
    }

    if (!e.response) {
        return e.message
    }

    return aggregateErrors(e.response) || e.message;
}

function aggregateErrors(resp: any): string | null {
    if (resp.data.message) {
        return resp.data.message;
    }

    if (resp.errors && Array.isArray(resp.errors) && resp.errors.length) {
        return resp.errors[0] as string;
    }

    return null;
}
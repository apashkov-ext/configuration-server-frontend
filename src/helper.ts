import {sha256 } from 'js-sha256';

export class Helper {
    static hash(str: string): string {
        if (!str) {
            throw new Error('String is null or empty');
        }

        return sha256(str);
    }
}

export default Helper;
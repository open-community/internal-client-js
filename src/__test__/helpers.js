/* eslint-env node, mocha */

import assert from 'assert';
import { start } from '../helpers';

describe('Test', () => {
    it('Should return a string', () => {
        assert.strictEqual(typeof start(), 'string');
    });
});

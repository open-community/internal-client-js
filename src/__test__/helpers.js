/* eslint-env node, mocha */

import {start} from '../helpers';
import assert from 'assert';

describe('Test', ()=> {

    it('Should return a string', ()=> {
        assert.strictEqual(typeof start(), 'string');
    });

});

import * as assert from 'assert';
import {Calculator} from './index.js';
import {describe} from 'mocha';

describe('calculation', function() {

  const calculator = new Calculator;

  it('calculation sum', function() {
    assert.strictEqual(calculator.calculation(1, 1, 'sum'), 2)
  });

  it('calculation minus', function() {
    assert.strictEqual(calculator.calculation(3, 1, 'minus'), 2)
  });

  it('calculation multiple', function() {
    assert.strictEqual(calculator.calculation(3, 2, 'multiple'), 6)
  });

  it('calculation division', function() {
    assert.strictEqual(calculator.calculation(100, 20, 'division'), 20)
  });
});

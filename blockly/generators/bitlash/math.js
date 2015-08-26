/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Bitlash for math blocks.
 * @author ramonaliza@gmail.com (Ramona Harrison)
 */
'use strict';

goog.provide('Blockly.Bitlash.math');

goog.require('Blockly.Bitlash');


Blockly.Bitlash.math_number = function() {
  // Numeric value.
  var code = window.parseFloat(this.getFieldValue('NUM'));
  var order = code < 0 ?
      Blockly.Bitlash.ORDER_UNARY_PREFIX : Blockly.Bitlash.ORDER_ATOMIC;
  return [code, order];
};

Blockly.Bitlash.math_number_digits = function() {
  // Numeric value.
  var code = window.parseFloat(this.getFieldValue('NUM'));
  var order = code < 0 ?
      Blockly.Bitlash.ORDER_UNARY_PREFIX : Blockly.Bitlash.ORDER_ATOMIC;
  return [code, order];
};

Blockly.Bitlash.math_number_tens = function() {
  // Numeric value.
  var code = window.parseFloat(this.getFieldValue('NUM'));
  var order = code < 0 ?
      Blockly.Bitlash.ORDER_UNARY_PREFIX : Blockly.Bitlash.ORDER_ATOMIC;
  return [code, order];
};

Blockly.Bitlash.math_arithmetic = function() {
  // Basic arithmetic operators, and power.
  var mode = this.getFieldValue('OP');
  var tuple = Blockly.Bitlash.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Bitlash.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Bitlash.valueToCode(this, 'B', order) || '0';
  var code;
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Bitlash.ORDER_UNARY_POSTFIX];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Bitlash.math_arithmetic.OPERATORS = {
  ADD: [' + ', Blockly.Bitlash.ORDER_ADDITIVE],
  MINUS: [' - ', Blockly.Bitlash.ORDER_ADDITIVE],
  MULTIPLY: [' * ', Blockly.Bitlash.ORDER_MULTIPLICATIVE],
  DIVIDE: [' / ', Blockly.Bitlash.ORDER_MULTIPLICATIVE],
  POWER: [null, Blockly.Bitlash.ORDER_NONE]  // Handle power separately.
};

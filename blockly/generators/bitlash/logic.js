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
 * @fileoverview Generating Bitlash for logic blocks.
 * @author ramonaliza@gmail.com (Ramona Harrison)
 */
'use strict';

goog.provide('Blockly.Bitlash.logic');

goog.require('Blockly.Bitlash');


Blockly.Bitlash.controls_if = function() {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Bitlash.valueToCode(this, 'IF' + n,
      Blockly.Bitlash.ORDER_NONE) || '0';
  var branch = Blockly.Bitlash.statementToCode(this, 'DO' + n);
  var code = 'if (' + argument + ') {' + branch + '}';
  for (n = 1; n <= this.elseifCount_; n++) {
    argument = Blockly.Bitlash.valueToCode(this, 'IF' + n,
      Blockly.Bitlash.ORDER_NONE) || '0';
    branch = Blockly.Bitlash.statementToCode(this, 'DO' + n);
    code += ' [else {if (' + argument + ') {' + branch + '}}]';
  }
  if (this.elseCount_) {
    branch = Blockly.Bitlash.statementToCode(this, 'ELSE');
    code += ' [else {' + branch + '}]';
  }
  return code;
};

Blockly.Bitlash.logic_compare = function() {
  // Comparison operator.
  var mode = this.getFieldValue('OP');
  var operator = Blockly.Bitlash.logic_compare.OPERATORS[mode];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Bitlash.ORDER_EQUALITY : Blockly.Bitlash.ORDER_RELATIONAL;
  var argument0 = Blockly.Bitlash.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Bitlash.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Bitlash.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.Bitlash.logic_operation = function() {
  // Operations 'and', 'or'.
  var operator = (this.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Bitlash.ORDER_LOGICAL_AND :
      Blockly.Bitlash.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Bitlash.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Bitlash.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Bitlash.logic_negate = function() {
  // Negation.
  var order = Blockly.Bitlash.ORDER_UNARY_PREFIX;
  var argument0 = Blockly.Bitlash.valueToCode(this, 'BOOL', order) || '0';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.Bitlash.logic_boolean = function() {
  // Boolean values true and false.
  var code = (this.getFieldValue('BOOL') == 'TRUE') ? '1' : '0';
  return [code, Blockly.Bitlash.ORDER_ATOMIC];
};

Blockly.Bitlash.logic_null = function() {
  var code = 'NULL';
  return [code ,Blockly.Bitlash.ORDER_ATOMIC];
};

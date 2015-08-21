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
 * @fileoverview Generating Bitlash for variable blocks.
 * @author ramonaliza@gmail.com (Ramona Harrison)
 */
'use strict';

goog.provide('Blockly.Bitlash.procedures');

goog.require('Blockly.Bitlash');


Blockly.Bitlash.procedures_defreturn = function() {
  // Define a procedure with a return value.
  var funcName = Blockly.Bitlash.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Bitlash.statementToCode(this, 'STACK');
  if (Blockly.Bitlash.INFINITE_LOOP_TRAP) {
    branch = Blockly.Bitlash.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var returnValue = Blockly.Bitlash.valueToCode(this, 'RETURN',
      Blockly.Bitlash.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';';
  }
  var returnType = returnValue ? 'int' : 'void';
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = 'int ' + Blockly.Bitlash.variableDB_.getName(this.arguments_[x],
        Blockly.Variables.NAME_TYPE);
  }
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {' +
      branch + returnValue + '}';
  code = Blockly.Bitlash.scrub_(this, code);
  Blockly.Bitlash.definitions_[funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Bitlash.procedures_defnoreturn = Blockly.Bitlash.procedures_defreturn;

Blockly.Bitlash.procedures_callreturn = function() {
  // Call a procedure with a return value.
  var funcName = Blockly.Bitlash.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.Bitlash.valueToCode(this, 'ARG' + x,
        Blockly.Bitlash.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Bitlash.ORDER_UNARY_POSTFIX];
};

Blockly.Bitlash.procedures_callnoreturn = function() {
  // Call a procedure with no return value.
  var funcName = Blockly.Bitlash.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.Bitlash.valueToCode(this, 'ARG' + x,
        Blockly.Bitlash.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');';
  return code;
};

Blockly.Bitlash.procedures_ifreturn = function() {
  // Conditionally return value from a procedure.
  var condition = Blockly.Bitlash.valueToCode(this, 'CONDITION',
      Blockly.Bitlash.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {';
  if (this.hasReturnValue_) {
    var value = Blockly.Bitlash.valueToCode(this, 'VALUE',
        Blockly.Bitlash.ORDER_NONE) || 'null';
    code += '  return ' + value + ';';
  } else {
    code += '  return;';
  }
  code += '}';
  return code;
};

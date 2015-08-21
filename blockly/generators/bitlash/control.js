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
 * @fileoverview Generating Bitlash for control blocks.
 * @author ramonaliza@gmail.com (Ramona Harrison)
 */
'use strict';

goog.provide('Blockly.Bitlash.loops');

goog.require('Blockly.Bitlash');


Blockly.Bitlash.controls_for = function() {
  // For loop.
  var variable0 = Blockly.Bitlash.variableDB_.getName(
      this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Bitlash.valueToCode(this, 'FROM',
      Blockly.Bitlash.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Bitlash.valueToCode(this, 'TO',
      Blockly.Bitlash.ORDER_ASSIGNMENT) || '0';
  var branch = Blockly.Bitlash.statementToCode(this, 'DO');
  if (Blockly.Bitlash.INFINITE_LOOP_TRAP) {
    branch = Blockly.Bitlash.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var code;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
      argument1.match(/^-?\d+(\.\d+)?$/)) {
    // Both arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = variable0 + ' = ' + argument0 + '; ' + 'while ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + ' {' + branch + ' ' + variable0 + (up ? '++' : '--') + ';}';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !argument0.match(/^-?\d+(\.\d+)?$/)) {
      var startVar = Blockly.Bitlash.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += startVar + ' = ' + argument0 + ';';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !argument1.match(/^-?\d+(\.\d+)?$/)) {
      var up = parseFloat(argument0) <= parseFloat(argument1);
      var endVar = Blockly.Bitlash.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += endVar + ' = ' + argument1 + ';';
    }
    code += variable0 + ' = ' + startVar + '; ' +
        'while ' + startVar + (up ? ' <= ' : ' >= ') + endVar +
        ' {' + branch0 + ' ' + startVar + (up ? '++' : '--') +';}';

  }
  return code;
};

Blockly.Bitlash.controls_whileUntil = function() {
  // Do while/until loop.
  var until = this.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Bitlash.valueToCode(this, 'BOOL',
      until ? Blockly.Bitlash.ORDER_LOGICAL_NOT :
      Blockly.Bitlash.ORDER_NONE) || '0';
  var branch = Blockly.Bitlash.statementToCode(this, 'DO');
  if (Blockly.Bitlash.INFINITE_LOOP_TRAP) {
    branch = Blockly.Bitlash.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {' + branch + '}';
}

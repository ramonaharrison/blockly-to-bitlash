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
 * @fileoverview Variable blocks for Bitlash.
 * @author ramonaliza@gmail.com (Ramona Harrison)
 */
'use strict';

goog.provide('Blockly.Bitlash.variables');

goog.require('Blockly.Bitlash');


Blockly.Bitlash.variables_get = function() {
  // Variable getter.
  var code = Blockly.Bitlash.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Bitlash.ORDER_ATOMIC];
};

Blockly.Bitlash.variables_declare = function() {
  // Variable setter.
  var dropdown_type = this.getFieldValue('TYPE');
  //TODO: settype to variable
  var argument0 = Blockly.Bitlash.valueToCode(this, 'VALUE',
      Blockly.Bitlash.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Bitlash.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  Blockly.Bitlash.setups_['setup_var' + varName] = varName + ' = ' + argument0 + ';\n';
  return '';
};

Blockly.Bitlash.variables_set = function() {
  // Variable setter.
  var argument0 = Blockly.Bitlash.valueToCode(this, 'VALUE',
      Blockly.Bitlash.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Bitlash.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';';
};

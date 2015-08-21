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
 * @fileoverview Robot blocks for Bitlash.
 * @author ramonaliza@gmail.com (Ramona Harrison)
 */
'use strict';

goog.provide('Blockly.Bitlash.robot');

goog.require('Blockly.Bitlash');

Blockly.Bitlash['move_forward'] = function(block) {
  var value_seconds = Blockly.Bitlash.valueToCode(block, 'SECONDS', Blockly.Bitlash.ORDER_ATOMIC);
  var code = 'mf(' + value_seconds + ');';
  return code;
};

Blockly.Bitlash['move_backward'] = function(block) {
  var value_seconds = Blockly.Bitlash.valueToCode(block, 'SECONDS', Blockly.Bitlash.ORDER_ATOMIC);
  var code = 'mb(' + value_seconds + ');';
  return code;
};

Blockly.Bitlash['turn_left'] = function(block) {
  var angle_degrees = block.getFieldValue('DEGREES');
  var code = 'tl(' + angle_degrees + ');';
  return code;
};

Blockly.Bitlash['turn_right'] = function(block) {
  var angle_degrees = block.getFieldValue('DEGREES');
  var code = 'tr(' + angle_degrees + ');';
  return code;
};

Blockly.Bitlash['blink_left_light'] = function(block) {
  var value_times = Blockly.Bitlash.valueToCode(block, 'TIMES', Blockly.Bitlash.ORDER_ATOMIC);
  // TODO: Assemble Bitlash into code variable.
  var code = 'll(' + value_times + ');';
  return code;
};

Blockly.Bitlash['blink_right_light'] = function(block) {
  var value_times = Blockly.Bitlash.valueToCode(block, 'TIMES', Blockly.Bitlash.ORDER_ATOMIC);
  // TODO: Assemble Bitlash into code variable.
  var code = 'rl(' + value_times + ');';
  return code;
};

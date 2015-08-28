/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @fileoverview Bitlash controlled robot blocks for Blockly.
 * @author ramonaliza@gmail.com (Ramona Harrison)
 */
'use strict';

goog.provide('Blockly.Blocks.robot');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.robot.HUE = 167;

Blockly.Blocks['move_forward'] = {
  init: function() {
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField("move forward");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.robot.HUE);
    this.setTooltip('');
    this.setHelpUrl('https://github.com/ramonaharrison/blockly-to-bitlash/blob/master/docs.md');
  }
};

Blockly.Blocks['move_backward'] = {
  init: function() {
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField("move backward");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.robot.HUE);
    this.setTooltip('');
    this.setHelpUrl('https://github.com/ramonaharrison/blockly-to-bitlash/blob/master/docs.md');
  }
};

Blockly.Blocks['turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turn left")
        .appendField(new Blockly.FieldAngle("90"), "DEGREES");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.robot.HUE);
    this.setTooltip('');
    this.setHelpUrl('https://github.com/ramonaharrison/blockly-to-bitlash/blob/master/docs.md');
  }
};

Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turn right")
        .appendField(new Blockly.FieldAngle("90"), "DEGREES");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.robot.HUE);
    this.setTooltip('');
    this.setHelpUrl('https://github.com/ramonaharrison/blockly-to-bitlash/blob/master/docs.md');
  }
};

Blockly.Blocks['blink_left_light'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .setCheck("Number")
        .appendField("blink left light");
    this.appendDummyInput()
        .appendField("times");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.robot.HUE);
    this.setTooltip('');
    this.setHelpUrl('https://github.com/ramonaharrison/blockly-to-bitlash/blob/master/docs.md');
  }
};

Blockly.Blocks['blink_right_light'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .setCheck("Number")
        .appendField("blink right light");
    this.appendDummyInput()
        .appendField("times");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.robot.HUE);
    this.setTooltip('');
    this.setHelpUrl('https://github.com/ramonaharrison/blockly-to-bitlash/blob/master/docs.md');
  }
};

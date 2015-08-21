/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
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
 * @fileoverview Helper functions for generating Bitlash blocks.
 * @author ramonaliza@gmail.com (Ramona Harrison)
 */
'use strict';

goog.provide('Blockly.Bitlash.base');

goog.require('Blockly.Bitlash');


Blockly.Bitlash.base_delay = function() {
  var delay_time = Blockly.Bitlash.valueToCode(this, 'DELAY_TIME', Blockly.Bitlash.ORDER_ATOMIC) || '1000'
  var code = 'delay(' + delay_time + ');';
  return code;
};

Blockly.Bitlash.base_map = function() {
  var value_num = Blockly.Bitlash.valueToCode(this, 'NUM', Blockly.Bitlash.ORDER_NONE);
  var value_dmax = Blockly.Bitlash.valueToCode(this, 'DMAX', Blockly.Bitlash.ORDER_ATOMIC);
  var code = 'map(' + value_num + ', 0, 1024, 0, ' + value_dmax + ')';
  return [code, Blockly.Bitlash.ORDER_NONE];
};

Blockly.Bitlash.inout_buildin_led = function() {
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Bitlash.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
  var code = 'digitalWrite(13, ' + dropdown_stat + ');'
  return code;
};

Blockly.Bitlash.inout_digital_write = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Bitlash.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');'
  return code;
};

Blockly.Bitlash.inout_digital_read = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Bitlash.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Bitlash.ORDER_ATOMIC];
};

Blockly.Bitlash.inout_analog_write = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
  var value_num = Blockly.Bitlash.valueToCode(this, 'NUM', Blockly.Bitlash.ORDER_ATOMIC);
  //Blockly.Bitlash.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');';
  return code;
};

Blockly.Bitlash.inout_analog_read = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  //Blockly.Bitlash.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Bitlash.ORDER_ATOMIC];
};

Blockly.Bitlash.inout_tone = function() {
  var dropdown_pin = this.getFieldValue("PIN");
  var value_num = Blockly.Bitlash.valueToCode(this, "NUM", Blockly.Bitlash.ORDER_ATOMIC);
  Blockly.Bitlash.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = "tone(" + dropdown_pin + ", " + value_num + ");";
  return code;
};

Blockly.Bitlash.inout_notone = function() {
  var dropdown_pin = this.getFieldValue("PIN");
  Blockly.Bitlash.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = "noTone(" + dropdown_pin + ");";
  return code;
};

Blockly.Bitlash.inout_highlow = function() {
  // Boolean values HIGH and LOW.
  var code = (this.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.Bitlash.ORDER_ATOMIC];
};

Blockly.Bitlash.servo_move = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var value_degree = Blockly.Bitlash.valueToCode(this, 'DEGREE', Blockly.Bitlash.ORDER_ATOMIC);

  Blockly.Bitlash.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Bitlash.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
  Blockly.Bitlash.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';

  var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');';
  return code;
};

Blockly.Bitlash.servo_read_degrees = function() {
  var dropdown_pin = this.getFieldValue('PIN');

  Blockly.Bitlash.definitions_['define_servo'] = '#include &lt;Servo.h&gt;\n';
  Blockly.Bitlash.definitions_['var_servo' + dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Bitlash.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';

  var code = 'servo_' + dropdown_pin + '.read()';
  return code;
};

Blockly.Bitlash.serial_print = function() {
  var content = Blockly.Bitlash.valueToCode(this, 'CONTENT', Blockly.Bitlash.ORDER_ATOMIC) || '0'

  Blockly.Bitlash.setups_['setup_serial_' + profile.default.serial] = 'Serial.begin(' + profile.default.serial + ');';

  var code = 'print ' + content + ' ;';
  return code;
};

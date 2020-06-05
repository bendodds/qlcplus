/*
  Q Light Controller Plus
  sequence.js

  Copyright (c) Ben Dodds

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0.txt

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

// Development tool access
var testAlgo;

(
  function()
  {
    var algo = new Object;
    algo.apiVersion = 2;
    algo.name = "Sequence";
    algo.author = "Ben Dodds";
    algo.acceptColors = 0;
    algo.properties = new Array();
    algo.presetIndex = 0;
    algo.properties.push("name:presetIndex|type:list|display:Preset|values:Rainbow,Sunset,Abstract,Ocean,Pastels|write:setPreset|read:getPreset");
    algo.interpolationSteps = 0;
    algo.properties.push("name:interpolationSteps|type:range|display:Interpolation Steps|values:1,40|write:setInterpolationSteps|read:getInterpolationSteps");
    algo.startOffset = 0;
    algo.properties.push("name:startOffset|type:range|display:Start Offset|values:0,40|write:setStartOffset|read:getStartOffset");
    algo.orientation = 1;
    algo.properties.push("name:orientation|type:list|display:Orientation|values:Horizontal,Vertical,Radial|write:setOrientation|read:getOrientation");
    algo.numDivisions = 3;
    algo.properties.push("name:numDivisions|type:range|display:Number of Divisions|values:1,40|write:setNumDivisions|read:getNumDivisions");

    var util = new Object;
    util.initialized = false;
    util.previouseWidth = null;
    util.previousHeight = null;
    util.groupSize = 0;
    util.groupStartOffset = 0;
    util.gradientData = new Array();
    util.presets = new Array();
    util.presets.push(new Array(0XFF0000, 0XFFFF00, 0X00FF00, 0X00FFFF, 0X0000FF, 0xFF00FF));
    util.presets.push(new Array(0xFFFF00, 0xFF0000));
    util.presets.push(new Array(0x5571FF, 0x00FFFF, 0xFF00FF, 0xFFFF00));
    util.presets.push(new Array(0x003AB9, 0x02EAFF));
    util.presets.push(new Array(0xE0BBE4, 0x957DAD, 0xD291BC, 0xFEC8D8, 0xFFDFD3));

    algo.setPreset = function(_preset)
    {
      if (_preset === "Rainbow") { algo.presetIndex = 0; }
      else if (_preset === "Sunset") { algo.presetIndex = 1; }
      else if (_preset === "Abstract") { algo.presetIndex = 2; }
      else if (_preset === "Ocean") { algo.presetIndex = 3; }
      else if (_preset === "Pastels") { algo.presetIndex = 4; }
      else { algo.presetIndex = 0; }

      util.initialized = false;
    };

    algo.getPreset = function()
    {
      if (algo.presetIndex === 0) { return "Rainbow"; }
      else if (algo.presetIndex === 1) { return "Sunset"; }
      else if (algo.presetIndex === 2) { return "Abstract"; }
      else if (algo.presetIndex === 3) { return "Ocean"; }
      else if (algo.presetIndex === 4) { return "Pastels"; }
      else { return "Rainbow"; }
    };

    algo.setInterpolationSteps = function(_interpolationSteps)
    {
      algo.interpolationSteps = _interpolationSteps;
      util.initialized = false;
    };

    algo.getInterpolationSteps = function()
    {
      return algo.interpolationSteps;
    };

    algo.setStartOffset = function(_startOffset)
    {
      algo.startOffset = _startOffset;
      util.initialize();
    };

    algo.getStartOffset = function()
    {
      return algo.startOffset;
    };

    algo.setOrientation = function(_orientation)
    {
      if (_orientation === "Vertical") { algo.orientation = 1; }
      else if (_orientation === "Radial") { algo.orientation = 2; }
      else { algo.orientation = 0; }

      util.initialized = false;
    };

    algo.getOrientation = function()
    {
      if (algo.orientation === 1) { return "Vertical"; }
      else if (algo.orientation === 2) { return "Radial"; }
      else { return "Horizontal"; }
    };

    algo.setNumDivisions = function(_numDivisions)
    {
      algo.numDivisions = _numDivisions;
      util.initialized = false;
    };

    algo.getNumDivisions = function()
    {
      return algo.numDivisions;
    };

    util.initialize = function(width, height)
    {
      if (width !== util.previouseWidth || height !== util.previousHeight)
      {
        util.initialized = false;
        util.previouseWidth = width;
        util.previouseHeight = height;
      }

      if (util.initialized === true)
      {
        return;
      }

      // calculate the gradient for the selected preset
      // with the given width
      var gradIdx = 0;
      util.gradientData = new Array();
      for (var i = 0; i < util.presets[algo.presetIndex].length; i++)
      {
        var sColor = util.presets[algo.presetIndex][i];
        var eColor = util.presets[algo.presetIndex][i + 1];
        if (eColor == undefined) {
          eColor = util.presets[algo.presetIndex][0];
        }
        util.gradientData[gradIdx++] = sColor;
        var sr = (sColor >> 16) & 0x00FF;
        var sg = (sColor >> 8) & 0x00FF;
        var sb = sColor & 0x00FF;
        var er = (eColor >> 16) & 0x00FF;
        var eg = (eColor >> 8) & 0x00FF;
        var eb = eColor & 0x00FF;

        var stepR = ((er - sr) / (algo.interpolationSteps));
        var stepG = ((eg - sg) / (algo.interpolationSteps));
        var stepB = ((eb - sb) / (algo.interpolationSteps));

        for (var s = 1; s < algo.interpolationSteps; s++)
        {
          var gradR = Math.floor(sr + (stepR * s)) & 0x00FF;
          var gradG = Math.floor(sg + (stepG * s)) & 0x00FF;
          var gradB = Math.floor(sb + (stepB * s)) & 0x00FF;
          var gradRGB = (gradR << 16) + (gradG << 8) + gradB;
          util.gradientData[gradIdx++] = gradRGB;
        }
      }
      
      if (algo.orientation === 1) {
        // Vertical
        util.groupSize = Math.round(height / algo.numDivisions);
      } 
      else if (algo.orientation === 0)
      {
        // Horizontal
        util.groupSize = Math.round(width / algo.numDivisions);
      } else {
        // Radial
        util.groupSize = Math.round(Math.max(width, height) / algo.numDivisions);
      }
      util.groupStartOffset = Math.ceil(util.gradientData.length / algo.numDivisions);

      util.initialized = true;
    };

    algo.rgbMap = function(width, height, rgb, step)
    {
      util.initialize(width, height);

      var groupNumber = 0;
      var groupStartStep = 0;
      var stepNumber = 0;

      var stepCount = util.gradientData.length;
      var map = new Array(height);
      for (var y = 0; y < height; y++)
      {
          map[y] = new Array();

          if (algo.orientation === 1) {
            groupNumber = Math.floor(y / util.groupSize);
          }
          for (var x = 0; x < width; x++)
          {
            if (algo.orientation === 0)
            {
              groupNumber = Math.floor(x / util.groupSize);
            }
            else if (algo.orientation === 2)
            {
              var xdis = x - ((width-1)/2);
              var ydis = y - ((height-1)/2);
              groupNumber = Math.floor(Math.round( Math.sqrt((xdis * xdis) + (ydis * ydis))) / util.groupSize);
            }
            groupStartStep = (groupNumber * util.groupStartOffset) + algo.startOffset;
            stepNumber = groupStartStep + step;
            if (stepNumber >= stepCount)
            {
              stepNumber = (stepNumber % stepCount);
            }

            map[y][x] = util.gradientData[stepNumber];
          }
      }

      return map;
    };

    algo.rgbMapStepCount = function(width, height)
    {
      util.initialize(width, height);
      
      return util.gradientData.length;
    };

    // Development tool access
    testAlgo = algo;

    return algo;
  }
)();

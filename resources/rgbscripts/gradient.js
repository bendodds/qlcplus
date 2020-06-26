/*
  Q Light Controller Plus
  gradient.js

  Copyright (c) Massimo Callegari

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
    algo.name = "Gradient";
    algo.author = "Massimo Callegari";
    algo.acceptColors = 0;
    algo.properties = new Array();
        
    commonColors.CreateSourceProperty(algo);

    algo.presetIndex = 0;
    algo.properties.push("name:presetIndex|type:list|display:Preset|values:Rainbow,Sunset,Abstract,Ocean,Pastels|write:setPreset|read:getPreset");
    algo.startOffset = 0;
    algo.properties.push("name:startOffset|type:range|display:Start Offset|values:0,40|write:setStartOffset|read:getStartOffset");
    algo.presetSize = 5;
    algo.properties.push("name:presetSize|type:range|display:Size|values:1,40|write:setSize|read:getSize");
    algo.orientation = 0;
    algo.properties.push("name:orientation|type:list|display:Orientation|values:Horizontal,Vertical,Radial|write:setOrientation|read:getOrientation");
    algo.interpolationMode = 0;
    algo.properties.push("name:interpolationMode|type:list|display:Interpolation Mode|values:Interpolate,No Interpolate|write:setInterpolationMode|read:getInterpolationMode");

    var util = new Object;
    util.lastPalette = null;
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

    algo.setSize = function(_size)
    {
      algo.presetSize = _size;
    };

    algo.getSize = function()
    {
      return algo.presetSize;
    };

    algo.setStartOffset = function(_startOffset)
    {
      algo.startOffset = _startOffset;
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
    };

    algo.getOrientation = function()
    {
      if (algo.orientation === 1) { return "Vertical"; }
      else if (algo.orientation === 2) { return "Radial"; }
      else { return "Horizontal"; }
    };

    algo.setInterpolationMode = function(_interpolationMode)
    {
      if (_interpolationMode === "No Interpolate") { algo.interpolationMode = 1; }
      else { algo.interpolationMode = 0; }
    };

    algo.getInterpolationMode = function()
    {
      if (algo.interpolationMode === 1) { return "No Interpolate"; }
      else { return "Interpolate"; }
    };

    util.getGradientFromPalette = function(palette)
    {
      // calculate the gradient for the selected preset
      // with the given width
      var gradIdx = 0;
      util.gradientData = new Array();
      for (var i = 0; i < palette.length; i++)
      {
        var sColor = palette[i];
        var eColor = palette[i + 1];
        if (eColor == undefined) {
          eColor = palette[0];
        }
        util.gradientData[gradIdx++] = sColor;
        var sr = (sColor >> 16) & 0x00FF;
        var sg = (sColor >> 8) & 0x00FF;
        var sb = sColor & 0x00FF;
        var er = (eColor >> 16) & 0x00FF;
        var eg = (eColor >> 8) & 0x00FF;
        var eb = eColor & 0x00FF;

        var stepR = ((er - sr) / (algo.presetSize));
        var stepG = ((eg - sg) / (algo.presetSize));
        var stepB = ((eb - sb) / (algo.presetSize));

        for (var s = 1; s < algo.presetSize; s++)
        {
          if (algo.interpolationMode === 0) {
            var gradR = Math.floor(sr + (stepR * s)) & 0x00FF;
            var gradG = Math.floor(sg + (stepG * s)) & 0x00FF;
            var gradB = Math.floor(sb + (stepB * s)) & 0x00FF;
            var gradRGB = (gradR << 16) + (gradG << 8) + gradB;
            util.gradientData[gradIdx++] = gradRGB;
          } else {
            util.gradientData[gradIdx++] = sColor;
          }
        }
      }
    };

    algo.rgbMap = function(width, height, rgb, step)
    {
      palette = commonColors.GetColorPalette(algo, util.presets[algo.presetIndex]);
      if (!commonColors.ArraysEqual(palette, util.lastPalette)) {
        util.getGradientFromPalette(palette);
        util.lastPalette = palette;
      }

      var gradStep = 0;
      var map = new Array(height);
      for (var y = 0; y < height; y++)
      {
          map[y] = new Array();

          if (algo.orientation === 1) {
            gradStep = step + y;
          }
          for (var x = 0; x < width; x++)
          {
            if (algo.orientation === 0)
            {
              gradStep = step + x;
            }
            else if (algo.orientation === 2)
            {
              var xdis = x - ((width-1)/2);
              var ydis = y - ((height-1)/2);
              gradStep = step + Math.round( Math.sqrt((xdis * xdis) + (ydis * ydis)));
            }
            gradStep += algo.startOffset;
            if (gradStep >= util.gradientData.length)
            {
              gradStep = (gradStep % util.gradientData.length);
            }

            map[y][x] = util.gradientData[gradStep];
          }
      }

      return map;
    };

    algo.rgbMapStepCount = function(width, height)
    {
      palette = commonColors.GetColorPalette(algo, util.presets[algo.presetIndex]);
      if (!commonColors.ArraysEqual(palette, util.lastPalette)) {
        util.getGradientFromPalette(palette);
        util.lastPalette = palette;
      }

      return util.gradientData.length;
    };

    // Development tool access
    testAlgo = algo;

    return algo;
  }
)();

/*
  Q Light Controller Plus
  gradientcustomcolors.js

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
    algo.name = "Gradient (Custom Colors)";
    algo.author = "Ben Dodds";
    algo.acceptColors = 0;
    algo.properties = new Array();
        
    commonColors.CreateSourceProperty(algo);

    algo.bandSize = 5;
    algo.properties.push("name:bandSize|type:range|display:Size|values:1,40|write:setBandSize|read:getBandSize");
    algo.orientation = 0;
    algo.properties.push("name:orientation|type:list|display:Orientation|values:Horizontal,Vertical,Radial|write:setOrientation|read:getOrientation");
    algo.interpolationMode = 0;
    algo.properties.push("name:interpolationMode|type:list|display:Interpolation Mode|values:Interpolate,No Interpolate|write:setInterpolationMode|read:getInterpolationMode");

    algo.color1r = 0;
    algo.color1g = 0;
    algo.color1b = 0;
    algo.properties.push("name:color1r|type:range|display:Color 1 R|values:0,255|write:setColor1r|read:getColor1r");
    algo.properties.push("name:color1g|type:range|display:Color 1 G|values:0,255|write:setColor1g|read:getColor1g");
    algo.properties.push("name:color1b|type:range|display:Color 1 B|values:0,255|write:setColor1b|read:getColor1b");

    algo.color2r = 0;
    algo.color2g = 0;
    algo.color2b = 0;
    algo.properties.push("name:color2r|type:range|display:Color 2 R|values:0,255|write:setColor2r|read:getColor2r");
    algo.properties.push("name:color2g|type:range|display:Color 2 G|values:0,255|write:setColor2g|read:getColor2g");
    algo.properties.push("name:color2b|type:range|display:Color 2 B|values:0,255|write:setColor2b|read:getColor2b");

    algo.color3r = 0;
    algo.color3g = 0;
    algo.color3b = 0;
    algo.properties.push("name:color3r|type:range|display:Color 3 R|values:0,255|write:setColor3r|read:getColor3r");
    algo.properties.push("name:color3g|type:range|display:Color 3 G|values:0,255|write:setColor3g|read:getColor3g");
    algo.properties.push("name:color3b|type:range|display:Color 3 B|values:0,255|write:setColor3b|read:getColor3b");

    algo.color4r = 0;
    algo.color4g = 0;
    algo.color4b = 0;
    algo.properties.push("name:color4r|type:range|display:Color 4 R|values:0,255|write:setColor4r|read:getColor4r");
    algo.properties.push("name:color4g|type:range|display:Color 4 G|values:0,255|write:setColor4g|read:getColor4g");
    algo.properties.push("name:color4b|type:range|display:Color 4 B|values:0,255|write:setColor4b|read:getColor4b");

    algo.color5r = 0;
    algo.color5g = 0;
    algo.color5b = 0;
    algo.properties.push("name:color5r|type:range|display:Color 5 R|values:0,255|write:setColor5r|read:getColor5r");
    algo.properties.push("name:color5g|type:range|display:Color 5 G|values:0,255|write:setColor5g|read:getColor5g");
    algo.properties.push("name:color5b|type:range|display:Color 5 B|values:0,255|write:setColor5b|read:getColor5b");

    algo.color6r = 0;
    algo.color6g = 0;
    algo.color6b = 0;
    algo.properties.push("name:color6r|type:range|display:Color 6 R|values:0,255|write:setColor6r|read:getColor6r");
    algo.properties.push("name:color6g|type:range|display:Color 6 G|values:0,255|write:setColor6g|read:getColor6g");
    algo.properties.push("name:color6b|type:range|display:Color 6 B|values:0,255|write:setColor6b|read:getColor6b");

    algo.color7r = 0;
    algo.color7g = 0;
    algo.color7b = 0;
    algo.properties.push("name:color7r|type:range|display:Color 7 R|values:0,255|write:setColor7r|read:getColor7r");
    algo.properties.push("name:color7g|type:range|display:Color 7 G|values:0,255|write:setColor7g|read:getColor7g");
    algo.properties.push("name:color7b|type:range|display:Color 7 B|values:0,255|write:setColor7b|read:getColor7b");

    algo.color8r = 0;
    algo.color8g = 0;
    algo.color8b = 0;
    algo.properties.push("name:color8r|type:range|display:Color 8 R|values:0,255|write:setColor8r|read:getColor8r");
    algo.properties.push("name:color8g|type:range|display:Color 8 G|values:0,255|write:setColor8g|read:getColor8g");
    algo.properties.push("name:color8b|type:range|display:Color 8 B|values:0,255|write:setColor8b|read:getColor8b");

    var util = new Object;
    util.initialized = false;
    util.gradientData = new Array();

    algo.setBandSize = function(_bandSize)
    {
      algo.bandSize = _bandSize;
      util.initialize();
    };

    algo.getBandSize = function()
    {
      return algo.bandSize;
    };

    algo.setOrientation = function(_orientation)
    {
      if (_orientation === "Vertical") { algo.orientation = 1; }
      else if (_orientation === "Radial") { algo.orientation = 2; }
      else { algo.orientation = 0; }
      util.initialize();
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
      util.initialize();
    };

    algo.getInterpolationMode = function()
    {
      if (algo.interpolationMode === 1) { return "No Interpolate"; }
      else { return "Interpolate"; }
    };

    algo.setColor1r = function(_color)
    {
      algo.color1r = _color;
      util.initialize();
    };

    algo.getColor1r = function()
    {
      return algo.color1r;
    };
    
    algo.setColor1g = function(_color)
    {
      algo.color1g = _color;
      util.initialize();
    };

    algo.getColor1g = function()
    {
      return algo.color1g;
    };
    
    algo.setColor1b = function(_color)
    {
      algo.color1b = _color;
      util.initialize();
    };

    algo.getColor1b = function()
    {
      return algo.color1b;
    };

    algo.setColor2r = function(_color)
    {
      algo.color2r = _color;
      util.initialize();
    };

    algo.getColor2r = function()
    {
      return algo.color2r;
    };
    
    algo.setColor2g = function(_color)
    {
      algo.color2g = _color;
      util.initialize();
    };

    algo.getColor2g = function()
    {
      return algo.color2g;
    };
    
    algo.setColor2b = function(_color)
    {
      algo.color2b = _color;
      util.initialize();
    };

    algo.getColor2b = function()
    {
      return algo.color2b;
    };

    algo.setColor3r = function(_color)
    {
      algo.color3r = _color;
      util.initialize();
    };

    algo.getColor3r = function()
    {
      return algo.color3r;
    };
    
    algo.setColor3g = function(_color)
    {
      algo.color3g = _color;
      util.initialize();
    };

    algo.getColor3g = function()
    {
      return algo.color3g;
    };
    
    algo.setColor3b = function(_color)
    {
      algo.color3b = _color;
      util.initialize();
    };

    algo.getColor3b = function()
    {
      return algo.color3b;
    };

    algo.setColor4r = function(_color)
    {
      algo.color4r = _color;
      util.initialize();
    };

    algo.getColor4r = function()
    {
      return algo.color4r;
    };
    
    algo.setColor4g = function(_color)
    {
      algo.color4g = _color;
      util.initialize();
    };

    algo.getColor4g = function()
    {
      return algo.color4g;
    };
    
    algo.setColor4b = function(_color)
    {
      algo.color4b = _color;
      util.initialize();
    };

    algo.getColor4b = function()
    {
      return algo.color4b;
    };

    algo.setColor5r = function(_color)
    {
      algo.color5r = _color;
      util.initialize();
    };

    algo.getColor5r = function()
    {
      return algo.color5r;
    };
    
    algo.setColor5g = function(_color)
    {
      algo.color5g = _color;
      util.initialize();
    };

    algo.getColor5g = function()
    {
      return algo.color5g;
    };
    
    algo.setColor5b = function(_color)
    {
      algo.color5b = _color;
      util.initialize();
    };

    algo.getColor5b = function()
    {
      return algo.color5b;
    };

    algo.setColor6r = function(_color)
    {
      algo.color6r = _color;
      util.initialize();
    };

    algo.getColor6r = function()
    {
      return algo.color6r;
    };
    
    algo.setColor6g = function(_color)
    {
      algo.color6g = _color;
      util.initialize();
    };

    algo.getColor6g = function()
    {
      return algo.color6g;
    };
    
    algo.setColor6b = function(_color)
    {
      algo.color6b = _color;
      util.initialize();
    };

    algo.getColor6b = function()
    {
      return algo.color6b;
    };

    algo.setColor7r = function(_color)
    {
      algo.color7r = _color;
      util.initialize();
    };

    algo.getColor7r = function()
    {
      return algo.color7r;
    };
    
    algo.setColor7g = function(_color)
    {
      algo.color7g = _color;
      util.initialize();
    };

    algo.getColor7g = function()
    {
      return algo.color7g;
    };
    
    algo.setColor7b = function(_color)
    {
      algo.color7b = _color;
      util.initialize();
    };

    algo.getColor7b = function()
    {
      return algo.color7b;
    };

    algo.setColor8r = function(_color)
    {
      algo.color8r = _color;
      util.initialize();
    };

    algo.getColor8r = function()
    {
      return algo.color8r;
    };
    
    algo.setColor8g = function(_color)
    {
      algo.color8g = _color;
      util.initialize();
    };

    algo.getColor8g = function()
    {
      return algo.color8g;
    };
    
    algo.setColor8b = function(_color)
    {
      algo.color8b = _color;
      util.initialize();
    };

    algo.getColor8b = function()
    {
      return algo.color8b;
    };

    util.initialize = function()
    {
      var colors;
      colors = new Array();
      if(algo.color1r != 0 || algo.color1g != 0 || algo.color1b != 0)
      {
        colors.push((algo.color1r << 16) | (algo.color1g << 8) | algo.color1b);
      }
      if(algo.color2r != 0 || algo.color2g != 0 || algo.color2b != 0)
      {
        colors.push((algo.color2r << 16) | (algo.color2g << 8) | algo.color2b);
      }
      if(algo.color3r != 0 || algo.color3g != 0 || algo.color3b != 0)
      {
        colors.push((algo.color3r << 16) | (algo.color3g << 8) | algo.color3b);
      }
      if(algo.color4r != 0 || algo.color4g != 0 || algo.color4b != 0)
      {
        colors.push((algo.color4r << 16) | (algo.color4g << 8) | algo.color4b);
      }
      if(algo.color5r != 0 || algo.color5g != 0 || algo.color5b != 0)
      {
        colors.push((algo.color5r << 16) | (algo.color5g << 8) | algo.color5b);
      }
      if(algo.color6r != 0 || algo.color6g != 0 || algo.color6b != 0)
      {
        colors.push((algo.color6r << 16) | (algo.color6g << 8) | algo.color6b);
      }
      if(algo.color7r != 0 || algo.color7g != 0 || algo.color7b != 0)
      {
        colors.push((algo.color7r << 16) | (algo.color7g << 8) | algo.color7b);
      }
      if(algo.color8r != 0 || algo.color8g != 0 || algo.color8b != 0)
      {
        colors.push((algo.color8r << 16) | (algo.color8g << 8) | algo.color8b);
      }
      
      if (colors.length === 0)
      {
        colors.push(parseInt("0xFFFFFF)"));
      }

      util.gradientData = new Array();
      if (colors.length === 1)
      {
        util.gradientData[0] = colors[0];
      }
      else
      {
        var gradIdx = 0;
        for (var i = 0; i < colors.length; i++)
        {
          var sColor = colors[i];
          var eColor = colors[i + 1];
          if (eColor == undefined) {
            eColor = colors[0];
          }
          util.gradientData[gradIdx++] = sColor;
          var sr = (sColor >> 16) & 0x00FF;
          var sg = (sColor >> 8) & 0x00FF;
          var sb = sColor & 0x00FF;
          var er = (eColor >> 16) & 0x00FF;
          var eg = (eColor >> 8) & 0x00FF;
          var eb = eColor & 0x00FF;

          var stepR = ((er - sr) / (algo.bandSize));
          var stepG = ((eg - sg) / (algo.bandSize));
          var stepB = ((eb - sb) / (algo.bandSize));

          for (var s = 1; s < algo.bandSize; s++)
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
      }

      util.initialized = true;
    };

    algo.rgbMap = function(width, height, rgb, step)
    {
      rgb = commonColors.GetColor(algo, width, height, rgb, step);
      
      if (util.initialized === false)
      {
        util.initialize(width);
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
      if (util.initialized === false) {
        util.initialize();
      }
      return util.gradientData.length;
    };

    // Development tool access
    testAlgo = algo;

    return algo;
  }
)();


// Development tool access
var testAlgo;

(
  function()
  {
    var algo = new Object;
    algo.apiVersion = 2;
    algo.name = "_Common Colors Palette";
    algo.author = "Ben Dodds";
    algo.acceptColors = 0;
    algo.properties = new Array();

    algo.preview = "Yes";
    algo.properties.push("name:preview|type:list|display:Preview?|values:Yes,No|write:setPreview|read:getPreview");

    algo.color1R = 0;
    algo.color1G = 0;
    algo.color1B = 0;
    algo.properties.push("name:color1R|type:range|display:Color 1 Red|values:0,255|write:setColor1R|read:getColor1R");
    algo.properties.push("name:color1G|type:range|display:Color 1 Green|values:0,255|write:setColor1G|read:getColor1G");
    algo.properties.push("name:color1B|type:range|display:Color 1 Blue|values:0,255|write:setColor1B|read:getColor1B");

    algo.color2R = 0;
    algo.color2G = 0;
    algo.color2B = 0;
    algo.properties.push("name:color2R|type:range|display:Color 2 Red|values:0,255|write:setColor2R|read:getColor2R");
    algo.properties.push("name:color2G|type:range|display:Color 2 Green|values:0,255|write:setColor2G|read:getColor2G");
    algo.properties.push("name:color2B|type:range|display:Color 2 Blue|values:0,255|write:setColor2B|read:getColor2B");

    algo.color3R = 0;
    algo.color3G = 0;
    algo.color3B = 0;
    algo.properties.push("name:color3R|type:range|display:Color 3 Red|values:0,255|write:setColor3R|read:getColor3R");
    algo.properties.push("name:color3G|type:range|display:Color 3 Green|values:0,255|write:setColor3G|read:getColor3G");
    algo.properties.push("name:color3B|type:range|display:Color 3 Blue|values:0,255|write:setColor3B|read:getColor3B");

    algo.color4R = 0;
    algo.color4G = 0;
    algo.color4B = 0;
    algo.properties.push("name:color4R|type:range|display:Color 4 Red|values:0,255|write:setColor4R|read:getColor4R");
    algo.properties.push("name:color4G|type:range|display:Color 4 Green|values:0,255|write:setColor4G|read:getColor4G");
    algo.properties.push("name:color4B|type:range|display:Color 4 Blue|values:0,255|write:setColor4B|read:getColor4B");

    algo.color5R = 0;
    algo.color5G = 0;
    algo.color5B = 0;
    algo.properties.push("name:color5R|type:range|display:Color 5 Red|values:0,255|write:setColor5R|read:getColor5R");
    algo.properties.push("name:color5G|type:range|display:Color 5 Green|values:0,255|write:setColor5G|read:getColor5G");
    algo.properties.push("name:color5B|type:range|display:Color 5 Blue|values:0,255|write:setColor5B|read:getColor5B");

    algo.color6R = 0;
    algo.color6G = 0;
    algo.color6B = 0;
    algo.properties.push("name:color6R|type:range|display:Color 6 Red|values:0,255|write:setColor6R|read:getColor6R");
    algo.properties.push("name:color6G|type:range|display:Color 6 Green|values:0,255|write:setColor6G|read:getColor6G");
    algo.properties.push("name:color6B|type:range|display:Color 6 Blue|values:0,255|write:setColor6B|read:getColor6B");

    algo.setPreview = function(_preview)
    {
      algo.preview = _preview;
    };
    algo.getPreview = function()
    {
      return algo.preview;
    };

    algo.setColor1R = function(_color)
    {
      algo.color1R = _color;
    };
    algo.getColor1R = function()
    {
      return algo.color1R;
    };

    algo.setColor1G = function(_color)
    {
      algo.color1G = _color;
    };
    algo.getColor1G = function()
    {
      return algo.color1G;
    };

    algo.setColor1B = function(_color)
    {
      algo.color1B = _color;
    };
    algo.getColor1B = function()
    {
      return algo.color1B;
    };

    algo.setColor2R = function(_color)
    {
      algo.color2R = _color;
    };
    algo.getColor2R = function()
    {
      return algo.color2R;
    };

    algo.setColor2G = function(_color)
    {
      algo.color2G = _color;
    };
    algo.getColor2G = function()
    {
      return algo.color2G;
    };

    algo.setColor2B = function(_color)
    {
      algo.color2B = _color;
    };
    algo.getColor2B = function()
    {
      return algo.color2B;
    };

    algo.setColor3R = function(_color)
    {
      algo.color3R = _color;
    };
    algo.getColor3R = function()
    {
      return algo.color3R;
    };

    algo.setColor3G = function(_color)
    {
      algo.color3G = _color;
    };
    algo.getColor3G = function()
    {
      return algo.color3G;
    };

    algo.setColor3B = function(_color)
    {
      algo.color3B = _color;
    };
    algo.getColor3B = function()
    {
      return algo.color3B;
    };

    algo.setColor4R = function(_color)
    {
      algo.color4R = _color;
    };
    algo.getColor4R = function()
    {
      return algo.color4R;
    };

    algo.setColor4G = function(_color)
    {
      algo.color4G = _color;
    };
    algo.getColor4G = function()
    {
      return algo.color4G;
    };

    algo.setColor4B = function(_color)
    {
      algo.color4B = _color;
    };
    algo.getColor4B = function()
    {
      return algo.color4B;
    };

    algo.setColor5R = function(_color)
    {
      algo.color5R = _color;
    };
    algo.getColor5R = function()
    {
      return algo.color5R;
    };

    algo.setColor5G = function(_color)
    {
      algo.color5G = _color;
    };
    algo.getColor5G = function()
    {
      return algo.color5G;
    };

    algo.setColor5B = function(_color)
    {
      algo.color5B = _color;
    };
    algo.getColor5B = function()
    {
      return algo.color5B;
    };

    algo.setColor6R = function(_color)
    {
      algo.color6R = _color;
    };
    algo.getColor6R = function()
    {
      return algo.color6R;
    };

    algo.setColor6G = function(_color)
    {
      algo.color6G = _color;
    };
    algo.getColor6G = function()
    {
      return algo.color6G;
    };

    algo.setColor6B = function(_color)
    {
      algo.color6B = _color;
    };
    algo.getColor6B = function()
    {
      return algo.color6B;
    };

    algo.rgbMap = function(width, height, rgb, step)
    {
      commonColors.palette = [];

      color1 = (algo.color1R << 16) | (algo.color1G << 8) | algo.color1B;
      color2 = (algo.color2R << 16) | (algo.color2G << 8) | algo.color2B;
      color3 = (algo.color3R << 16) | (algo.color3G << 8) | algo.color3B;
      color4 = (algo.color4R << 16) | (algo.color4G << 8) | algo.color4B;
      color5 = (algo.color5R << 16) | (algo.color5G << 8) | algo.color5B;
      color6 = (algo.color6R << 16) | (algo.color6G << 8) | algo.color6B;

      if(color1 !== 0) {
        commonColors.palette.push(color1);
      }
      if(color2 !== 0) {
        commonColors.palette.push(color2);
      }
      if(color3 !== 0) {
        commonColors.palette.push(color3);
      }
      if(color4 !== 0) {
        commonColors.palette.push(color4);
      }
      if(color5 !== 0) {
        commonColors.palette.push(color5);
      }
      if(color6 !== 0) {
        commonColors.palette.push(color6);
      }

      if(commonColors.palette.length === 0) {
        commonColors.palette.push(0);
      }
      
      var map = new Array(height);
      for (var y = 0; y < height; y++)
      {
          map[y] = new Array();
          for (var x = 0; x < width; x++)
          {
            if (algo.preview === "Yes") {
              map[y][x] = commonColors.palette[(x + y) % commonColors.palette.length];
            } else {
              map[y][x] = 0;
            }
          }
      }

      return map;
    };

    algo.rgbMapStepCount = function(width, height)
    {
      return 1;
    };

    // Development tool access
    testAlgo = algo;

    return algo;
  }
)();

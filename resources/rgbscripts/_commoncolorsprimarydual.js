
// Development tool access
var testAlgo;

(
  function()
  {
    var algo = new Object;
    algo.apiVersion = 2;
    algo.name = "_Common Colors Primary - Dual Color";
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
      util.initialize();
    };
    algo.getColor1R = function()
    {
      return algo.color1R;
    };

    algo.setColor1G = function(_color)
    {
      algo.color1G = _color;
      util.initialize();
    };
    algo.getColor1G = function()
    {
      return algo.color1G;
    };

    algo.setColor1B = function(_color)
    {
      algo.color1B = _color;
      util.initialize();
    };
    algo.getColor1B = function()
    {
      return algo.color1B;
    };

    algo.setColor2R = function(_color)
    {
      algo.color2R = _color;
      util.initialize();
    };
    algo.getColor2R = function()
    {
      return algo.color2R;
    };

    algo.setColor2G = function(_color)
    {
      algo.color2G = _color;
      util.initialize();
    };
    algo.getColor2G = function()
    {
      return algo.color2G;
    };

    algo.setColor2B = function(_color)
    {
      algo.color2B = _color;
      util.initialize();
    };
    algo.getColor2B = function()
    {
      return algo.color2B;
    };

    algo.rgbMap = function(width, height, rgb, step)
    {
      commonColors.primary = [
          (algo.color1R << 16) | (algo.color1G << 8) | algo.color1B,
          (algo.color2R << 16) | (algo.color2G << 8) | algo.color2B,
          ];
      
      var map = new Array(height);
      for (var y = 0; y < height; y++)
      {
          map[y] = new Array();
          for (var x = 0; x < width; x++)
          {
            if (algo.preview === "Yes") {
              map[y][x] = commonColors.primary[(x + y) % 2];
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

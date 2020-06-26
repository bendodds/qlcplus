
// Development tool access
var testAlgo;

(
  function()
  {
    var algo = new Object;
    algo.apiVersion = 2;
    algo.name = "_Common Colors Accent - Single Color";
    algo.author = "Ben Dodds";
    algo.acceptColors = 0;
    algo.properties = new Array();

    algo.preview = "Yes";
    algo.properties.push("name:preview|type:list|display:Preview?|values:Yes,No|write:setPreview|read:getPreview");

    algo.colorR = 0;
    algo.colorG = 0;
    algo.colorB = 0;
    algo.properties.push("name:colorR|type:range|display:Red|values:0,255|write:setColorR|read:getColorR");
    algo.properties.push("name:colorG|type:range|display:Green|values:0,255|write:setColorG|read:getColorG");
    algo.properties.push("name:colorB|type:range|display:Blue|values:0,255|write:setColorB|read:getColorB");

    algo.setPreview = function(_preview)
    {
      algo.preview = _preview;
    };
    algo.getPreview = function()
    {
      return algo.preview;
    };

    algo.setColorR = function(_color)
    {
      algo.colorR = _color;
      util.initialize();
    };
    algo.getColorR = function()
    {
      return algo.colorR;
    };

    algo.setColorG = function(_color)
    {
      algo.colorG = _color;
      util.initialize();
    };
    algo.getColorG = function()
    {
      return algo.colorG;
    };

    algo.setColorB = function(_color)
    {
      algo.colorB = _color;
      util.initialize();
    };
    algo.getColorB = function()
    {
      return algo.colorB;
    };

    algo.rgbMap = function(width, height, rgb, step)
    {
      commonColors.accent = [
          (algo.colorR << 16) | (algo.colorG << 8) | algo.colorB,
          ];
      
      var map = new Array(height);
      for (var y = 0; y < height; y++)
      {
          map[y] = new Array();
          for (var x = 0; x < width; x++)
          {
            if (algo.preview === "Yes") {
              map[y][x] = commonColors.accent[0];
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

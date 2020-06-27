
// Development tool access
var testAlgo;

try {
  commonColors.primary;
}
catch(err) {
  var commonColors = new Object;
  commonColors.primary = new Array();
  commonColors.accent = new Array();
  commonColors.palette = new Array();
  commonColors.CreateSourceProperty = function(algo) {
    if (algo.apiVersion === 1) {
      algo.apiVersion = 2;
      algo.properties = new Array();
    }
    algo.colorSource = "Default";
    algo.properties.push("name:colorSource|type:list|display:Color Source|values:Default,Primary - Single,Primary - Dual,Accent - Single,Accent - Dual,Palette|write:setColorSource|read:getColorSource");
    algo.setColorSource = function(_colorSource)
    {
      algo.colorSource = _colorSource;
    };
    algo.getColorSource = function()
    {
      return algo.colorSource;
    };
  };
  commonColors.GetColor = function(algo, width, height, rgb, step) {
    source = algo.colorSource
    if (algo.colorSource === "Default") {
      return rgb;
    }

    if (source == "Primary - Dual" 
        && commonColors.primary.length == 1) {
      source = "Primary - Single";
    }
    if (source == "Accent - Dual" 
        && commonColors.accent.length == 1) {
      source = "Accent - Single";
    }

    if (source === "Primary - Single") {
      if (commonColors.primary.length === 0) {
        return 0;
      }
      return commonColors.primary[0];
    }

    if (source === "Accent - Single") {
      if (commonColors.accent.length === 0) {
        return 0;
      }
      return commonColors.accent[0];
    }

    var stepCount = algo.rgbMapStepCount(width, height);
    var progress = (step * 1.0) / (stepCount - 1);
    if (source === "Primary - Dual") {
      if (commonColors.primary.length < 2) {
        return 0;
      }
      
      var color1Red = (commonColors.primary[0] >> 16) & 0x00FF;
      var color1Green = (commonColors.primary[0] >> 8) & 0x00FF;
      var color1Blue = commonColors.primary[0] & 0x00FF;
      
      var color2Red = (commonColors.primary[1] >> 16) & 0x00FF;
      var color2Green = (commonColors.primary[1] >> 8) & 0x00FF;
      var color2Blue = commonColors.primary[1] & 0x00FF;

      var resultRed = (color1Red * (1 - progress)) + (color2Red * progress);
      var resultGreen = (color1Green * (1 - progress)) + (color2Green * progress);
      var resultBlue = (color1Blue * (1 - progress)) + (color2Blue * progress);

      return (resultRed << 16) | (resultGreen << 8) | resultBlue;
    }

    if (source === "Accent - Dual") {
      if (commonColors.accent.length < 2) {
        return 0;
      }
      
      var color1Red = (commonColors.accent[0] >> 16) & 0x00FF;
      var color1Green = (commonColors.accent[0] >> 8) & 0x00FF;
      var color1Blue = commonColors.accent[0] & 0x00FF;
      
      var color2Red = (commonColors.accent[1] >> 16) & 0x00FF;
      var color2Green = (commonColors.accent[1] >> 8) & 0x00FF;
      var color2Blue = commonColors.accent[1] & 0x00FF;

      var resultRed = (color1Red * (1 - progress)) + (color2Red * progress);
      var resultGreen = (color1Green * (1 - progress)) + (color2Green * progress);
      var resultBlue = (color1Blue * (1 - progress)) + (color2Blue * progress);

      return (resultRed << 16) | (resultGreen << 8) | resultBlue;
    }

    if (source === "Palette") {
      if (commonColors.palette.length < 2) {
        return 0;
      }
      
      var color1Red = (commonColors.palette[0] >> 16) & 0x00FF;
      var color1Green = (commonColors.palette[0] >> 8) & 0x00FF;
      var color1Blue = commonColors.palette[0] & 0x00FF;
      
      var color2Red = (commonColors.palette[1] >> 16) & 0x00FF;
      var color2Green = (commonColors.palette[1] >> 8) & 0x00FF;
      var color2Blue = commonColors.palette[1] & 0x00FF;

      var resultRed = (color1Red * (1 - progress)) + (color2Red * progress);
      var resultGreen = (color1Green * (1 - progress)) + (color2Green * progress);
      var resultBlue = (color1Blue * (1 - progress)) + (color2Blue * progress);

      return (resultRed << 16) | (resultGreen << 8) | resultBlue;
    }

    return 0;
  };
  commonColors.GetColorPalette = function(algo, defaultPalette) {
    if (algo.colorSource === "Default") {
      return defaultPalette;
    }

    if (algo.colorSource === "Primary - Single"
        || algo.colorSource === "Primary - Dual") {
      return commonColors.primary;
    }

    if (algo.colorSource === "Accent - Single"
        || algo.colorSource === "Accent - Dual") {
      return commonColors.accent;
    }

    if (algo.colorSource === "Palette") {
      return commonColors.palette;
    }

    return [];
  };
  commonColors.ArraysEqual = function(array1, array2) {
    if (array1 === null) {
      return false;
    }
    if (array2 === null) {
      return false;
    }
    if (array1.length !== array2.length) {
      return false;
    }
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  };
}

(
  function()
  {
    var algo = new Object;
    algo.apiVersion = 2;
    algo.name = "__Common Colors";
    algo.author = "Ben Dodds";
    algo.acceptColors = 0;
    algo.properties = new Array();

    algo.rgbMap = function(width, height, rgb, step)
    { 
      var map = new Array(height);
      for (var y = 0; y < height; y++)
      {
          map[y] = new Array();
          for (var x = 0; x < width; x++)
          {
            map[y][x] = 0;
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

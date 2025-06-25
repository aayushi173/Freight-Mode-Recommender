(function(plugin) {
  
  // Helper function to check if `indexOf` exists
  if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(needle) {
          for (var i = 0; i < this.length; i++) {
              if (this[i] === needle) {
                  return i;
              }
          }
          return -1;
      };
  }

  // Ensure document is ready before executing functions
  (function(funcName, baseObj) {
      funcName = funcName || "docReady";
      baseObj = baseObj || window;
      var readyList = [];
      var readyFired = false;
      var readyEventHandlersInstalled = false;

      function ready() {
          if (!readyFired) {
              readyFired = true;
              for (var i = 0; i < readyList.length; i++) {
                  readyList[i].fn.call(window, readyList[i].ctx);
              }
              readyList = [];
          }
      }

      function readyStateChange() {
          if (document.readyState === "complete") {
              ready();
          }
      }

      baseObj[funcName] = function(callback, context) {
          if (readyFired) {
              setTimeout(function() {
                  callback(context);
              }, 1);
              return;
          } else {
              readyList.push({ fn: callback, ctx: context });
          }
          if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
              setTimeout(ready, 1);
          } else if (!readyEventHandlersInstalled) {
              if (document.addEventListener) {
                  document.addEventListener("DOMContentLoaded", ready, false);
                  window.addEventListener("load", ready, false);
              } else {
                  document.attachEvent("onreadystatechange", readyStateChange);
                  window.attachEvent("onload", ready);
              }
              readyEventHandlersInstalled = true;
          }
      };
  })("docReady", window);

  // Initialize plugin
  window[plugin] = function() {
      return {
          map: false,
          on_shift: false,
          selected_color: false,
      };
  }();

  docReady(function() {
      var me = window[plugin];
      var currentMap = "us"; // Track which map is active
      var map = me.map ? me.map : simplemaps_namap; // Default to US map
      var selected = [];
      var original_mapdata = JSON.parse(JSON.stringify(map.mapdata));
      var activeInput = "MEXCAN"; // Track which input is active

      // Handle focus on input fields
      document.getElementById("MEXCAN").addEventListener("focus", function() {
          activeInput = "MEXCAN";
      });

      document.getElementById("USSTATE").addEventListener("focus", function() {
          activeInput = "USSTATE";
      });

      function updateActiveInput(stateId) {
          var stateName = "Unknown State";

          if (currentMap === "mexico") {
              if (simplemaps_countrymap.mapdata.state_specific[stateId]) {
                  stateName = simplemaps_countrymap.mapdata.state_specific[stateId].name;
              } else {
                  console.warn(`State ID ${stateId} not found in Mexico map data.`);
                  return; // Prevent displaying random text
              }
          } else if (currentMap === "us") {
              if (simplemaps_namap.mapdata.state_specific[stateId]) {
                  stateName = simplemaps_namap.mapdata.state_specific[stateId].name;
              } else {
                  console.warn(`State ID ${stateId} not found in US map data.`);
                  return;
              }
          }

          document.getElementById(activeInput).value = stateName;
      }

      // Select function without color change
      function select(state) {
          if (currentMap === "mexico") {
              if (!simplemaps_countrymap.mapdata.state_specific[state]) {
                  console.warn(`State ${state} not found in Mexico map data, skipping selection.`);
                  return;
              }
              // No color change on selection
          } else if (currentMap === "us") {
              if (!simplemaps_namap.mapdata.state_specific[state]) {
                  console.warn(`State ${state} not found in US map data, skipping selection.`);
                  return;
              }
              // No color change on selection
          }

          if (selected.indexOf(state) === -1) {
              selected.push(state);
              updateActiveInput(state);
          }
      }

      function done(state) {
          if (map && map.refresh_state) {
              map.refresh_state(state); // Refresh the selected/deselected state
          }
          me.selected = selected; // Update the selected states array
      }

      // Deselect function
      var deselect = function (state) {
          // Check if the state exists in the map data
          if (!map.mapdata.state_specific[state]) {
              console.warn(`State ${state} not found in map data`);
              return; // Stop execution to prevent errors
          }

          var index = selected.indexOf(state);
          if (index > -1) {
              selected.splice(index, 1);
          }

          done(state);
      };

      function upon_click(state, e) {
          if (currentMap === "us" && state === "MX") { 
              switchToMexicoMap(); 
              return;
          }

          if (selected.indexOf(state) > -1) {
              deselect(state);
          } else {
              select(state);
          }
      }

      function attachMexicoMapClickHandler() {
          if (!simplemaps_countrymap.plugin_hooks.click_state) {
              simplemaps_countrymap.plugin_hooks.click_state = [];
          }
          simplemaps_countrymap.plugin_hooks.click_state.push(upon_click);
      }

      // Function to switch to Mexico map
      function switchToMexicoMap() {
          if (currentMap === "mexico") return;
          currentMap = "mexico";

          map = simplemaps_countrymap;

          if (typeof simplemaps_countrymap === "undefined") {
              console.log("Loading Mexico map data...");
              var script = document.createElement("script");
              script.src = "mapdata_mx.js";
              script.onload = function () {
                  if (typeof simplemaps_countrymap !== "undefined") {
                      console.log("Mexico map data loaded successfully.");
                      map.mapdata = simplemaps_countrymap.mapdata;
                      map.load();
                      attachMexicoMapClickHandler();
                  } else {
                      console.error("Mexico map data failed to load.");
                  }
              };
              document.body.appendChild(script);
          } else {
              console.log("Mexico map data already loaded.");
              map.mapdata = simplemaps_countrymap.mapdata;
              map.load();
              attachMexicoMapClickHandler();
          }
      }

      // Function to switch to US map
      function switchToUSMap() {
          if (currentMap === "us") return;
          currentMap = "us";
          map = simplemaps_namap;

          if (typeof simplemaps_namap === "undefined") {
              var script = document.createElement("script");
              script.src = "mapdata_na.js"; 
              script.onload = function() {
                  if (typeof simplemaps_namap !== "undefined") {
                      map.mapdata = simplemaps_namap.mapdata;
                      map.load();
                  } else {
                      console.error("US map data failed to load.");
                  }
              };
              document.body.appendChild(script);
          } else {
              map.mapdata = simplemaps_namap.mapdata;
              map.load();
          }
      }


      map.plugin_hooks.click_state.push(upon_click);

      
      document.getElementById("switch-to-mexico").addEventListener("click", switchToMexicoMap);
      document.getElementById("switch-to-us").addEventListener("click", switchToUSMap);

    
      window[plugin] = function() {
          return {
              map: map,
              selected: selected,
              select: select,
              deselect: deselect,
              switchToMexicoMap: switchToMexicoMap,
              switchToUSMap: switchToUSMap,
          };
      }();
  });
})("simplemaps_select");

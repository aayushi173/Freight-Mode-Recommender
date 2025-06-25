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
      var activeInput = "origin"; // Track which input is active

      // Handle focus on input fields
      document.getElementById("origin").addEventListener("focus", function() {
          activeInput = "origin";
      });

      document.getElementById("destination").addEventListener("focus", function() {
          activeInput = "destination";
      });
      var previousOriginState = null;
      var previousDestinationState = null;
      
    let originState = null;
    let destinationState = null;

    function updateActiveInput(stateId) {
        var stateName = "Unknown State";

        function resetStateColor(stateId, mapObj) {
            if (stateId && mapObj.mapdata.state_specific[stateId]) {
                mapObj.mapdata.state_specific[stateId].color = "#88a4bc"; // Reset to default color
            mapObj.refresh_state(stateId);
            }
        }

        // Determine which map and get state name
        if (currentMap === "mexico" && simplemaps_countrymap.mapdata.state_specific[stateId]) {
            stateName = simplemaps_countrymap.mapdata.state_specific[stateId].name;
            simplemaps_countrymap.mapdata.state_specific[stateId].color = "green";
            simplemaps_countrymap.refresh_state(stateId);
        } else if (currentMap === "us" && simplemaps_namap.mapdata.state_specific[stateId]) {
            stateName = simplemaps_namap.mapdata.state_specific[stateId].name;
            simplemaps_namap.mapdata.state_specific[stateId].color = "green";
            simplemaps_namap.refresh_state(stateId);
        } else {
            console.warn(`State ID ${stateId} not found in map data.`);
            return;
        }

        // Reset previous state for the active input
        if (activeInput === "origin") {
            if (originState && originState !== stateId) {
                resetStateColor(originState, currentMap === "us" ? simplemaps_namap : simplemaps_countrymap);
            }
            originState = stateId;
        } else if (activeInput === "destination") {
            if (destinationState && destinationState !== stateId) {
                resetStateColor(destinationState, currentMap === "us" ? simplemaps_namap : simplemaps_countrymap);
            }
            destinationState = stateId;
        }

        // Update input box
        document.getElementById(activeInput).value = stateName;
    }

        
        

        // Select function 
        function select(state) {
            // Reset all previously selected states' colors
            while (selected.length > 0) {
                const prevState = selected.pop(); // Remove the state from the selected array
                if (currentMap === "us" && simplemaps_namap.mapdata.state_specific[prevState]) {
                    simplemaps_namap.mapdata.state_specific[prevState].color = "#88a4bc"; // Reset to default color
                    simplemaps_namap.refresh_state(prevState);
                } else if (currentMap === "mexico" && simplemaps_countrymap.mapdata.state_specific[prevState]) {
                    simplemaps_countrymap.mapdata.state_specific[prevState].color = "#88a4bc"; // Reset to default color
                    simplemaps_countrymap.refresh_state(prevState);
                }
            }

            // Add the newly selected state
            selected.push(state);

            // Apply green color to the newly selected state
            if (currentMap === "us" && simplemaps_namap.mapdata.state_specific[state]) {
                simplemaps_namap.mapdata.state_specific[state].color = "green";
                simplemaps_namap.refresh_state(state);
            } else if (currentMap === "mexico" && simplemaps_countrymap.mapdata.state_specific[state]) {
                simplemaps_countrymap.mapdata.state_specific[state].color = "green";
                simplemaps_countrymap.refresh_state(state);
            }

            // Update the input box
            updateActiveInput(state);
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
                setTimeout(() => select(state), 100);
                return;
            }

            if (selected.includes(state)) {
                deselect(state);
                
                // setTimeout(() => select(state), 100);
                
                
            } else {
                selected = [];
                
                select(state);
                
                // setTimeout(() => select(state), 100);
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
        // Reset colors for the previous selections in the US map
        selected.forEach(state => {
            if (simplemaps_namap.mapdata.state_specific[state]) {
                simplemaps_namap.mapdata.state_specific[state].color = "#88a4bc";
            }
        });

        var selected_origin = [];
        var selected_dest = [];
        
        selected = [];
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

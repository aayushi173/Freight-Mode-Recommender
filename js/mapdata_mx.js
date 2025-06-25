var simplemaps_countrymap_mapdata={
  main_settings: {
   //General settings
    width: "responsive", //'700' or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    
    //State defaults
    state_description: "State description",
    state_color: "#88A4BC",
    state_hover_color: "#3B729F",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "no",
    
    //Location defaults
    location_description: "Location description",
    location_url: "",
    location_color: "#FF0067",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_size: 25,
    location_type: "square",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    
    //Label defaults
    label_color: "#ffffff",
    label_hover_color: "#ffffff",
    label_size: 16,
    label_font: "Arial",
    label_display: "auto",
    label_scale: "yes",
    hide_labels: "no",
    hide_eastern_labels: "no",
   
    //Zoom settings
    zoom: "yes",
    manual_zoom: "yes",
    back_image: "no",
    initial_back: "no",
    initial_zoom: "-1",
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,
    
    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
    //Advanced settings
    div: "map",
    auto_load: "no",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
    popups: "detect"
  },
  state_specific:{
    MXAGU: {
      name: "Aguascalientes",
      description: " "
    },
    MXBCN: {
      name: "Baja California",
      description: " "
    },
    MXBCS: {
      name: "Baja California Sur",
      description: " "
    },
    MXCAM: {
      name: "Campeche",
      description: " "
    },
    MXCHH: {
      name: "Chihuahua",
      description: " "
    },
    MXCHP: {
      name: "Chiapas",
      description: " "
    },
    MXCMX: {
      name: "Ciudad de Mexico",
      description: " "
    },
    MXCOA: {
      name: "Coahuila",
      description: " "
    },
    MXCOL: {
      name: "Colima",
      description: " "
    },
    MXDUR: {
      name: "Durango",
      description: " "
    },
    MXGRO: {
      name: "Guerrero",
      description: " "
    },
    MXGUA: {
      name: "Guanajuato",
      description: " "
    },
    MXHID: {
      name: "Hidalgo",
      description: " "
    },
    MXJAL: {
      name: "Jalisco",
      description: " "
    },
    MXMEX: {
      name: "México",
      description: " "
    },
    MXMIC: {
      name: "Michoacan",
      description: " "
    },
    MXMOR: {
      name: "Morelos",
      description: " "
    },
    MXNAY: {
      name: "Nayarit",
      description: " "
    },
    MXNLE: {
      name: "Nuevo Leon",
      description: " "
    },
    MXOAX: {
      name: "Oaxaca",
      description: " "
    },
    MXPUE: {
      name: "Puebla",
      description: " "
    },
    MXQUE: {
      name: "Queretaro",
      description: " "
    },
    MXROO: {
      name: "Quintana Roo",
      description: " "
    },
    MXSIN: {
      name: "Sinaloa",
      description: " "
    },
    MXSLP: {
      name: "San Luis Potosí",
      description: " "
    },
    MXSON: {
      name: "Sonora",
      description: " "
    },
    MXTAB: {
      name: "Tabasco",
      description: " "
    },
    MXTAM: {
      name: "Tamaulipas",
      description: " "
    },
    MXTLA: {
      name: "Tlaxcala",
      description: " "
    },
    MXVER: {
      name: "Veracruz",
      description: " "
    },
    MXYUC: {
      name: "Yucatan",
      description: " "
    },
    MXZAC: {
      name: "Zacatecas",
      description: " "
    }
  },
  locations: {
    // "0": {
    //   name: "Mexico City",
    //   lat: "19.434167",
    //   lng: "-99.138611"
    // }
  },
  labels: {
    MXAGU: {
      name: "Aguascalientes",
      parent_id: "MXAGU",
      x: 505,
      y: 374.9
    },
    MXBCN: {
      name: "Baja California",
      parent_id: "MXBCN",
      x: 118.9,
      y: 60.4
    },
    MXBCS: {
      name: "Baja California Sur",
      parent_id: "MXBCS",
      x: 188.7,
      y: 202.6
    },
    MXCAM: {
      name: "Campeche",
      parent_id: "MXCAM",
      x: 858.2,
      y: 475.9
    },
    MXCHH: {
      name: "Chihuahua",
      parent_id: "MXCHH",
      x: 388,
      y: 160.6
    },
    MXCHP: {
      name: "Chiapas",
      parent_id: "MXCHP",
      x: 782.1,
      y: 546
    },
    MXCMX: {
      name: "Ciudad de México",
      parent_id: "MXCMX",
      x: 596.8,
      y: 459.4
    },
    MXCOA: {
      name: "Coahuila",
      parent_id: "MXCOA",
      x: 508.9,
      y: 191
    },
    MXCOL: {
      name: "Colima",
      parent_id: "MXCOL",
      x: 461.4,
      y: 463.7
    },
    MXDUR: {
      name: "Durango",
      parent_id: "MXDUR",
      x: 431.1,
      y: 278.6
    },
    MXGRO: {
      name: "Guerrero",
      parent_id: "MXGRO",
      x: 581.7,
      y: 506.9
    },
    MXGUA: {
      name: "Guanajuato",
      parent_id: "MXGUA",
      x: 538,
      y: 410.8
    },
    MXHID: {
      name: "Hidalgo",
      parent_id: "MXHID",
      x: 601.6,
      y: 416.1
    },
    MXJAL: {
      name: "Jalisco",
      parent_id: "MXJAL",
      x: 441.3,
      y: 435.1
    },
    MXMEX: {
      name: "México",
      parent_id: "MXMEX",
      x: 579,
      y: 461.8
    },
    MXMIC: {
      name: "Michoacan",
      parent_id: "MXMIC",
      x: 523.8,
      y: 457.3
    },
    MXMOR: {
      name: "Morelos",
      parent_id: "MXMOR",
      x: 600.7,
      y: 474.2
    },
    MXNAY: {
      name: "Nayarit",
      parent_id: "MXNAY",
      x: 430.2,
      y: 375.9
    },
    MXNLE: {
      name: "Nuevo Leon",
      parent_id: "MXNLE",
      x: 569.6,
      y: 246.2
    },
    MXOAX: {
      name: "Oaxaca",
      parent_id: "MXOAX",
      x: 663.7,
      y: 527.1
    },
    MXPUE: {
      name: "Puebla",
      parent_id: "MXPUE",
      x: 626.1,
      y: 479.6
    },
    MXQUE: {
      name: "Queretaro",
      parent_id: "MXQUE",
      x: 568.1,
      y: 420.2
    },
    MXROO: {
      name: "Quintana Roo",
      parent_id: "MXROO",
      x: 906,
      y: 453.9
    },
    MXSIN: {
      name: "Sinaloa",
      parent_id: "MXSIN",
      x: 348.1,
      y: 261.7
    },
    MXSLP: {
      name: "San Luis Potosí",
      parent_id: "MXSLP",
      x: 556.2,
      y: 364.9
    },
    MXSON: {
      name: "Sonora",
      parent_id: "MXSON",
      x: 272.6,
      y: 127.7
    },
    MXTAB: {
      name: "Tabasco",
      parent_id: "MXTAB",
      x: 785.8,
      y: 496.7
    },
    MXTAM: {
      name: "Tamaulipas",
      parent_id: "MXTAM",
      x: 610,
      y: 333.5
    },
    MXTLA: {
      name: "Tlaxcala",
      parent_id: "MXTLA",
      x: 625.6,
      y: 454.7
    },
    MXVER: {
      name: "Veracruz",
      parent_id: "MXVER",
      x: 727.9,
      y: 507.6
    },
    MXYUC: {
      name: "Yucatan",
      parent_id: "MXYUC",
      x: 882.4,
      y: 418.1
    },
    MXZAC: {
      name: "Zacatecas",
      parent_id: "MXZAC",
      x: 487,
      y: 324.4
    }
  },
  legend: {
    entries: []
  },
  regions: {}
};
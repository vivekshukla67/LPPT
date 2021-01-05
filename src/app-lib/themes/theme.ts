export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {

    "--header-background": "white",
    "--header-text": "#3f3f3f",
    "--sidebar-background": "#171930",
    "--sidebar-bghighlight": "white",
    "--sidebar-highlightcolor": "black",
    "--button-deactive": "#b3b3b3",
    "--button-active": "white",
    "--button-primary": "#736cc7",
    "--placeholder-text":"#999899",

    "--background-color": "#fafafa",
    "--background-maincard": "white",
    "--background-subcard": "white",
    "--maincard-text": "#3d3d3d",
    "--card-subtext": "#212121",
    "--background-tags": "#fafafa",
    "--text-tags": "#434c5e",
    "--border-tags": "#a3afc1",
    "--footer-background":"#f1f0f9",
    "--footer-text":"#7770c8",

    "--mat-option-text": "#212121",
    "--mat-option-item": "white",

    "--border-card": "1px solid #eff1f4",

    "--mat-outline": "#dfe3e9",

    "--shadow-header": "0px 0px 8px #cbcbcb",
    "--shadow-sidebar": "0 0px 10px #171930",
    "--shadow-subcard": "0 0px 2px #b3b0b0",

    "--scroll-track": "white",
    "--scrollbar-color": "#d8d9da"
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--header-background": "#171930",
    "--header-text": "#736cc7",
    "--sidebar-background": "#171930",
    "--sidebar-bghighlight": "#0f101f",
    "--sidebar-highlightcolor": "white",
    "--button-deactive": "#0d1019",
    "--button-active": "black",
    "--button-primary": "#736cc7",
    "--placeholder-text":"#8a8a8b",

    "--background-color": "#2a3142",
    "--background-maincard": "#0f101f",
    "--background-subcard": "#2a3142",
    "--maincard-text": "white",
    "--card-subtext": "#b4c0d6",
    "--background-tags": "#1d2131",
    "--text-tags": "#fafafa",
    "--border-tags": "#1d2131",
    "--footer-background":"#3b3f61",
    "--footer-text":"white",

    "--border-card": "1px solid #23232d",

    "--mat-outline": "#2a3142",

    "--mat-option-text": "#d8d9da",
    "--mat-option-item": "#2a3142",
    "--shadow-header": "0px 0px 8px #171930",
    "--shadow-sidebar": "0px 0px 10px #171930",
    "--shadow-subcard": "0 0px 5px #060606",

    "--scroll-track": "#0f101f",
    "--scrollbar-color": "#2a3142"
    
  }
};

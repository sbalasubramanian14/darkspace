import * as React from "react";
import "./../../../node_modules/electron-tabs/electron-tabs.css";

export interface Props {
  children?: React.ReactNode;
}

export interface State {}

const TabGroup = require("electron-tabs");

export default class Browser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let tabGroup = new TabGroup({
      // If you want a new button that appends a new tab, include:
      newTab: {
        title: "New Tab"
        // The file will need to be local, probably a local-ntp.html file
        // like in the Google Chrome Browser.

        //src: "./some-index-file.html",
        //visible: true,
        //webviewAttributes: {
        //    nodeintegration: true
        //}
      }
    });
    let tab1 = tabGroup.addTab({
      title: "google",
      src: "https://www.google.com",
      visible: true
    });

    // 4. Add a new tab that contains a local HTML file
    let tab2 = tabGroup.addTab({
      title: "Local File",
      src: "./local.html",
      visible: true,
      // If the page needs to access Node.js modules, be sure to
      // enable the nodeintegration
      webviewAttributes: {
        nodeintegration: true
      }
    });
  }

  render() {
    return (
      <div>
        <div className="etabs-tabgroup">
          <div className="etabs-tabs"></div>
          <div className="etabs-buttons"></div>
        </div>
        <div className="etabs-views"></div>
      </div>
    );
  }
}

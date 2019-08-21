import * as React from "react";
import electron from "electron";
import "./BrowserTab.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Replay from "@material-ui/icons/Replay";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const WebView = require("react-electron-web-view");

export interface Props {
  children?: React.ReactNode;
}

export interface State {
  url: string;
}

const userAgentString =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36";
//"Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1;";
//"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36";

export default class BrowserTab extends React.Component<Props, State> {
  webviewRef!: Electron.WebviewTag;

  constructor(props: Props) {
    super(props);

    this.state = {
      url: "http://www.whoishostingthis.com/tools/user-agent/" //"https://www.google.com"
    };
  }

  componentDidMount() {}

  loadURL = (url: string) => {
    let https = url.slice(0, 8).toLowerCase();
    let http = url.slice(0, 7).toLowerCase();
    if (https === "https://" || http === "http://") {
      this.webviewRef
        .loadURL(url, {
          userAgent: userAgentString
        })
        .catch(error => console.log("no such page exists."));
    } else {
      this.webviewRef
        .loadURL("http://" + url, { userAgent: userAgentString })
        .catch(error => console.log("no such page exists."));
    }
  };

  render() {
    return (
      <div className="h-100 bg-white browser-tab search-bar">
        <AppBar position="relative" className="position-fixed">
          <Toolbar variant="dense">
            <Paper className="root">
              <InputBase
                className="input"
                placeholder=""
                inputProps={{ "aria-label": "Search" }}
                onKeyDown={(e: any) => {
                  if (e.keyCode === 13) {
                    this.loadURL(e.target.value);
                  }
                }}
              />
              <IconButton className="icon-button" aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider className="divider" />
              <IconButton
                color="primary"
                className="icon-button"
                aria-label="directions"
              >
                <Replay />
              </IconButton>
              <Divider className="divider" />
              <IconButton
                color="primary"
                className="icon-button"
                aria-label="directions"
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                color="primary"
                className="icon-button"
                aria-label="directions"
              >
                <ChevronRightIcon />
              </IconButton>
            </Paper>
            <section className="right-toolbar">
              <IconButton aria-label="show 4 new mails" color="inherit">
                <MailIcon />
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <NotificationsIcon />
              </IconButton>
            </section>
          </Toolbar>
        </AppBar>
        <WebView
          id="webview"
          className="web-view"
          autosize={true}
          ref={(input: any) => {
            this.webviewRef = input;
          }}
          // nodeintegration
          // nodeintegrationinsubframes
          // enableremotemodule="false"
          webpreferences="allowRunningInsecureContent, javascript=yes"
          allowpopups
          useragent={userAgentString}
          enableremotemodule="false"
          src={this.state.url}
          style={{
            height: "100%",
            width: "100%",
            display: "block"
          }}
        />
      </div>
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import "./widget.scss";
import { Icon, Card } from "@alifd/next";
import "@alifd/next/lib/button/style";
import "@alifd/next/lib/card/style";
const iconUrl =
  "https://img.alicdn.com/imgextra/i2/O1CN01cKpD0O22anTxXLCuA_!!6000000007137-55-tps-200-200.svg";
class Widget extends Component {
  constructor(props) {
    super(props);
    this.clickTime = null;
    this.state = {
      opened: false,
      showDock: true,
    };
  }

  getPx = (num) => {
    if (num <= 5) num = 5;
    return num + "px";
  };

  isMouse = () => {
    return this.clickTime && this.clickTime > 100;
  };

  handleToggleOpen = () => {
    const boxDom = document.querySelector(".docked-widget");
    if (Number(boxDom.style.right.slice(0, -2)) < 10) {
      boxDom.style.right = "10px";
      return;
    }
    if (this.isMouse() && this.state.showDock === true) return;

    this.setState((prev) => {
      let { showDock } = prev;

      if (!prev.opened && this.clickTime < 100) {
        showDock = false;
        const boxDom = document.querySelector(".docked-widget");
        if (Number(boxDom.style.right.slice(0, -2)) < 10) {
          boxDom.style.right = "10px";
        }
      }
      return {
        showDock,
        opened: !prev.opened,
      };
    });
  };

  handleWidgetExit = () => {
    this.setState({
      showDock: true,
    });
  };
  hideDock = (evt) => {
    evt.stopPropagation();
    const boxDom = document.querySelector(".docked-widget");
    boxDom.style.right = "-40px";
  };
  componentDidMount() {
    const boxDom = document.querySelector(".docked-widget");
    window.boxDom = boxDom;
    boxDom.onmousedown = (event) => {
      const start = Date.now();
      var evt = event || window.event;
      var startX = evt.clientX + Number(boxDom.style.right.slice(0, -2));
      var startY = evt.clientY + Number(boxDom.style.bottom.slice(0, -2));

      document.onmousemove = (event) => {
        var evt = event || window.event;
        boxDom.style.right = this.getPx(startX - evt.clientX);
        boxDom.style.bottom = this.getPx(startY - evt.clientY);
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        const end = Date.now();
        this.clickTime = end - start;
      };
    };
  }

  renderBody = () => {
    const { showDock } = this.state;
    if (!showDock) return "";

    return (
      <div style={{ display: "flex" }} className="dock-body">
        <img
          src={iconUrl}
          style={{ width: 48, height: 48, cursor: "pointer" }}
          draggable={false}
          onClick={this.handleToggleOpen}
          onKeyPress={this.handleToggleOpen}
        ></img>
        <Icon
          type="delete-filling"
          size="small"
          className="hide-icon"
          onClick={this.hideDock}
        />
      </div>
    );
  };

  render() {
    const { opened } = this.state;
    const body = this.renderBody();
    const { headerText, style, children, initBottom, initRight } = this.props;

    return (
      <div
        className="docked-widget"
        style={{ bottom: initBottom || 10, right: initRight || 10 }}
      >
        <Transition in={opened} timeout={250} onExited={this.handleWidgetExit}>
          {(status) => {
            return (
              <div className={`widget widget-${status}`}>
                <Card free style={style}>
                  <Card.Header
                    title={headerText}
                    extra={
                      <Icon
                        type="close"
                        size="small"
                        onClick={this.handleToggleOpen}
                        onKeyPress={this.handleToggleOpen}
                      />
                    }
                  />
                  <Card.Content>{children}</Card.Content>
                </Card>
              </div>
            );
          }}
        </Transition>
        {body}
      </div>
    );
  }
}

Widget.propTypes = {
  headerText: PropTypes.string,
  bodyText: PropTypes.string,
  footerText: PropTypes.string,
};

Widget.defaultProps = {
  headerText: "Header",
  bodyText: "Body",
  footerText: "Footer",
};

export default Widget;

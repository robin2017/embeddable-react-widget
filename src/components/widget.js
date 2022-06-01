import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import "./widget.scss";
import { Icon, Card } from "@alifd/next";
import "@alifd/next/lib/button/style";
import "@alifd/next/lib/card/style";
const iconUrl =
  "https://img.alicdn.com/imgextra/i2/O1CN01cKpD0O22anTxXLCuA_!!6000000007137-55-tps-200-200.svg";
const CONTAINER_ID = "widget-container";
const PADDING = 5;
const HIDE_RIGHT = "-40px";
class Widget extends Component {
  constructor(props) {
    super(props);
    this.clickTime = 0;
    this.domContainer = null;
    this.bottom = "10px";
    this.right = "10px";
    this.state = {
      opened: false,
      showDock: true,
    };
  }
  pxToStr = (num, minValue) => {
    if (typeof num === "string") num = Number(str.slice(0, -2));
    if (num < minValue) {
      return minValue + "px";
    }
    return num + "px";
  };
  pxToNum = (str) => {
    if (typeof str === "number") return str;
    return Number(str.slice(0, -2));
  };
  isMouse = () => {
    return this.clickTime && this.clickTime > 200;
  };

  handleToggleOpen = () => {
    if (
      this.pxToNum(this.domContainer.style.right) < this.pxToNum(this.right)
    ) {
      this.domContainer.style.right = this.right;
      return;
    }
    if (this.isMouse() && this.state.showDock === true) return;

    this.setState((prev) => {
      let { showDock } = prev;

      if (!prev.opened && !this.isMouse()) {
        showDock = false;
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
    this.domContainer.style.right = HIDE_RIGHT;
  };
  componentDidMount() {
    this.domContainer = document.getElementById(CONTAINER_ID);
    this.domContainer.onmousedown = (evt) => {
      const start = Date.now();
      var startX = evt.clientX + this.pxToNum(this.domContainer.style.right);
      var startY = evt.clientY + this.pxToNum(this.domContainer.style.bottom);
      document.onmousemove = (e) => {
        this.domContainer.style.right = this.pxToStr(
          startX - e.clientX,
          PADDING
        );
        this.domContainer.style.bottom = this.pxToStr(
          startY - e.clientY,
          PADDING
        );
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
    if (!showDock) return null;
    return (
      <div className="dock-body">
        <img
          src={iconUrl}
          className="icon"
          draggable={false}
          onClick={this.handleToggleOpen}
        />
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
    const { title, style = {}, children } = this.props;
    this.bottom = style.bottom ? this.pxToStr(style.bottom) : this.bottom;
    this.right = style.right ? this.pxToStr(style.right) : this.right;
    return (
      <div
        id="widget-container"
        style={{ bottom: this.bottom, right: this.right }}
      >
        <Transition in={opened} timeout={10} onExited={this.handleWidgetExit}>
          {(status) => {
            return (
              <div className={`widget widget-${status}`}>
                <Card free style={style}>
                  <Card.Header
                    title={title}
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
  title: PropTypes.string,
  children: PropTypes.object,
  style: PropTypes.object,
};

Widget.defaultProps = {
  title: "标题",
  style: {},
  children: <div>示例</div>,
};

export default Widget;

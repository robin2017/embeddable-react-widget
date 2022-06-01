import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import "./widget.scss";
import { Button, Icon, Card } from "@alifd/next";
import "@alifd/next/lib/button/style";
import "@alifd/next/lib/card/style";
class Widget extends Component {
  constructor(props) {
    super(props);
    this.clickTime = null;
    this.state = {
      opened: false,
      showDock: true,
   
    };
  }

  isMouse =()=>{
    return this.clickTime && this.clickTime >100
  }

  handleToggleOpen = () => {
 
    if(this.isMouse() && this.state.showDock === true ) return
   
    this.setState((prev) => {

      let { showDock } = prev;
      console.log('1111:',showDock)
      if (!prev.opened && this.clickTime <100) {
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
  componentDidMount() {
    console.log("componentDidMount");
    const boxDom = document.querySelector(".docked-widget");
    window.boxDom = boxDom
    boxDom.onmousedown = (event) => {
      const start = Date.now();
      var evt = event || window.event;
      var startX = evt.clientX - boxDom.offsetLeft;
      var startY = evt.clientY - boxDom.offsetTop;
      document.onmousemove = (event) => {
        var evt = event || window.event;
        boxDom.style.left = evt.clientX - startX + "px";
        boxDom.style.top = evt.clientY - startY + "px";
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
    console.log("fffffffffff:", this.clickTime);
    // if(this.state.isMouse) return null
    // if (this.clickTime && this.clickTime > 100) return null;
    const { showDock } = this.state;

    if (!showDock) return "";

    return (
      <Button
        type="primary"
        className="dock"
        onClick={this.handleToggleOpen}
        onKeyPress={this.handleToggleOpen}
      >
        ^ OPEN ^sss
      </Button>
    );
  };

  render() {
 
    const { opened } = this.state;
    const body = this.renderBody();
    const { headerText, style, children } = this.props;

    return (
      <div className="docked-widget">
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

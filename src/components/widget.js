import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import "./widget.scss";
import { Button, Icon, Card } from "@alifd/next";
import "@alifd/next/lib/button/style";
import "@alifd/next/lib/card/style";
class Widget extends Component {
  state = {
    opened: false,
    showDock: true,
  };

  handleToggleOpen = () => {
    this.setState((prev) => {
      let { showDock } = prev;
      if (!prev.opened) {
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

  renderBody = () => {
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
    const { headerText,style, children } = this.props;

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
                  <Card.Content>
                    {children}
                  </Card.Content>
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

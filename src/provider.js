import React, { Children } from "react";
import { storeShape } from "./static-prop-types";
import { StoreContext } from "./store-context";

export default class Provider extends React.PureComponent {
  static propTypes = {
    store: storeShape.isRequired
  };

  render() {
    return (
      <StoreContext.Provider value={this.props.store}>
        {Children.only(this.props.children)}
      </StoreContext.Provider>
    );
  }
}

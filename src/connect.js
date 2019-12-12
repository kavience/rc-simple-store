import React from "react";
import shallowEqual from "shallowequal";
import { StoreContext } from "./store-context";

export const connect = (mapStateToProps = () => ({})) => WrappedComponent => {
  const shouldSubscribe = !!mapStateToProps;

  class WrapperComponent extends React.Component {
    static contextType = StoreContext;

    constructor(props, context) {
      super(props, context);
      this.state = {
        ...mapStateToProps(this.context.getState())
      };
    }

    componentDidMount() {
      this.trySubscribe();
    }

    componentWillUnmount() {
      this.tryUnsubscribe();
    }

    shouldComponentUpdate(nextProps, nextState) {
      return (
        !shallowEqual(this.props, nextProps) ||
        !shallowEqual(this.state.subscribed, nextState.subscribed)
      );
    }

    handleChange = () => {
      if (!this.unsubscribe) {
        return;
      }
      const nextState = mapStateToProps(this.context.getState());
      this.setState({ subscribed: nextState });
    };

    trySubscribe = () => {
      if (shouldSubscribe) {
        this.unsubscribe = this.context.subscribe(this.handleChange);
        this.handleChange();
      }
    };

    tryUnsubscribe() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }

    render() {
      let props = {
        ...this.props,
        ...this.state.subscribed,
        store: this.context
      };

      return <WrappedComponent {...props} />;
    }
  }

  return WrapperComponent;
};

export default connect;

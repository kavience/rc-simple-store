# rc-simple-store

## a simple store for react component

Use rc-simple-store like redux, but more simple:

```javascript
import React from "react";
import { Provider, create } from "rc-simple-store";
import ComptA from "./compt-a";
import ComptB from "./compt-b";
import ComptC from "./compt-c";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = create({
      count: 2
    });
  }
  render() {
    return (
      <Provider store={this.store}>
        <ComptA>
          <ComptC />
          <ComptB />
        </ComptA>
      </Provider>
    );
  }
}
```

`ComptA` is parent component like this:

```javascript
import React from "react";
import { connect } from "rc-simple-store";

export class ComptA extends React.Component {
  render() {
    return (
      <div>
        <h1>Compt A --- {this.props.count}</h1>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  count: store.count,
});

export default connect(mapStateToProps)(ComptA);
```

`ComptB` and `ComptC` is child components like this:

```javascript
import React from "react";
import { connect } from "rc-simple-store";

export class ComptB extends React.Component {
  handleSub = () => {
    this.props.store.setState({
      count: this.props.count - 1
    });
  };
  render() {
    return (
      <div>
        <h1 onClick={this.handleSub}>Compt B --- {this.props.count}</h1>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  count: store.count,
});

export default connect(mapStateToProps)(ComptB);
```

```javascript
import React from "react";
import { connect } from "rc-simple-store";

export class ComptC extends React.Component {
  handleAdd = () => {
    this.props.store.setState({
      count: this.props.count + 1,
    });
  };
  render() {
    return (
      <div>
        <h1 onClick={this.handleAdd}>Compt C --- {this.props.count}</h1>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  count: store.count,
});

export default connect(mapStateToProps)(ComptC);
```

## API

### `create(initialState)`

Create a global state

### `<Provider store>`

Provide store

### `store.setState()`

update global state

### `connect(mapStateToProps)`

Connect parent and use global state

## License

MIT
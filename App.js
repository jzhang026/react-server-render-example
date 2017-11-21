import React from 'react';

const DOM = React.DOM,
  div = DOM.div,
  button = DOM.button,
  ul = DOM.ul,
  li = DOM.li;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      disabled: true,
    }
  }
  componentDidMount() {
    this.setState({
      diabled: false,
    })
  }
  handleClick = () => {
    this.setState({
      items: this.state.items.concat('Item ' + this.state.items.length)
    })
  }

  render() {
    return (
      <div>
        <button
          onClick={this.handleClick}
          disabled: this.state.disabled
        >
          Add Item
        </button>
        <ul>
          {
            this.state.items.map((item) => <li>{item}</li>)
          }
        </ul>
      </div>
    )
  }
}

export default App
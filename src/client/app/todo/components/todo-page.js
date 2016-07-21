import React, {PropTypes} from 'react';

class TodoPage extends React.Component {
  render() {
    return (
      <div className="todo-page container">
        {this.props.children}
      </div>
    );
  }
}

TodoPage.propTypes = {children: PropTypes.object};

export default TodoPage;
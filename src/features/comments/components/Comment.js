import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, ButtonToolbar } from 'rsuite'


const Comment = ({ comment: { id, body } }) => {
  // console.log(comment)
  // const { id, body } = comment
  return (
    <Panel header={<h1>{id}</h1>} bordered style={{ margin: 20 }}>
      {body}
      <ButtonToolbar style={{ marginTop: 10 }}>
        <Button size="lg" color="red" onClick={() => {}}>
          Delete
        </Button>
        <Button
          size="lg"
          color="cyan"
          onClick={() => {}}
        >
          Patch
        </Button>
        {/* <Button color="yellow" size="lg" style={{ width: 100 }}>Test</Button> */}
      </ButtonToolbar>
    </Panel>
  )
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  // id: PropTypes.string.isRequired,
  // body: PropTypes.string.isRequired,
};

export default Comment;

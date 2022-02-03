import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, ButtonToolbar } from 'rsuite'



// const Comment = ({ comment: { id, body }, onDelete }) => {
const Comment = ({ id, body, email, onDelete, onPatch, onUpdate }) => {
  // console.log(comment)
  // const { id, body } = comment
  return (
    <Panel header={<h1>{id}</h1>} bordered style={{ margin: 20 }}>
      {body}
      {/* <h5>{email}</h5> */}
      <ButtonToolbar style={{ marginTop: 10 }}>
        <Button size="lg" color="red" onClick={() => onDelete(id)}>
          Delete
        </Button>
        <Button size="lg" color="cyan" onClick={() => onPatch(id, { body: 'NEW TEXT' }) }>
          Patch
        </Button>
        {/* <Button size="lg" color="cyan" onClick={() => onUpdate(id, { email: 'test@test.com' }) }>
          Patch
        </Button> */}
        {/* <Button color="yellow" size="lg" style={{ width: 100 }}>Test</Button> */}
      </ButtonToolbar>
    </Panel>
  )
};

Comment.propTypes = {
  // comment: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPatch: PropTypes.func.isRequired
};


// the reason why we are using useMemo here is to reduce the number of re-renders
// this component will only re-renders if say the values of "id, body, onDelete" have changed
// this can speed up your app
export default memo(Comment);

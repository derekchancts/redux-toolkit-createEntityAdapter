import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { 
  fetchComments, 
  commentSelectors, 
  deleteComment, 
  patchComment, 
  updateOneComment,
  removeLikes,
  removeTagById 
} from './commentsSlice'
import Comment from './components/Comment';
import { Button } from 'rsuite';


const Comments = () => {
  const dispatch = useDispatch();
  
  // const total = useSelector(commentSelectors.selectTotal);
  const allComments = useSelector(commentSelectors.selectAll);
  // const commentWithId = useSelector(state => commentSelectors.selectById(state, 5));
  // console.log({ allComments });


  // const onDelete = async (id) => {
  //   await dispatch(deleteComment(id))

    // WE CAN GET THE VALUES LIKE THE "PAYLOAD" AFTER THE DISPATCH, TO UPDATE OUR UI IF WE WANT TO. EG THE LOADING STATUS
    // const res =  await dispatch(deleteComment(id))
    // console.log(res)
  // };
  const onDelete = useCallback( async (id) => {
    await dispatch(deleteComment(id))
    // const res = await dispatch(deleteComment(id))
    // console.log(res)
  }, []);


  const onPatch = async (id, newData) => {
    await dispatch(patchComment({ id, newData }))  // can only pass 1 argument to think. So, need to pass them as an object instead
  };


  // const onUpdate = useCallback((id, newData) => {
  //   dispatch(updateOneComment({ id, changes: newData}));
  // }, []);
  
  const onUpdate = async (id, newData) => {
    const res = await dispatch(updateOneComment({ id, changes: newData }));
    console.log(res)
  };
  


  useEffect(() => {
    dispatch(fetchComments());
  }, [])


  return (
    <>
      <Button size="lg" color="blue" style={{ margin: 10 }} onClick={() => dispatch(removeLikes())}> 
        Remove All Likes
      </Button>
    
      <Button size="lg" color="yellow" onClick={() => dispatch(removeTagById('2a8d537b-c3f1-41f5-baaf-670c94ab0ff8'))}> 
        Remove 1 Tag
      </Button>
     {
       allComments.map(comment => 
        <Comment 
          key={comment.id} 
          // comment={comment}
          id={comment.id}
          body={comment.body}
          email={comment.email}
          onDelete={onDelete}
          onPatch={onPatch}
          onUpdate={onUpdate} 
      />)
     } 
    </>
  )
};

export default Comments;

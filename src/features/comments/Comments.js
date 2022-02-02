import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments, commentSelectors } from './commentsSlice'
import Comment from './components/Comment';


const Comments = () => {
  const dispatch = useDispatch();
  
  // const total = useSelector(commentSelectors.selectTotal);
  const allComments = useSelector(commentSelectors.selectAll);
  // const commentWithId = useSelector(state => commentSelectors.selectById(state, 5));
  // console.log({ allComments });


  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch])

  return (
    <>
     {
       allComments.map(comment => <Comment key={comment.id} comment={comment} />)
     } 
    </>
  )
};

export default Comments;

// src/components/Post.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPost, fetchCommentsByPostId } from "../features/postSlice";
import { Spinner, Container, Card, ListGroup } from "react-bootstrap";

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.currentPost);
  const comments = useSelector((state) => state.posts.comments);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchPost({ id }));
      dispatch(fetchCommentsByPostId(id));
    }
  }, [id, dispatch]);

  if (status === "loading")
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  if (status === "failed")
    return <div className="alert alert-danger">{error}</div>;

  return (
    <Container>
      {post ? (
        <Card className="my-4 p-3">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </Card>
      ) : (
        <div className="alert alert-warning">Post not found</div>
      )}
      <h3 className="my-4">Comments</h3>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <p>{comment.body}</p>
            <p className="text-muted">
              <strong>{comment.email}</strong>
            </p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Post;

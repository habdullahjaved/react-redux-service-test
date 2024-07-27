// src/components/PostList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postSlice";
import { Link } from "react-router-dom";
import { Spinner, Container, Row, Col } from "react-bootstrap";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts({ q: 10, page: 1, per_page: 5 }));
    }
  }, [status, dispatch]);

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
      <h2 className="my-4">Posts List</h2>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={4} className="mb-4">
            <Link to={`/post/${post.id}`} className="text-decoration-none">
              <div className="card p-3 h-100">
                <h5>{post.title}</h5>
                <p>{post.body.slice(0, 100)}...</p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostList;

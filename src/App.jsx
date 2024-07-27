// src/App.js
import React, { lazy, Suspense } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const PostList = lazy(() => import("./posts/PostList"));
const Post = lazy(() => import("./posts/Post"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

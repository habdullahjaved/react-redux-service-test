// src/services/postService.js

import http, { createConfig } from "./http";

const getAll = (params = {}) => {
  const config = createConfig({
    url: "/posts",
    params,
  });
  return http(config);
};

const get = (id, headers = {}) => {
  const config = createConfig({
    url: `/posts/${id}`,
    headers,
  });
  return http(config);
};

const create = (data, headers = {}) => {
  const config = createConfig({
    method: "post",
    url: "/posts",
    data,
    headers,
  });
  return http(config);
};

const update = (id, data, headers = {}) => {
  const config = createConfig({
    method: "put",
    url: `/posts/${id}`,
    data,
    headers,
  });
  return http(config);
};

const remove = (id, headers = {}) => {
  const config = createConfig({
    method: "delete",
    url: `/posts/${id}`,
    headers,
  });
  return http(config);
};

const removeAll = (headers = {}) => {
  const config = createConfig({
    method: "delete",
    url: `/posts`,
    headers,
  });
  return http(config);
};
const getCommentsByPostId = (postId) => {
  const config = createConfig({
    url: `/comments`,
    params: { postId },
  });
  return http(config);
};
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getCommentsByPostId,
};

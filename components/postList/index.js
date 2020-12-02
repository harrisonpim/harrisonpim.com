import React from "react";
import Post from "./post";

export default function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

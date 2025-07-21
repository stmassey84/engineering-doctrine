import React from "react";
import { useParams } from "react-router-dom";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{slug?.replace(/-/g, " ")}</h1>
      <p>This is the full content of the post titled "{slug}".</p>
    </div>
  );
};

export default BlogPost;

import React from "react";
import { Link } from "react-router-dom";

type PostCardProps = {
  title: string;
  slug: string;
  excerpt: string;
};

const PostCard: React.FC<PostCardProps> = ({ title, slug, excerpt }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">
        <Link to={`/post/${slug}`} className="hover:text-blue-500">
          {title}
        </Link>
      </h2>
      <p>{excerpt}</p>
    </div>
  );
};

export default PostCard;

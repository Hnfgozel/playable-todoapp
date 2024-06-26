"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Post } from "@/types/types";

interface Props {
  post: Post;
  handleTagClick: (tagName: string) => void;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
}
const TodoCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: Props) => {
  const { data: session } = useSession();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.description);
    navigator.clipboard.writeText(post.description);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post ? post.imageUrl : null}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.description
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.description ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.description}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
        <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={() => handleEdit && handleEdit(post)}
        >
          Edit
        </p>
        <p
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={() => handleDelete(post)}
        >
          Delete
        </p>
      </div>
    </div>
  );
};

export default TodoCard;

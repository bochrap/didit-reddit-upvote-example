"use client";

import { saveComment } from "@/actions/comments";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export function CommentForm({ postId, parentCommentId }) {
  const session = useSession();
  const [state, dispatch] = useFormState(saveComment, {
    postId,
    parentCommentId,
  });
  const boundDispatch = dispatch.bind({ postId, parentCommentId });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <div className="ml-4">
      <button onClick={() => setOpen(!isOpen)} className="text-zinc-400">
        {isOpen ? "Close" : "Reply"}
      </button>
      {isOpen ? (
        <>
          {/* <h2>
            Leave a comment, on post {postId}, parentcomment {parentCommentId}
          </h2> */}
          <form action={boundDispatch} className="flex flex-col space-y-3">
            <textarea name="comment" className="bg-zinc-800 p-3 rounded" placeholder="Type your comment..." />
            <button type="submit" className="bg-pink-300 py-2 px-3 rounded">
              Submit
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
}

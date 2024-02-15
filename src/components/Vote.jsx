import { db } from "@/db";
import auth from "../app/middleware";
import { revalidatePath } from "next/cache";
import { VoteButton } from "./VoteButton";

export async function Vote({ postId, votes }) {
  async function upvote() {
    "use server";
    const session = await auth();
    if (session === null) {
      console.log("You have to be logged in to vote");
    } else {
      console.log("Upvote", postId, "by user", session.user.id);
      await db.query("INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, $4)", [session.user.id, postId, 1, "post"]);
    }

    revalidatePath("/");
    revalidatePath(`/post/${postId}`);
  }

  async function downvote() {
    "use server";
    const session = await auth();
    if (session === null) {
      console.log("You have to be logged in to vote");
    } else {
      console.log("Downvote", postId, "by user", session.user.id);
      await db.query("INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, $4)", [session.user.id, postId, -1, "post"]);
    }

    revalidatePath("/");
    revalidatePath(`/post/${postId}`);
  }

  return (
    <>
      {votes} votes
      <div className="flex space-x-3">
        <form action={upvote}>
          <VoteButton label="Upvote" />
        </form>
        <form action={downvote}>
          <VoteButton label="Downvote" />
        </form>
      </div>
    </>
  );
}

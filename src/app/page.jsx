import { PostList } from "../components/PostList";
import Tiptap from "../components/Tiptap";

export default async function Home() {
  return (
    <div>
      <Tiptap />
      <PostList />
    </div>
  );
}

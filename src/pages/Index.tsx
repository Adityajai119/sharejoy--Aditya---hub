import { useState } from "react";
import { CreatePost } from "@/components/CreatePost";
import { Post } from "@/components/Post";

const initialPosts = [
  {
    id: 1,
    content: "Just launched my new project! 🚀 Super excited to share it with everyone. What do you think?",
    author: "Sarah Johnson",
    timestamp: "2024-02-10T10:00:00Z",
    likes: 15,
    comments: [
      {
        id: 1,
        content: "This looks amazing! Can't wait to try it out.",
        author: "Mike Chen",
        timestamp: "2024-02-10T10:30:00Z",
      },
    ],
  },
  {
    id: 2,
    content: "Beautiful sunset at the beach today. Nature never fails to amaze me. 🌅",
    author: "Alex Thompson",
    timestamp: "2024-02-10T09:00:00Z",
    likes: 24,
    comments: [],
  },
];

const Index = () => {
  const [posts, setPosts] = useState(initialPosts);

  const handleNewPost = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Social Feed
        </h1>
        
        <CreatePost onPostCreated={handleNewPost} />
        
        <div className="space-y-6">
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
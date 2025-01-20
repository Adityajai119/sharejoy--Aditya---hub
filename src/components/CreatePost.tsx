import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export function CreatePost({ onPostCreated }: { onPostCreated: (post: any) => void }) {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newPost = {
      id: Date.now(),
      content,
      author: "You",
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    onPostCreated(newPost);
    setContent("");
    toast({
      title: "Success",
      description: "Post created successfully!",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4 resize-none"
        rows={3}
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="gap-2">
          <Send className="w-4 h-4" />
          Post
        </Button>
      </div>
    </div>
  );
}
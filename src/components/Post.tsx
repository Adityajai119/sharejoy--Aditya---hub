import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: number;
  content: string;
  author: string;
  timestamp: string;
}

interface PostProps {
  id: number;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

export function Post({ id, content, author, timestamp, likes: initialLikes, comments: initialComments }: PostProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      content: newComment,
      author: "You",
      timestamp: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <Card className="mb-6 post-card">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{author}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{content}</p>

        <div className="flex items-center gap-6 border-t pt-4">
          <Button
            variant="ghost"
            size="sm"
            className={`like-button gap-2 ${isLiked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            {likes}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-5 h-5" />
            {comments.length}
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </Button>
        </div>

        {showComments && (
          <div className="mt-4 comment-section">
            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="resize-none"
                rows={1}
              />
              <Button onClick={handleComment}>Comment</Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
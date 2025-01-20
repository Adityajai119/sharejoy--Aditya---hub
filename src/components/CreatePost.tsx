import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Image, X } from "lucide-react";

export function CreatePost({ onPostCreated }: { onPostCreated: (post: any) => void }) {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!content.trim() && !imagePreview) {
      toast({
        title: "Error",
        description: "Post must contain either text or an image",
        variant: "destructive",
      });
      return;
    }

    const newPost = {
      id: Date.now(),
      content,
      image: imagePreview,
      author: "You",
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    onPostCreated(newPost);
    setContent("");
    setImagePreview(null);
    toast({
      title: "Success",
      description: "Post created successfully!",
    });
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
      
      {imagePreview && (
        <div className="relative mb-4">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-h-64 rounded-lg object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <Image className="w-4 h-4" />
            Add Image
          </Button>
        </div>
        <Button onClick={handleSubmit} className="gap-2">
          <Send className="w-4 h-4" />
          Post
        </Button>
      </div>
    </div>
  );
}
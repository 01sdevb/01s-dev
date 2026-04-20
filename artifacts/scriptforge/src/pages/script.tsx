import { useEffect } from "react";
import { Link, useParams } from "wouter";
import {
  useGetScript,
  useLikeScript,
  useViewScript,
  getGetScriptQueryKey,
  getListScriptsQueryKey,
  getGetTrendingScriptsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Copy,
  ThumbsUp,
  Eye,
  ShieldCheck,
  ArrowLeft,
  User,
  Calendar,
  Code2,
  Gamepad2,
} from "lucide-react";

export default function ScriptDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id || "0", 10);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: script, isLoading } = useGetScript(id, {
    query: { queryKey: getGetScriptQueryKey(id), enabled: !!id },
  });

  const likeMutation = useLikeScript({
    mutation: {
      onSuccess: (data) => {
        queryClient.setQueryData(getGetScriptQueryKey(id), (old: typeof script) =>
          old ? { ...old, likes: data.likes, isLikedByMe: data.liked } : old
        );
        queryClient.invalidateQueries({ queryKey: getListScriptsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTrendingScriptsQueryKey() });
      },
      onError: () => {
        toast({
          title: "Failed to like",
          description: "Please try again",
          variant: "destructive",
        });
      },
    },
  });

  const viewMutation = useViewScript();

  useEffect(() => {
    if (id && script) {
      viewMutation.mutate({ id });
    }
  }, [id, script?.id]);

  const handleCopy = () => {
    if (!script) return;
    navigator.clipboard.writeText(script.code);
    toast({ title: "Copied!", description: "Script copied to clipboard" });
  };

  const handleLike = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "You need to be logged in to like scripts",
        variant: "destructive",
      });
      return;
    }
    likeMutation.mutate({ id });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      GUI: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Admin: "bg-red-500/10 text-red-500 border-red-500/20",
      Hub: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      FPS: "bg-green-500/10 text-green-500 border-green-500/20",
      Tycoon: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };
    return colors[category] || "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
  };

  if (isLoading) {
    return (
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!script) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-4">
        <h2 className="text-2xl font-bold mb-2">Script not found</h2>
        <p className="text-muted-foreground mb-6">This script may have been removed or does not exist.</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scripts
        </Link>
      </Button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="outline" className={getCategoryColor(script.category)}>
            {script.category}
          </Badge>
          {script.isVerified && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {script.isPremium && (
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20" variant="outline">
              Premium
            </Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">{script.title}</h1>

        {/* Meta info */}
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>
              by{" "}
              <Link
                href={`/profile/${script.authorUsername}`}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {script.authorUsername}
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            <span>{script.game}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(script.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{script.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCopy} variant="outline" className="gap-2">
          <Copy className="h-4 w-4" />
          Copy Script
        </Button>
        <Button
          onClick={handleLike}
          variant={script.isLikedByMe ? "default" : "outline"}
          className="gap-2"
          disabled={likeMutation.isPending}
          data-testid="button-like"
        >
          <ThumbsUp className="h-4 w-4" />
          {script.isLikedByMe ? "Liked" : "Like"} ({script.likes.toLocaleString()})
        </Button>
      </div>

      {/* Description */}
      {script.description && (
        <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground">{script.description}</p>
        </div>
      )}

      {/* Code */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Code2 className="h-5 w-5 text-primary" />
            <h3>Script Code</h3>
          </div>
          <Button size="sm" variant="outline" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        <div className="relative">
          <pre className="overflow-x-auto p-6 bg-card border border-border/50 rounded-xl text-sm font-mono leading-relaxed max-h-[600px]">
            <code className="text-foreground">{script.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

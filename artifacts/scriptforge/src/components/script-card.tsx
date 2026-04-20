import { Link } from "wouter";
import { Copy, Eye, ThumbsUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Script } from "@workspace/api-client-react";

interface ScriptCardProps {
  script: Script;
}

export function ScriptCard({ script }: ScriptCardProps) {
  const { toast } = useToast();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(script.code);
    toast({
      title: "Copied!",
      description: "Script copied to clipboard",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "GUI": "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20",
      "Admin": "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20",
      "Hub": "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20",
      "FPS": "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20",
      "Tycoon": "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20",
    };
    return colors[category] || "bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/20 border-zinc-500/20";
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:border-primary/50 transition-colors group">
      <CardHeader className="p-4 pb-0 flex-none space-y-2">
        <div className="flex justify-between items-start gap-2">
          <Badge variant="outline" className={getCategoryColor(script.category)}>
            {script.category}
          </Badge>
          {script.isVerified && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
          <Link href={`/script/${script.id}`}>{script.title}</Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground font-medium line-clamp-1">
          {script.game}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-1 flex flex-col justify-end">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span className="truncate">by <Link href={`/profile/${script.authorUsername}`} className="hover:text-primary transition-colors">{script.authorUsername}</Link></span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="w-4 h-4" />
            <span>{script.likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>{script.views.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2 mt-auto">
        <Button variant="secondary" className="flex-1" onClick={handleCopy}>
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button asChild className="flex-1">
          <Link href={`/script/${script.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

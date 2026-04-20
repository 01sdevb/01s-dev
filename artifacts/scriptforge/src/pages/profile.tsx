import { useParams, Link } from "wouter";
import { useGetUserProfile, getGetUserProfileQueryKey } from "@workspace/api-client-react";
import { ScriptCard } from "@/components/script-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { User, Calendar, Code2, ThumbsUp, ArrowLeft } from "lucide-react";

export default function Profile() {
  const params = useParams<{ username: string }>();
  const username = params.username || "";

  const { data: profile, isLoading } = useGetUserProfile(username, {
    query: { queryKey: getGetUserProfileQueryKey(username), enabled: !!username },
  });

  if (isLoading) {
    return (
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-32 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-4">
        <h2 className="text-2xl font-bold mb-2">User not found</h2>
        <p className="text-muted-foreground mb-6">This user does not exist.</p>
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
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
      </Button>

      {/* Profile Header */}
      <div className="bg-card border border-border/50 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{profile.username}</h1>
            <div className="flex flex-wrap gap-6 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                <span>{profile.scriptCount} scripts</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{profile.totalLikes.toLocaleString()} total likes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scripts */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Scripts by {profile.username}</h2>

        {profile.scripts.length === 0 ? (
          <div className="py-16 text-center border border-dashed rounded-xl bg-muted/20">
            <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No scripts yet</h3>
            <p className="text-muted-foreground">This user hasn't uploaded any scripts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profile.scripts.map((script) => (
              <ScriptCard key={script.id} script={script} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useParams, Link } from "wouter";
import {
  useGetUserProfile,
  getGetUserProfileQueryKey,
  useGetUserFollowers,
  useGetUserFollowing,
  useGetUserLikedScripts,
  getGetUserFollowersQueryKey,
  getGetUserFollowingQueryKey,
  getGetUserLikedScriptsQueryKey,
} from "@workspace/api-client-react";
import { ScriptCard } from "@/components/script-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Calendar, Code2, ThumbsUp, ArrowLeft, Users, Heart } from "lucide-react";
import { FollowButton } from "@/components/follow-button";
import { UserList } from "@/components/user-list";
import { AdsterraAd } from "@/components/adsterra-ad";
import { useAuth } from "@/contexts/auth-context";

export default function Profile() {
  const params = useParams<{ username: string }>();
  const username = params.username || "";
  const { user: me } = useAuth();

  const { data: profile, isLoading } = useGetUserProfile(username, {
    query: { queryKey: getGetUserProfileQueryKey(username), enabled: !!username },
  });

  const { data: followersData } = useGetUserFollowers(username, {
    query: { queryKey: getGetUserFollowersQueryKey(username), enabled: !!username },
  });

  const { data: followingData } = useGetUserFollowing(username, {
    query: { queryKey: getGetUserFollowingQueryKey(username), enabled: !!username },
  });

  const { data: likedData } = useGetUserLikedScripts(username, {
    query: { queryKey: getGetUserLikedScriptsQueryKey(username), enabled: !!username },
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

  const canFollow = me && !profile.isMe;

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
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold">{profile.username}</h1>
              {canFollow && (
                <FollowButton username={profile.username} isFollowing={profile.isFollowedByMe} size="sm" />
              )}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Se unió el {new Date(profile.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                <span>{profile.scriptCount} scripts</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{profile.totalLikes.toLocaleString()} likes recibidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{profile.followerCount.toLocaleString()} seguidores</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{profile.followingCount.toLocaleString()} siguiendo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline ad slot */}
      <div className="flex justify-center">
        <AdsterraAd format="728x90" className="hidden md:flex" />
        <AdsterraAd format="320x50" className="md:hidden" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="scripts" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="scripts">
            <Code2 className="h-4 w-4 mr-2" />
            Scripts
          </TabsTrigger>
          <TabsTrigger value="liked">
            <Heart className="h-4 w-4 mr-2" />
            Likes
          </TabsTrigger>
          <TabsTrigger value="followers">
            Seguidores
          </TabsTrigger>
          <TabsTrigger value="following">
            Seguidos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scripts" className="space-y-6">
          {profile.scripts.length === 0 ? (
            <div className="py-16 text-center border border-dashed rounded-xl bg-muted/20">
              <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sin scripts todavía</h3>
              <p className="text-muted-foreground">Este usuario no ha subido scripts.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {profile.scripts.map((script) => (
                <ScriptCard key={script.id} script={script} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="liked" className="space-y-6">
          {!likedData || likedData.scripts.length === 0 ? (
            <div className="py-16 text-center border border-dashed rounded-xl bg-muted/20">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sin likes todavía</h3>
              <p className="text-muted-foreground">Aquí aparecerán los scripts que le gusten.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {likedData.scripts.map((s) => (
                <ScriptCard key={s.id} script={s} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="followers">
          <UserList
            users={followersData?.users ?? []}
            emptyMessage="Aún no tiene seguidores"
          />
        </TabsContent>

        <TabsContent value="following">
          <UserList
            users={followingData?.users ?? []}
            emptyMessage="Aún no sigue a nadie"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

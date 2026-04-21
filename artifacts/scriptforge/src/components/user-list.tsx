import { Link } from "wouter";
import type { FollowUserItem } from "@workspace/api-client-react";
import { User } from "lucide-react";
import { FollowButton } from "@/components/follow-button";
import { useAuth } from "@/contexts/auth-context";

interface UserListProps {
  users: FollowUserItem[];
  emptyMessage: string;
}

export function UserList({ users, emptyMessage }: UserListProps) {
  const { user: me } = useAuth();

  if (users.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground border border-dashed rounded-xl bg-muted/20">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {users.map((u) => (
        <div
          key={u.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-card p-3 hover:border-primary/40 transition-colors"
        >
          <Link href={`/profile/${u.username}`} className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold truncate">{u.username}</div>
              <div className="text-xs text-muted-foreground">
                desde {new Date(u.followedAt).toLocaleDateString()}
              </div>
            </div>
          </Link>
          {me && me.username !== u.username && (
            <FollowButton username={u.username} isFollowing={u.isFollowedByMe} size="sm" />
          )}
        </div>
      ))}
    </div>
  );
}

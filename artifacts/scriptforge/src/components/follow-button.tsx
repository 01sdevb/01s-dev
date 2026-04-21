import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  followUser,
  unfollowUser,
  getGetUserProfileQueryKey,
  getGetUserFollowersQueryKey,
  getGetUserFollowingQueryKey,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, Loader2 } from "lucide-react";

interface FollowButtonProps {
  username: string;
  isFollowing: boolean;
  size?: "sm" | "default";
  variant?: "default" | "outline";
}

export function FollowButton({ username, isFollowing, size = "default", variant }: FollowButtonProps) {
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);
  const [following, setFollowing] = useState(isFollowing);

  const handleClick = async () => {
    setPending(true);
    try {
      if (following) {
        await unfollowUser(username);
        setFollowing(false);
      } else {
        await followUser(username);
        setFollowing(true);
      }
      queryClient.invalidateQueries({ queryKey: getGetUserProfileQueryKey(username) });
      queryClient.invalidateQueries({ queryKey: getGetUserFollowersQueryKey(username) });
      queryClient.invalidateQueries({ queryKey: getGetUserFollowingQueryKey(username) });
    } catch (_e) {
      // ignore
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={pending}
      size={size}
      variant={variant ?? (following ? "outline" : "default")}
      className="gap-2"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : following ? (
        <UserCheck className="h-4 w-4" />
      ) : (
        <UserPlus className="h-4 w-4" />
      )}
      {following ? "Siguiendo" : "Seguir"}
    </Button>
  );
}

import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useCheckIsFollowing, useFollowUser, useUnfollowUser } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const { user: currentUser } = useUserContext();
  const { data: followRecord } = useCheckIsFollowing(currentUser.id, user.$id);
  const { mutate: followUserMut, isPending: isFollowing } = useFollowUser();
  const { mutate: unfollowUserMut, isPending: isUnfollowing } = useUnfollowUser();

  const isFollowingUser = !!followRecord;
  const isOwnProfile = currentUser.id === user.$id;

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFollowingUser && followRecord) {
      unfollowUserMut(followRecord.$id);
    } else {
      followUserMut({ followerId: currentUser.id, followingId: user.$id });
    }
  };

  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      {!isOwnProfile && (
        <Button
          type="button"
          size="sm"
          className={`px-5 ${isFollowingUser ? "shad-button_dark_4" : "shad-button_primary"}`}
          onClick={handleFollow}
          disabled={isFollowing || isUnfollowing}
        >
          {isFollowing || isUnfollowing ? (
            <Loader />
          ) : isFollowingUser ? (
            "Following"
          ) : (
            "Follow"
          )}
        </Button>
      )}
    </Link>
  );
};

export default UserCard;

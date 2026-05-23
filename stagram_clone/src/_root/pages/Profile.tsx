import { Link, useParams, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserById,
  useGetCurrentUser,
  useGetFollowers,
  useGetFollowing,
  useCheckIsFollowing,
  useFollowUser,
  useUnfollowUser,
} from "@/lib/react-query/queriesAndMutations";
import { GridPostList, Loader } from "@/components/shared";

interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const LikedPostsSection = () => {
  const { data: currentUser } = useGetCurrentUser();
  if (!currentUser) return <Loader />;
  if (currentUser.liked.length === 0) return <p className="text-light-4">No liked posts</p>;
  return <GridPostList posts={currentUser.liked} showStats={false} />;
};

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser, isLoading, isError } = useGetUserById(id || "");
  const { data: followersData } = useGetFollowers(id || "");
  const { data: followingData } = useGetFollowing(id || "");
  const { data: followRecord } = useCheckIsFollowing(user.id, id || "");

  const { mutate: followUserMut, isPending: isFollowing } = useFollowUser();
  const { mutate: unfollowUserMut, isPending: isUnfollowing } = useUnfollowUser();

  const showLikedPosts = pathname.includes("/liked-posts");
  const isOwnProfile = user.id === currentUser?.$id;
  const isFollowingUser = !!followRecord;

  const handleFollow = () => {
    if (isFollowingUser && followRecord) {
      unfollowUserMut(followRecord.$id);
    } else {
      followUserMut({ followerId: user.id, followingId: id || "" });
    }
  };

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  if (isError || !currentUser)
    return (
      <div className="flex-center w-full h-full flex-col gap-4">
        <p className="text-light-4">User not found</p>
        <Link to="/" className="text-primary-500 small-medium">
          Go back home
        </Link>
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts?.length || 0} label="Posts" />
              <StatBlock value={followersData?.total || 0} label="Followers" />
              <StatBlock value={followingData?.total || 0} label="Following" />
            </div>

            {currentUser.bio && (
              <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                {currentUser.bio}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-4">
            {isOwnProfile && (
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg"
              >
                <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                <p className="flex whitespace-nowrap small-medium">Edit Profile</p>
              </Link>
            )}
            {!isOwnProfile && (
              <Button
                type="button"
                className={`px-8 ${isFollowingUser ? "shad-button_dark_4" : "shad-button_primary"}`}
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
          </div>
        </div>
      </div>

      {isOwnProfile && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${!showLikedPosts && "!bg-dark-3"}`}
          >
            <img src="/assets/icons/posts.svg" alt="posts" width={20} height={20} />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${showLikedPosts && "!bg-dark-3"}`}
          >
            <img src="/assets/icons/like.svg" alt="like" width={20} height={20} />
            Liked Posts
          </Link>
        </div>
      )}

      {showLikedPosts ? (
        <LikedPostsSection />
      ) : (
        <GridPostList posts={currentUser.posts || []} showUser={false} />
      )}
    </div>
  );
};

export default Profile;

import { useUserContext } from "@/context/AuthContext";
import { useGetPostById, useGetUserPosts } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

import { GridPostList, Loader, PostStats } from "@/components/shared";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  const { data: userPosts } = useGetUserPosts(post?.creator?.$id);

  const relatedPosts = userPosts?.documents.filter(
    (item: { $id: string }) => item.$id !== id
  );

  if (isPending)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  if (!post)
    return (
      <div className="flex-center w-full h-full">
        <p className="text-light-4">Post not found</p>
      </div>
    );

  return (
    <div className="post_details-container">
      <div className="post_details-card">
        <img
          src={post.imageUrl}
          alt="post"
          className="post_details-img"
        />

        <div className="post_details-info">
          <div className="flex-between w-full">
            <Link
              to={`/profile/${post.creator?.$id}`}
              className="flex items-center gap-3"
            >
              <img
                src={
                  post.creator?.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
              />

              <div className="flex flex-col">
                <p className="base-medium lg:body-bold text-light-1">
                  {post.creator?.name}
                </p>
                <div className="flex-center gap-2 text-light-3">
                  <p className="subtle-semibold lg:small-regular">
                    {multiFormatDateString(post.$createdAt)}
                  </p>
                  {post.location && (
                    <>
                      <span>-</span>
                      <p className="subtle-semibold lg:small-regular">
                        {post.location}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Link>

            <Link
              to={`/update-post/${post.$id}`}
              className={`${user.id !== post.creator?.$id && "hidden"}`}
            >
              <img
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </Link>
          </div>

          <div className="flex flex-col flex-1 w-full small-medium lg:base-regular py-5">
            <p>{post.caption}</p>
            <ul className="flex gap-1 mt-2">
              {post.tag?.map((tag: string, index: string) => (
                <li key={`${tag}${index}`} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>

          <PostStats post={post} userId={user.id} />
        </div>
      </div>

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>

        {relatedPosts && relatedPosts.length > 0 ? (
          <GridPostList posts={relatedPosts} />
        ) : (
          <p className="text-light-4">No related posts</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;

import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import timeAgo from "@/lib/utils";
import { Link, useParams } from "react-router-dom";


const PostDetails = () => {
   const { id } = useParams<{ id: string }>();
  const {data: post, isPending } = useGetPostById(id || '');
  
  return (
    <div className="post_details-container">
      {isPending ? 
        <Loader />
       : (
        <div className="post_details-card">
          <img 
          src={post?.imageUrl}
          alt="post"
          className="post_details-img"

          />
         
          <div className="post_details-info">
            <div className="flex-between w-full">
              
            </div>
            <Link to={`/profile/${post?.creator.$id}`}>
              <img
                src={
                  post?.creator?.imageUrl ||
                  "/asstes/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="roundedull w-12 lg: h-12"
              />
            </Link>

            <div className="flex flex-col">
              <p className="base-medium lg:body-bold text-light-1">
                {post?.creator.name}
              </p>
              <div className="flex-center gap text-light-3">
                <p className="subtle-semibold lg:small-regular">
                  {timeAgo(post?.createdAt)}
                </p>
                -<p className="subtlebold lg:small-regular">{post?.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails
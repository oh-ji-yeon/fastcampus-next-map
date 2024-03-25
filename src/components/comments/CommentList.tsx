import { CommentApiResponse } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface CommentListProps {
  comments?: CommentApiResponse;
}

export default function CommentList({ comments }: CommentListProps) {
  const { status, data: session } = useSession();

  const handleDeleteComment = async (id: number) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");

    if (confirm) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);

        if (result.status === 200) {
          toast.success("댓글 삭제 완료!");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="my-10">
      {comments?.data && comments?.data?.length > 0 ? (
        comments?.data?.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center space-x-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8"
          >
            <div>
              <img
                src={comment?.user?.image || "/images/zzang1.jpg"}
                width={40}
                height={40}
                className="rounded-full bg-gray-10 h-10 w-10"
                alt="profile image"
              />
            </div>
            <div className="flex flex-col space-y-1 flex-1">
              <div>{comment?.user?.email}</div>
              <div className="text-xs">
                {new Date(comment?.createdAt)?.toLocaleDateString()}
              </div>
              <div className="text-black mt-1 text-base">{comment?.body}</div>
            </div>
            <div>
              {comment.userId === session?.user.id && (
                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="underline text-gray-500 hover:text-gray-400"
                >
                  삭제
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 border border-gray-200 rounded-md text-sm text-gray-400">
          댓글이 없습니다.
        </div>
      )}
    </div>
  );
}
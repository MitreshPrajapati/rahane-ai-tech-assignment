"use client";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import ENDPOINTS from "@/utils/Endpoints";
import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { MdClose, MdDeleteForever, MdMessage } from "react-icons/md";

export default function ContentPage() {
  const { user } = useAuth();
  const { request } = useApi();
  const [posts, setPosts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentId, setCommentId] = useState("");
  const [editPost, setEditPost] = useState(false);

  //   fetch all posts
  const getPosts = async () => {
    const res = await request({
      endpoint: ENDPOINTS.POSTS,
      method: "GET",
    });
    // console.log(res);
    setPosts(res.data);
  };

  //   Create and Edit post
  const handlePost = async (e) => {
    e.preventDefault();
    // debugger

    if (editPost) {
      const res = await request({
        endpoint: `${ENDPOINTS.POSTS}/${formData.id}`,
        method: "PUT",
        body: { title: formData.title, description: formData.description },
      });
      setEditPost(false);
    } else {
      const res = await request({
        endpoint: ENDPOINTS.POST_CREATE,
        body: formData,
        method: "POST",
      });
    }

    setFormData({
      title: "",
      description: "",
    });
    // console.log(res)
    setIsFormOpen(false);
    getPosts();
  };

  const openComments = async (id) => {
    setCommentId(id);
  };

  //   edit post: open form with pre fill selected post data
  const handleEditPost = async (post) => {
    setEditPost(true);
    setIsFormOpen(true);
    setFormData({
      id: post._id,
      title: post.title,
      description: post.title,
    });
  };

  // delete post req
  const handleDeletePost = async (id) => {
    const res = await request({
      method: "DELETE",
      endpoint: `${ENDPOINTS.POSTS}/${id}`,
    });
    getPosts();
  };

  // get comments for a post
  const fetchCommentsForPost = async (postId) => {
    const res = await request({
      endpoint: `/comment/${postId}`,
    });
    // console.log("commnets:", res.data);
    setComments(res.data);
  };

  // create comment
  const sendComment = async (postId) => {
    const res = await request({
      endpoint: `${ENDPOINTS.COMMENT}/${postId}`,
      method: "POST",
      body: { text: commentText },
    });

    setCommentText("");
    fetchCommentsForPost(postId);
  };

  // delete comment
  const deleteComment = async (id) => {
    // console.log(id);
    const res = await request({
      endpoint: `${ENDPOINTS.COMMENT}/${id}`,
      method: "DELETE",
    });

    fetchCommentsForPost(commentId);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if(commentId){
      fetchCommentsForPost(commentId);
    }
  }, [commentId]);

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl inline-flex">Content</h2>
        {(user?.roles.includes("admin") || user?.roles.includes("editor")) && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="py-2 px-4 rounded bg-blue-500 text-white "
          >
            Create Post
          </button>
        )}
      </div>
      {isFormOpen && (
        <div className="absolute flex top-0 left-0 z-50 bg-black/50 w-full h-full">
          <form
            onSubmit={handlePost}
            className="max-w-lg w-1/2 flex flex-col mx-auto my-auto bg-white rounded p-4 gap-y-4"
          >
            <button onClick={() => setIsFormOpen(false)}>
              <MdClose
                size={24}
                className="bg-red-500 rounded-full place-self-end text-white "
              />{" "}
            </button>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
              className="border-gray-400 border-1 outline-0  p-2 rounded "
            />
            <textarea
              name=""
              id=""
              rows="7"
              placeholder="description"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
              className="border-gray-400 border-1 outline-0  p-2 rounded "
            ></textarea>

            <button
              type="submit"
              className="bg-blue-500 py-2 px-4 rounded text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {posts && (
        <div className="flex flex-col h-[calc(100%-150px)] gap-y-4 overflow-y-auto">
          {posts?.map((post) => {
            return (
              <div
                key={post?._id}
                className="border-none bg-sky-100 p-2 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold text-black ">
                  {post?.title}
                </h3>
                <p className="text-base">{post?.description}</p>

                <div className=" gap-y-2 mt-2">
                  <p className="text-xs font-semibold text-gray-500">
                    <em>Author:</em> {post?.author?.email}
                  </p>
                  <p className="text-xs font-semibold text-gray-500">
                    <em>Published at:</em>{" "}
                    {Date(post?.createdAT).toLocaleString()}
                  </p>
                </div>

                {/* Action Button Wrapper */}
                <div className="flex items-center gap-x-2 my-2">
                  <MdMessage
                    size={24}
                    onClick={() => openComments(post?._id)}
                    className="text-blue-500 rounded-full shadow-md p-1 h-8 w-8"
                  />
                  {user?.roles.length >= 2 && (
                    <div className="inline-flex gap-x-2 my-4">
                      {user?.roles.includes("editor", "admin") && (
                        <RiEdit2Fill
                          size={24}
                          onClick={() => handleEditPost(post)}
                          className="text-blue-600 bg-white rounded-full w-8 h-8 p-1 shadow-md "
                        />
                      )}
                      {user?.roles.includes("admin") && (
                        <MdDeleteForever
                          size={24}
                          onClick={() => handleDeletePost(post._id)}
                          className="text-red-600 bg-white rounded-full w-8 h-8 p-1 shadow-md "
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Comment Box */}
                {commentId && commentId === post._id.toString() && (
                  <div className="w-full ">
                    <input
                      type="text"
                      placeholder="Comment here..."
                      value={commentText}
                      onChange={(e) => {
                        setCommentText(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (commentText) {
                            sendComment(post._id);
                          }
                        }
                      }}
                      className="w-full p-2 rounded border-gray-500 bg-white border outline-none mb-2 "
                    />

                    {/* ========Comments List========== */}
                    {comments && (
                      <ul className="space-y-2 w-full max-h-64 overflow-hidden overflow-y-scroll">
                        {comments?.map((comnt, idx) => {
                          return (
                            <li
                              key={comnt._id}
                              className="border-none p-2 shadow bg-white "
                            >
                              {(user.roles.includes("admin") ||
                                user.roles.includes("editor")) && (
                                <div>
                                  <MdClose
                                    size={24}
                                    onClick={() => deleteComment(comnt._id)}
                                    className="bg-red-500 p-1 h-6 w-6 text-white place-self-end"
                                  />
                                </div>
                              )}
                              <small className="text-gray-700">
                                User: {comnt.author.email}
                              </small>
                              <small className="text-base text-black">
                                {comnt.text}
                              </small>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}

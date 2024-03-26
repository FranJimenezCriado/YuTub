const { VITE_API_URL } = import.meta.env;

export const selectAllVideosService = async (searchParams) => {
  const res = await fetch(`${VITE_API_URL}/videos?${searchParams}`);

  const body = await res.json();

  if (body.status === 'error') {
    throw new Error(body.message);
  }

  return body.data;
};

export const selectVideoByIdService = async (videoId) => {
  const res = await fetch(`${VITE_API_URL}/videos/${videoId}`);

  const body = await res.json();

  if (body.status === 'error') {
    throw new Error(body.message);
  }

  return body.data.entry;
};

export const insertVideoService = async ({
  title,
  category,
  description,
  file,
  authToken,
}) => {
  const formData = new FormData();

  formData.append('title', title);
  formData.append('category', category);
  formData.append('description', description);
  formData.append('file', file);

  const res = await fetch(`${VITE_API_URL}/videos`, {
    method: 'post',
    headers: {
      Authorization: authToken,
    },
    body: formData,
  });

  const body = await res.json();

  if (body.status === 'error') {
    throw new Error(body.message);
  }

  return body.message;
};

export const insertCommentService = async (comment, videoId, authToken) => {
  const formData = new FormData();

  formData.append('comment', comment);

  const res = await fetch(`${VITE_API_URL}/videos/${videoId}/comment`, {
    method: 'post',
    headers: {
      Authorization: authToken,
    },
    body: formData,
  });

  const body = await res.json();

  if (body.status === 'error') {
    throw new Error(body.message);
  }

  return {
    message: body.message,
    newComment: body.data.comment,
  };
};
// delete comment: not yet
// export const deleteCommentService = async (videoId, commentId, authToken) => {
//   const res = await fetch(
//     `${VITE_API_URL}/videos/${videoId}/comment/${commentId}`,
//     {
//       method: 'delete',
//       headers: {
//         Authorization: authToken,
//       },
//     }
//   );

//   const body = await res.json();

//   if (body.status === 'error') {
//     throw new Error(body.message);
//   }
// };

export const insertVideoLikeService = async (like, videoId, authToken) => {
  const res = await fetch(`${VITE_API_URL}/videos/${videoId}/votes`, {
    method: 'post',
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      like: like,
    }),
  });

  const body = await res.json();

  if (body.status === 'error') {
    throw new Error(body.message);
  }

  return body.data.video.votes;
};

export const insertVideoDisLikeService = async (
  dislike,
  videoId,
  authToken
) => {
  const res = await fetch(`${VITE_API_URL}/videos/${videoId}/votes`, {
    method: 'post',
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dislike: dislike,
    }),
  });

  const body = await res.json();

  if (body.status === 'error') {
    throw new Error(body.message);
  }

  return body.data.video.votes;
};

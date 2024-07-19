import { postReferalFriend } from "@/lib/https";

// Referal

// POST
export const postReferalFriendHandler = async (
  postReferalFriend: postReferalFriend
) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/auth/company-registration`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postReferalFriend),
    }
  );
  const resData = await response.json();
  return resData;
};

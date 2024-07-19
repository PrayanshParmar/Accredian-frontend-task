import { postReferalFriend } from "@/lib/https";
import { ReferError } from "@/lib/res_types";

// Referal

// POST
export const ReferFriendHandler = async (
  postReferalFriend: postReferalFriend
) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/refer/refer-friend`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(postReferalFriend),
    }
  );
  if (!response.ok) {
    const errorData: ReferError = await response.json();
    throw new Error(errorData.error);
  }

  const resData = await response.json();
  return resData;
};

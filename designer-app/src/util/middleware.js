import { authOptions } from "@pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

// @ts-ignore
/** @type {ApiHandler} */
export const authMiddleware = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.headers.userId = session.user.id;
};

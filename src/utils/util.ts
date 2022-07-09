import { GithubUser } from "../../types/Common";
/**
 * 获取Github用户基础信息
 * @param username
 * @returns Promise<GithubUser>
 */
export const getGithubUser = async (username: string): Promise<GithubUser> => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  return (await res.json()) as GithubUser;
};

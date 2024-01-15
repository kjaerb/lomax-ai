/**
 * Given a seed, generate a dicebear avatar
 * @param seed string to generate the avatar
 * @returns string of the avatar url
 */
export function getDicebear(seed: string) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;
}

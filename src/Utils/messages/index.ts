export const excludeUser = ({ users, userAddress }) =>
  users.filter((user) => user.address !== userAddress);

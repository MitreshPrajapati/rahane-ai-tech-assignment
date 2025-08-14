export const roleAccess = {
  admin: ["/dashboard", "/dashboard/content", "/dashboard/users", "/dashboard/logs"],
  editor: ["/dashboard", "/dashboard/content"],
  viewer: ["/dashboard", "/dashboard/content"],
};

export const canAccess = (roles, pathname) => {
  return roles?.some((role) => roleAccess[role]?.includes(pathname));
};

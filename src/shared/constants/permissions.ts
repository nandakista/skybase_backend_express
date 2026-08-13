export const Permission = {
  CMS_USERS_READ: "cms.users.read",
  CMS_USERS_CREATE: "cms.users.create",
  CMS_USERS_UPDATE: "cms.users.update",
  CMS_USERS_DELETE: "cms.users.delete",

  CMS_ROLES_READ: "cms.roles.read",
  CMS_ROLES_CREATE: "cms.roles.create",
  CMS_ROLES_UPDATE: "cms.roles.update",
  CMS_ROLES_DELETE: "cms.roles.delete",

  // Mobile platform permissions
  MOBILE_USERS_READ: "mobile.users.read",
  MOBILE_USERS_UPDATE: "mobile.users.update",
  MOBILE_USERS_CREATE: "mobile.users.create",
  MOBILE_USERS_DELETE: "mobile.users.delete",
} as const;

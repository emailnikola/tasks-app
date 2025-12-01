export const USER_PATTERNS = {
  CREATE: { cmd: 'create_user' },
  FIND_ALL: { cmd: 'find_all_users' },
  FIND_ONE: { cmd: 'find_one_user' },
  FIND_BY_EMAIL: { cmd: 'find_user_by_email' },
  UPDATE: { cmd: 'update_user' },
  DELETE: { cmd: 'delete_user' }
}

export const TASK_PATTERNS = {
  CREATE: { cmd: 'create_task' },
  FIND_ALL: { cmd: 'find_all_tasks' },
  FIND_ONE: { cmd: 'find_one_task' },
  UPDATE: { cmd: 'update_task' },
  DELETE: { cmd: 'delete_task' }
}

export const AUTH_PATTERNS = {
  REGISTER: { cmd: 'register' },
  LOGIN: { cmd: 'login' },
  VALIDATE_TOKEN: { cmd: 'validate_token' }
}

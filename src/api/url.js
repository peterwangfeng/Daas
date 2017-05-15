const HOST = '/user-profile/v1/manage/';
const URL = {
  LOGIN_URL: HOST + 'subjects/login',
  LOGOUT_URL: HOST + 'subjects/{subject_id}/logout',
  APPLY_USER_URL: HOST + 'subjects/',
  MODIFY_PASSWORD_URL: HOST + 'subjects/{subject_id}/password',
  GET_SUBJECT_INFO_URL: HOST + 'subjects/{subject_id}',
  GET_PRODUCTS_URL: HOST + 'subjects/{subject_id}/products',
  GET_NOTIFICATIONS_URL: HOST + 'subjects/{subject_id}/notifications',
  GET_PRODUCT_CONSUME_INFO_URL: HOST + 'subjects/{subject_id}/consume/info',
  GET_PRODUCT_CONFIG_URL: HOST + 'subjects/{subject_id}/products/{product_id}/config/',
  GET_CONSUME_INFO_URL: HOST + 'subjects/{subject_id}/consume',
  GET_SUBJECT_TASKS_URL: HOST + 'subjects/{subject_id}/tasks',
  GET_DEPOSITS_URL: HOST + 'subjects/{subject_id}/deposits',
  POST_INVOICES_URL: HOST + 'subjects/{subject_id}/invoices',
  UPDATE_NOTIFICATIONS_URL: HOST + 'subjects/{subject_id}/notifications/'
};

export default URL;

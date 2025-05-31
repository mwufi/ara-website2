import { init, id } from '@instantdb/admin';

const db = init({
    appId: process.env.INSTANT_APP_ID!,
    adminToken: process.env.INSTANT_APP_ADMIN_TOKEN!,
});

export default db;
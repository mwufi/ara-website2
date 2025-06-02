import { init, id } from '@instantdb/react';

const db = init({
    appId: process.env.INSTANT_APP_ID!,
});

export { db, id };
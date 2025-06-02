import { init, id } from '@instantdb/react';

const db = init({
    appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID!,
});

export { db, id };
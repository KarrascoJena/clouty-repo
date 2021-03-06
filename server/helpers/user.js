import { sendEmail, stripeSecret, user, wrapAsync } from '../helpers';
import { welcomeEmailContent } from '../emailTemplates';
const { json } = require('micro');
const { parse } = require('url');
const stripe = require('stripe')(stripeSecret);

export const userRetrieveApi = wrapAsync(async function(req, db) {
  const { query } = parse(req.url, true);
  const { id } = query;
  return await db.collection(user).findOne({ _id: id });
});

export const updateUser = async (firebaseUser, db) => {
  const newUser = await db.collection(user).findOneAndUpdate(
    { _id: firebaseUser.firebase.uid },
    {
      $set: { ...firebaseUser, updatedAt: Math.floor(new Date() / 1000) },
    },
    { upsert: true, returnOriginal: false },
  );
  return newUser.value;
};

export const usersApi = wrapAsync(async function(req, db) {
  return await db
    .collection(user)
    .find({})
    .toArray();
});

export const userApi = wrapAsync(async function(req, db) {
  let { data: userData } = await json(req);
  const queryUser = await db
    .collection(user)
    .find({ _id: userData.firebase.uid })
    .toArray();

  if (userData.new) {
    userData.admin = false;
    const stripeUser = await stripe.customers.create({
      email: userData.firebase.email,
    });
    await sendEmail([userData.firebase.email], welcomeEmailContent);
    userData.stripe = {
      user: { ...stripeUser, credit: 200 },
    };
    userData.new = false;
  }
  userData = { ...queryUser[0], ...userData };
  return await updateUser(userData, db);
});

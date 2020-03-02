const { json } = require('micro');
const { parse } = require('url');
const cors = require('micro-cors')();
const connect = require('./db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_DEV);

const dev = process.env.NODE_ENV === 'development';
const user = dev ? 'userdev' : 'user';

const wrapAsync = (handler) => async (req, res) => {
  const db = await connect();
  return handler(req, db)
    .then((result) => {
      res.setHeader(
        'cache-control',
        's-maxage=1 maxage=0, stale-while-revalidate',
      );
      return res.json(result);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};
const userRetrieveApi = wrapAsync(async function(req, db) {
  const { query } = parse(req.url, true);
  const { id } = query;
  return await db.collection(user).findOne({ _id: id });
});
const updateUser = async (firebaseUser, db) => {
  const newUser = await db.collection(user).findOneAndUpdate(
    { _id: firebaseUser.firebase.uid },
    {
      $set: { ...firebaseUser, updatedAt: Math.floor(new Date() / 1000) },
    },
    { upsert: true, returnOriginal: false },
  );
  return newUser.value;
};

const userApi = wrapAsync(async function(req, db) {
  let userData = (await json(req)).data;
  const queryUser = await db
    .collection(user)
    .find({ _id: userData.firebase.uid })
    .toArray();
  if (queryUser.length === 1) {
    userData = { ...queryUser[0], ...userData };
  }
  if (!userData.stripe) {
    const stripeUser = await stripe.customers.create({
      email: userData.firebase.email,
    });
    userData.stripe = {
      user: stripeUser,
    };
  }
  return updateUser(userData, db);
});

module.exports = {
  userApi: cors(userApi),
  userRetrieveApi: cors(userRetrieveApi),
  updateUser,
};

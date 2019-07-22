const secretTokenKey = process.env.SECRET || 'QuickBrownFoxAndQickDevCollab';
const URI =
  process.env.MONGODB_URI ||
  'mongodb://joelg4:privateblog1@ds243607.mlab.com:43607/private-blog';

module.exports = {
  URI,
  secretTokenKey
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

const findByEmail = (email) => UserModel.findOne({ email });

const buildUserResponse = (user) => {
  const plain = user.toObject();
  delete plain.password;

  const token = jwt.sign(plain, process.env.SECRET);

  return { status: 200, body: { user: plain, token }};
};

const loginUser = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) return { status: 400, body: { message: 'User not found' } };

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return { status: 400, body: { message: 'Invalid password' } };

  return buildUserResponse(user);
};

const validate = (email, password, name) => {
  const validEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
  const validPassword = /.{3,}$/.test(password);
  const validName = /.+$/.test(name);

  return validEmail && validPassword && validName;
};

const registerUser = async ({ email, password, name }) => {
  if (!validate(email, password, name)) return { status: 400, body: { message: 'Invalid user data' } };

  const exist = await findByEmail(email);
  if (exist) return { status: 400, body: { message: 'User already exist' } };

  const salt = await bcrypt.genSalt(10);
  const crypted = await bcrypt.hash(password, salt);

  const user = new UserModel({ name, email, password: crypted });
  user.save();

  return buildUserResponse(user);
};

module.exports = {
  findByEmail,
  loginUser,
  registerUser
};

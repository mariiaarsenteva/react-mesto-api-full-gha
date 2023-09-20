const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { SECRET_KEY } = process.env;
const SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'dev';
// const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';
// const PORT = process.env.PORT || 3000;

const getUsers = (req, res, next) => {
  UserModel.find({})
    .then((users) => res.status(HTTP_STATUS_OK).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  UserModel.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Некорректный _id: ${req.params.userId}`));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь по данному _id: ${req.params.userId} не найден.`));
      } else {
        next(err);
      }
    });
};

const addUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(HTTP_STATUS_CREATED).send({
        name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user.id,
      }))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else if (err.code === 11000) {
          next(new ConflictError(`Пользователь с email: ${email} уже зарегистрирован`));
        } else {
          next(err);
        }
      }));
};

const editUserData = (req, res, next) => {
  const { name, about } = req.body;
  if (req.user._id) {
    UserModel.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
      .orFail()
      .then((user) => {
        res.status(HTTP_STATUS_OK).send(user);
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
          next(new NotFoundError(`Пользователь по данному _id: ${req.params.userId} не найден.`));
        } else {
          next(err);
        }
      });
  }
};

const editUserAvatar = (req, res, next) => {
  if (req.user._id) {
    UserModel.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: 'true', runValidators: true })
      .orFail()
      .then((user) => res.status(HTTP_STATUS_OK).send(user))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
          next(new NotFoundError(`Пользователь по данному _id: ${req.params.userId} не найден.`));
        } else {
          next(err);
        }
      });
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  UserModel.findById(req.user._id)
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch(next);
};

module.exports = {
  getUsers, getUserById, addUser, editUserData, editUserAvatar, login, getUser,
};

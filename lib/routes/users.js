const httpStatusCodes = require('../http-status-codes');
const data = require('../data');
const crypt = require('../crypt');
const utils = require('../router/utils');

const transformUserResponse = (user) => {
  delete user.password;

  return user;
};

const handlers = {
  get: async ({ query }) => {
    const { phone = '' } = query;

    if (!phone || !data.exists(`users/${phone}`)) {
      return {
        status: httpStatusCodes.NOT_FOUND,
      };
    }

    const user = await data.readJSON(`users/${phone}`);
    return {
      status: httpStatusCodes.OK,
      data: {
        user: transformUserResponse(user),
      },
    };
  },

  post: async ({ payload }) => {
    try {
      const errors = {};
      const {
        firstName = '',
        lastName = '',
        phone = '',
        password = '',
        tosAgreement,
      } = payload;

      if (!firstName.trim()) {
        errors.firstName = 'First name is required';
      }

      if (!lastName.trim()) {
        errors.lastname = 'Last name is required';
      }

      if (!phone.trim() || phone.trim().length < 10) {
        errors.phone = 'Invalid phone';
      }

      if (!password.trim()) {
        errors.password = 'Password is required';
      }

      if (!tosAgreement || typeof tosAgreement !== 'boolean') {
        errors.tosAgreement = 'Terms must be accepted';
      }

      if (Object.keys(errors).length) {
        return {
          status: httpStatusCodes.UNPROCESSABLE_ENTITY,
          data: { errors },
        };
      }

      if (data.exists(`users/${phone}`)) {
        return {
          status: httpStatusCodes.UNPROCESSABLE_ENTITY,
          data: {
            error: 'User already exists',
          },
        };
      }

      const user = {
        firstName,
        lastName,
        phone,
        password: crypt.hashPassword(password),
        tosAgreement,
      };
      await data.writeJSON(`users/${phone}`, user);

      return {
        status: httpStatusCodes.CREATED,
        data: {
          user: transformUserResponse(user),
        },
      };
    } catch (e) {
      return {
        status: httpStatusCodes.INTERNAL_SERVER_ERROR,
        data: { error: 'Error creating user' },
      };
    }
  },

  put: async ({ query, payload }) => {
    const { phone = '' } = query;
    const { firstName = '', lastName = '' } = payload;

    if (!phone || !data.exists(`users/${phone}`)) {
      return {
        status: httpStatusCodes.NOT_FOUND,
      };
    }

    try {
      const user = await data.readJSON(`users/${phone}`);

      if (
        firstName &&
        firstName.trim() &&
        firstName.trim() !== user.firstName
      ) {
        user.firstName = firstName;
      }

      if (lastName && lastName.trim() && lastName.trim() !== user.lastName) {
        user.lastName = lastName;
      }

      await data.updateJSON(`users/${phone}`, user);

      return {
        status: httpStatusCodes.OK,
        data: {
          user: transformUserResponse(user),
        },
      };
    } catch (e) {
      return {
        status: httpStatusCodes.INTERNAL_SERVER_ERROR,
        data: { error: 'Error updating user' },
      };
    }
  },

  delete: async ({ query }) => {
    const { phone = '' } = query;

    if (!phone || !data.exists(`users/${phone}`)) {
      return {
        status: httpStatusCodes.NOT_FOUND,
      };
    }

    try {
      await data.deleteJSON(`users/${phone}`);

      return {
        status: httpStatusCodes.OK,
      };
    } catch (e) {
      return {
        status: httpStatusCodes.INTERNAL_SERVER_ERROR,
        data: { error: 'Error updating user' },
      };
    }
  },
};

const router = utils.createRequestHandler(handlers);

module.exports = router;

const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    user: { type: 'string' },
    products: { type: 'array', items: { type: 'string' } },
    totalPrice: { type: 'number' },
    status: {
      type: 'string',
      enum: ['pending', 'completed', 'cancelled'],
    },
  },
  required: ['user', 'products', 'totalPrice', 'status'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);
module.exports = validate;

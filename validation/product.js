const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    price: { type: 'number' },
    stock: { type: 'number' },
  },
  required: ['name', 'price', 'stock'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);
module.exports = validate;

const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['name', 'email'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);
module.exports = validate;

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['name', 'email'],
  additionalProperties: false,
};

module.exports = schema;

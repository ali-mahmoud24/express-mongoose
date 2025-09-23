const schema = {
  type: 'object',
  properties: {
    user: { type: 'string' },
    products: { type: 'array', items: { type: 'string' } },
    status: {
      type: 'string',
      enum: ['pending', 'completed', 'cancelled'],
    },
  },
  required: ['user', 'products'],
  additionalProperties: false,
};

module.exports = schema;

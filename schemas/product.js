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

module.exports = schema;

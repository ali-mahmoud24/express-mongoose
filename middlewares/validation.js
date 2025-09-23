const Ajv = require('ajv');

const ajv = new Ajv({ coerceTypes: true });

function validate(schema) {
  const validateFn = ajv.compile(schema);

  return (req, res, next) => {
    const valid = validateFn(req.body);
    if (!valid) {
      return res.status(400).json({
        status: 'error',
        errors: validateFn.errors.map((err) => ({
          field: err.instancePath || err.schemaPath,
          message: err.message,
        })),
      });
    }
    next();
  };
}

module.exports = validate;

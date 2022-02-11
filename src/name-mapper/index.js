const NAME_MAPPER = require('./name.json')

const nameMapper = (address) => {
  if (!address || !NAME_MAPPER[address]) return;
  return NAME_MAPPER[address];
}

module.exports = { nameMapper}

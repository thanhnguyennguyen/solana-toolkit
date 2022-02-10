import NAME_MAPPER from './name.js'

export function nameMapper(address) {
  if (!address || !NAME_MAPPER[address]) return;
  return NAME_MAPPER[address];
}

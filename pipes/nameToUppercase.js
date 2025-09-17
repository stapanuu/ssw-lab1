function nameToUppercasePipe(items) {
  if (!Array.isArray(items)) return items;

  return items.map(item => {
    if (item && typeof item === 'object' && typeof item.name === 'string') {
      return { ...item, name: item.name.toUpperCase() };
    }
    return item;
  });
}

module.exports = { nameToUppercasePipe };

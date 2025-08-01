const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isValidShortcode = (code) => /^[a-zA-Z0-9]{4,20}$/.test(code);

module.exports = { isValidUrl, isValidShortcode };

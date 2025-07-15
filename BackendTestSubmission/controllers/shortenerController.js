const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const store = require('../data/store');
const { isValidUrl, isValidShortcode } = require('../utils/validator');
    
const baseURL = "http://localhost:8080"; 

const createShortURL = (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "Invalid or missing URL" });
  }

  let code = shortcode || uuidv4().slice(0, 6);
  if (!isValidShortcode(code)) {
    return res.status(400).json({ error: "Invalid shortcode format" });
  }

  if (store[code]) {
    return res.status(409).json({ error: "Shortcode already exists" });
  }

  const validMinutes = typeof validity === 'number' && validity > 0 ? validity : 30;
  const expiry = dayjs().add(validMinutes, 'minute').toISOString();

  store[code] = {
    url,
    createdAt: new Date().toISOString(),
    expiry,
    clicks: 0,
    logs: [],
  };

  return res.status(201).json({
    shortLink: `${baseURL}/${code}`,
    expiry,
  });
};


const redirectShortURL = (req, res) => {
  const { shortcode } = req.params;
  const entry = store[shortcode];

  if (!entry) {
    req.logger?.('error', `Shortcode not found: ${shortcode}`);
    return res.status(404).json({ error: 'Shortcode does not exist' });
  }

  const now = dayjs();
  if (dayjs(entry.expiry).isBefore(now)) {
    req.logger?.('warn', `Expired shortcode accessed: ${shortcode}`);
    return res.status(410).json({ error: 'Short link has expired' });
  }


  entry.clicks++;
  entry.logs.push({
    timestamp: new Date().toISOString(),
    source: req.get('referrer') || 'direct',
    location: req.ip,
  });

  return res.redirect(entry.url);
};

const getShortURLStats = (req, res) => {
  const { shortcode } = req.params;
  const entry = store[shortcode];

  if (!entry) {
    req.logger?.('error', `Stats request failed: ${shortcode} not found`);
    return res.status(404).json({ error: 'Shortcode does not exist' });
  }

  req.logger?.('info', `Stats requested for: ${shortcode}`);

  return res.status(200).json({
    url: entry.url,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    clicks: entry.clicks,
    logs: entry.logs,
  });
};

module.exports = {
  createShortURL,
  redirectShortURL,
  getShortURLStats,
};

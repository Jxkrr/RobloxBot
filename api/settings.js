let settings = {
  proxyEnabled: false,
  delayMs: 3000,
  useRandomUsernames: true
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    settings = { ...settings, ...req.body };
    return res.status(200).json({ message: 'Settings updated', settings });
  }

  res.status(200).json(settings);
}

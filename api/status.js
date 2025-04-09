export default function handler(req, res) {
  res.status(200).json({ status: 'Roblox Generator API is Live', time: new Date().toISOString() });
}

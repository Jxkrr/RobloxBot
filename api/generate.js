import axios from 'axios';
import UserAgent from 'user-agents';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const userAgent = new UserAgent().toString();
  const username = 'harmless' + Math.random().toString(36).substring(2, 7);
  const password = 'Harmless123!';
  const birthday = '2005-02-02';

  const payload = {
    username,
    password,
    birthday,
    gender: 2,
    isTosAgreementBoxChecked: true,
    context: 'Rollout_AgeGateB',
    referralData: '',
    displayName: username,
    // You would include a solved CAPTCHA token here if you had one
    // captchaToken: "PASTE_FROM_CAPSOLVER"
  };

  try {
    const response = await axios.post('https://auth.roblox.com/v2/signup', payload, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'Origin': 'https://www.roblox.com',
        'Referer': 'https://www.roblox.com/',
      }
    });

    if (response.data.errors) {
      return res.status(400).json({ success: false, errors: response.data.errors });
    }

    res.status(200).json({
      success: true,
      message: 'Account created (if CAPTCHA bypassed)',
      account: { username, password },
      raw: response.data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });
  }
}

import axios from 'axios';

export default async function handler(req, res) {
  const { method, body } = req;
  
  try {
    const response = await axios({
      method: method,
      url: `http://guidestarindia.momsuat.com${req.url}`,
      data: body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
      ...(error.response?.data && { details: error.response.data }),
    });
  }
}
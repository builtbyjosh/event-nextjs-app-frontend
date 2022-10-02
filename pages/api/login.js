import { API_URL } from '@/config/index';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body;
    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.body
      // body: JSON.stringify({
      //   identifier,
      //   password,
      // }),
    });
    const data = await strapiRes.json()

    console.log("LOGIN API DATA: ", {data})

    if(data.data !== null){
      res.status(200).json({user: data.user});
    } else {
      res
        .status(data.error.status)
        // .json({ message: data.message[0].messages[0].message });
        .json({ error: data.error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

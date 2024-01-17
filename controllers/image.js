const returnClarifairequestoptions = (imageUrl) => {
    const PAT = process.env.CLARIFAI_API_KEY;
    const USER_ID = process.env.CLARIFAI_USER_ID;       
    const APP_ID = 'facial-recognition';
    // const MODEL_ID = 'face-detection';   
    const IMAGE_URL = imageUrl;
    
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
          {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
          }
        ]
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
    return requestOptions;
}

const handleApiCall = (req, res) => {
    const { input } = req.body;
    fetch('https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifairequestoptions(input))
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(_err => res.status(400).json('Unable to work with API'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0].entries))
    .catch(_err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
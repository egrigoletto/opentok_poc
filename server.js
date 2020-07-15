const express = require('express');
const OpenTok = require('opentok');

const app = express();
const opentok = new OpenTok('<opentok apiKey>', '<opentonk secretKey>') 

app.listen(9077, () => console.info('servidor startou na porta 9077'));

app.get('/startBroadcast', (req, res) => {
  const sessionId = '<opentok sessoion id>';
  const broadcastOptions = {
    outputs: {
      rtmp: [
        {
          id: '<channel:> Youtube, facebook, etc>',
          serverUrl: 'url for stream',
          streamName: 'stream config given for provider',
        }
      ]
    },
    maxDuration: 100,
    resolution: '1280x720'
  };
  opentok.startBroadcast(sessionId, broadcastOptions, (error, broadcast) => {
    if (error) {
      console.error('Houve um erro ao iniciar o broadcast', error);
      res.status(500).send(`Deu ruim: ${error}`)
    } else {
      app.set('broadcastId', broadcast.id);
      console.log('objeto de Broadcast iniciado de startBroadcast', broadcast)
    }
  })
});

app.get('/stopBroadcast', (req, res) => {
  const broadcastId = app.get('broadcastId');
  opentok.stopBroadcast(broadcastId, (error, broadcast) => {
    if (error) {
      console.error('Houve um erro ao parar o broadcast', error);
      res.status(500).send(`Deu ruim\n ${error}`)
    } else {
      console.log('objeto de Broadcast parado de stopBroadcast', broadcast)
      app.set('broadcastId', null);
      res.json(broadcast);
    }
  });
});
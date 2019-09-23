const AlipaySdk = require('alipay-sdk').default;

const alipaySdk = new AlipaySdk({
    appId: '2019092367763010',
    privateKey: fs.readFileSync('./private-key.pem', 'ascii'),
});

alipaySdk.exec('alipay.system.oauth.token', {
  grantType: 'authorization_code',
  code: 'code',
  refreshToken: 'token'
})
  .then(result => {
    console.log(result);
  })
  .catch(function(err){
    
      //gg
    // ...
  })

var nodemailer = require('nodemailer');

// Create a SMTP transport object
function sendEmail (ip) {
  var transport = nodemailer.createTransport({
          service: 'Gmail',
              host: 'smtp.gmail.com',
              port: 587,
              secure: false, // upgrade later with STARTTLS
              auth: {
                user: "your@gmail.com",
                pass: "pass"
              }
  });

  console.log('SMTP Configured');

  // Message object
  var message = {

      // sender info
      from: 'Sender Name <your@gmail.com>',

      // Comma separated list of recipients
      to: '"Receiver Name" <your@mail.bg>',

      // Subject of the message
      subject: 'You have new ip address!!!', 

      // plaintext body
      text: 'Your new ip address is: ' + ip,

      // HTML body
      html:'Your new ip address is: ' + ip
  };

  console.log('Sending Mail');
  transport.sendMail(message, function(error){
    if(error){
        console.log('Error occured');
        console.log(error.message);
        return;
    }
    console.log('Message sent successfully!');

  });
}

var ip = function checkIP() {
  const phantom = require('phantom');

   (async function() {
      const instance = await phantom.create();
      const page = await instance.createPage();
/////////// use https://www.whatismyip.net to find your external ip ////////
      const status = await page.open('https://www.whatismyip.net');
      page.evaluateJavaScript(function() {
        return ip = document.getElementById('ipaddress').value;
      }).then(function(ip){

        var staticIp = '255.255.255.255'; /// assign your current ip to start from somewhere ///////
        if (ip != staticIp) {
          console.log(ip);
          sendEmail(ip);
          staticIp = ip;
        } else {
          console.log('ip is ' + staticIp);
        }
      });
      
      await instance.exit();
  })()
}
setInterval(ip, 1200000);///// repeat checking ip every 20 minutes ///
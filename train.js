const axios = require("axios");
const nodemailer = require("nodemailer");

async function emailSend() {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smpt.server",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'youremail',
            pass: 'password',
        },

    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'youremail', // sender address
        to: "yourmail@yahoo.com, yourmail@gmail.com", // list of receivers
        subject: "Train Class Available", // Subject line
        text: "Hey Ziko Your Khulna Train Available Now", // plain text body
        html: "Hurray Ziko Please Check Train Class", // html body
    });

    console.log("Message sent: %s", info.messageId);

}

const checkTrainTicketClassAvaialble = () => {

    axios
        .get("https://www.esheba.cnsbd.com/v1/trains?journey_date=2021-07-16&from_station=DA&to_station=KLN&class=S_CHAIR&adult=4&child=0")
        .then(value => {

            if (value.status == 200) {

                let data = value.data;
                console.log(data);
                if (data.length > 0) {
                    console.log('\x1b[32m%s\x1b[0m', 'Yahoo Train  Found');
                    emailSend().catch(console.error);
                } else {
                    console.log('\x1b[31m%s\x1b[0m', 'No Train  Found & Server Okay');
                }

            } else {
                console.log('\x1b[31m%s\x1b[0m', 'Oho Something Went worng on Server');
            }



        })
        .catch(e => {
            console.log("Error ----------->", e.response);
        });
};

checkTrainTicketClassAvaialble();

setInterval(() => {
    checkTrainTicketClassAvaialble();
}, 10000);

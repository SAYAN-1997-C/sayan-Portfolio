const mailgun = require('mailgun-js')({apiKey : process.env.MailGunApiKey,domain : process.env.MailGunDomain })

const sendMessage = (contactMessage) => {
    var message1 = "Contact Name : "+contactMessage.contactName
    var message2 = "Contact Email : "+contactMessage.contactEmail
    var message3 = contactMessage.message
    var message = message1+"  ||  "+message2+"  ||  "+message3

    var data = {
        from : 'sayanjashu23@gmail.com',
        to : 'sayanjashu365@gmail.com',
        subject : contactMessage.messageSubject,
        text : message
    }
    return new Promise((resolve,reject) => {
        mailgun.messages().send(data , (error , body) => {
            if(error) {
                reject('Not Ok')
            }
            resolve('Ok')
        })
    })
}

module.exports = {
    sendMessage
}
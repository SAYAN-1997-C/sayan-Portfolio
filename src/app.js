const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { sendMessage } = require('./emails/mail')

const app = express()

const port = process.env.PORT

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.post('/mail', async (req, res) => {

    try {
        const data = {
            contactName: req.body.contactName,
            contactEmail: req.body.contactEmail,
            messageSubject: req.body.messageSubject,
            message: req.body.message
        }
        await sendMessage(data)
        res.redirect('/')
    } catch (e) {
        res.status(500).send({
            Error : 'Something going wrong'
        })
    }

})

app.get('/*', (req, res) => {
    res.redirect('404.html')
})

app.listen(port, () => {
    console.log('Server is on port ', port)
})
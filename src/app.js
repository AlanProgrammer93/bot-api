import { MemoryDB, addKeyword, createBot, createFlow, createProvider } from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";

const flowBienvenida = addKeyword('hola').addAnswer('Buenas! Bienvenido')

const main = async () => {
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const phone = req.body.phone
        const message = req.body.message
        //const mediaUrl = req.body.mediaUrl

        await bot.sendMessage(phone, message, {
            /* media: mediaUrl */
        })
        res.end('enviar mensaje')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()

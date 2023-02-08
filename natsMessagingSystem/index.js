import { connect, StringCodec } from 'nats'
const servers = [{ servers: 'localhost:4442' }, { port: 4222 }]
await servers.forEach(async (v) => {
    try {
        const nc = await connect(v)
        console.log(`connected to ${nc.getServer()}`)
        // this promise indicates the client closed
        const done = nc.closed()
        // create a codec
        const sc = StringCodec()
        // create a simple subscriber and iterate over messages
        // matching the subscription
        const sub = nc.subscribe('hello')
        ;(async () => {
            for await (const m of sub) {
                console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`)
            }
            console.log('subscription closed')
        })()

        nc.publish('echo', sc.encode('world'))
        nc.publish('hello', sc.encode('again'))

        await nc.drain()
        // check if the close was OK
        const err = await done
        if (err) {
            console.log(`error closing:`, err)
        }
    } catch (err) {
        console.log(`error connecting to ${JSON.stringify(v)}`)
    }
})

import { connect, StringCodec } from 'nats'
const server = [{ port: 4222 }]

const nc = await connect(server)
const done = nc.closed()
const sc = StringCodec()

// const sub = nc.subscribe('standalone', { queue: 'standalone' })
const sub = nc.subscribe('other-echo')

;(async () => {
    for await (const m of sub) {
        console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`)
    }
    console.log('subscription closed')
})()

nc.publish('echo', sc.encode('echo'))
nc.publish('other-echo', sc.encode('again'))
nc.publish('echo', sc.encode('again2'))

await nc.drain()

const err = await done
if (err) {
    console.log(`error closing:`, err)
}

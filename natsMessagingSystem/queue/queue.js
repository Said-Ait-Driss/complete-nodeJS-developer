import { connect, StringCodec } from 'nats'

async function createService(name, count = 1, queue = '') {
    const conns = []
    for (let i = 1; i <= count; i++) {
        const n = queue ? `${name}-${i}` : name
        const nc = await connect({ servers: 'localhost:4222', name: `${n}` })
        nc.closed().then((err) => {
            if (err) {
                console.error(`service ${n} exited because of error: ${err.message}`)
            }
        })
        // create a subscription - note the option for a queue, if set
        // any client with the same queue will be a member of the group.
        const sub = nc.subscribe('echo', { queue: queue })

        const _ = handleRequest(n, sub)
        console.log(`${nc.options.name} is listening for 'echo' requests...`)
        conns.push(nc)
    }
    return conns
}

const sc = StringCodec()

// simple handler for service requests
async function handleRequest(name, s) {
    const p = 12 - name.length
    const pad = ''.padEnd(p)
    for await (const m of s) {
        // respond returns true if the message had a reply subject, thus it could respond
        if (m.data) {
            console.log(`[${name}]:${pad} #${s.getProcessed()} echoed ${sc.decode(m.data)}`)
        } else {
            console.log(`[${name}]:${pad} #${s.getProcessed()} ignoring request - no reply subject`)
        }
    }
}

// let's create two queue groups and a standalone subscriber
const conns = []
conns.push(...(await createService('other-echo')))
// conns.push(...(await createService('other-echo', 2, 'other-echo')))
// conns.push(...(await createService('echo2', 2, 'echo2')))
// conns.push(...(await createService('standalone')))

const a = []
conns.forEach((c) => {
    a.push(c.closed())
})
await Promise.all(a)

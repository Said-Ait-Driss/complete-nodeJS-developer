import { connect, StringCodec } from 'nats'

const nc = await connect({ port: 4222 })

const sc = StringCodec()

//*  this subscription listens for `time` 
//* requests and returns the current time
const sub = nc.subscribe('time')
;(async (sub) => {
    console.log(`listening for ${sub.getSubject()} requests...`)
    for await (const m of sub) {
        if (m.respond(sc.encode(new Date().toISOString()))) {
            console.info(`[time] handled #${sub.getProcessed()}`)
        } else {
            console.log(`[time] #${sub.getProcessed()} ignored - no reply subject`)
        }
    }
    console.log(`subscription ${sub.getSubject()} drained.`)
})(sub)

//* this subscription listens for `time` 
//* requests and returns the current time
const data = [
    {
        id: 21,
        name: 'said',
        age: 19,
    },
]

//* this subscription listens for me.test me.uptime and me.stop
//* requests to me.test returns an json object
//* requests to me.uptime returns how long the service has been running
//* requests to me.stop gracefully stop the client by draining
const started = Date.now()
const msub = nc.subscribe('me.*')
;(async (sub) => {
    console.log(`listening for ${sub.getSubject()} requests [test | uptime | stop]`)
    for await (const m of sub) {
        const chunks = m.subject.split('.')
        console.info(`[me] #${sub.getProcessed()} handling ${chunks[1]}`)
        switch (chunks[1]) {
            case 'test':
                console.log(`[test] got headers:`)
                console.info(`[ID] : ${m.headers.get('id')}`)
                console.info(`[NAME] : ${m.headers.get('name')}`)
                m.respond(sc.encode(JSON.stringify(data)))
                break
            case 'uptime':
                // send the number of millis since up
                m.respond(sc.encode(`${Date.now() - started}`))
                break
            case 'stop': {
                m.respond(sc.encode(`[me] #${sub.getProcessed()} stopping....`))
                // gracefully shutdown
                nc.drain().catch((err) => {
                    console.log('error draining', err)
                })
                break
            }
            default:
                console.log(`[me] #${sub.getProcessed()} ignoring request for ${m.subject}`)
        }
    }
    console.log(`subscription ${sub.getSubject()} drained.`)
})(msub)

// ? wait for the client to close.
await nc.closed().then((err) => {
    let m = `connection to ${nc.getServer()} closed`
    if (err) {
        m = `${m} with an error: ${err.message}`
    }
    console.log(m)
})

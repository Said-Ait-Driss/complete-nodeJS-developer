import { connect, StringCodec, headers } from 'nats'

const nc = await connect({ port: 4222 })

const sc = StringCodec()

// ? time
// await nc
//     .request('time', '', { timeout: 1000 })
//     .then((m) => {
//         console.log(`got response: ${sc.decode(m.data)}`)
//     })
//     .catch((err) => {
//         console.log(`problem with request: ${err.message}`)
//     })

// ? me.test
// * headers
const h = headers()
h.append('id', '123456')
h.append('name', 'med')

await nc
    .request('me.test', '', { timeout: 1000,headers: h  })
    .then((m) => {
        console.log(`got response:`)
        console.table(JSON.parse(sc.decode(m.data)))
    })
    .catch((err) => {
        console.log(`problem with request: ${err.message}`)
    })


// ?me.stop
    // await nc
    // .request('me.test', '', { timeout: 1000,headers: h  })
    // .then((m) => {
    //     console.log(`got response:`)
    //     console.table(JSON.parse(sc.decode(m.data)))
    // })
    // .catch((err) => {
    //     console.log(`problem with request: ${err.message}`)
    // })

await nc.close()

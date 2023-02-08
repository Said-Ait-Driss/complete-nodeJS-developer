import { connect, StringCodec } from 'nats'

const nc = await connect({ port: 4222 })
const sc = StringCodec()

// the '*' matches any string in the specified token position
const sub1 = nc.subscribe('said.*.system')
const sub2 = nc.subscribe('said.me.*')
// the '>' matches any tokens in that position or following
// '>' can only be specified at the end of the subject
const sub3 = nc.subscribe('said.>')

async function printMsgs(s) {
    let subj = s.getSubject()
    console.log(`listening for ${subj}`)
    const c = 13 - subj.length
    const pad = ''.padEnd(c)
    for await (const m of s) {
        console.log(
            `[${subj}]${pad} #${s.getProcessed()} - ${m.subject} ${
                m.data ? ' ' + sc.decode(m.data) : ''
            }`
        )
    }
}

printMsgs(sub1)
printMsgs(sub2)
printMsgs(sub3)

nc.publish('said.aitdriss.system', sc.encode('log infos gos here!'))
nc.publish('said.me/help', sc.encode('any help'))

// don't exit until the client closes
await nc.closed()

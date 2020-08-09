import nats from 'node-nats-streaming'
import { TicketCreaterPublisher } from './events/ticket-created-publisher'
console.clear()
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
})

stan.on('connect', async () => {
  console.log('Publisher connected to NATS')
  const pub = new TicketCreaterPublisher(stan)
  await pub.publish({
    id: `123`,
    title: 'thie is title',
    price: 20,
  })
})

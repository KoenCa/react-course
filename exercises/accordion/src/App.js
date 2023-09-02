import { useState } from 'react'
import './styles.css'

const faqs = [
  {
    title: 'Where are these chairs assembled?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
]

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  )
}

function Accordion({ data }) {
  const [currOpen, setCurrOpen] = useState(null)

  return (
    <div className="accordion">
      {data.map((faq, index) => (
        <AccordionItem
          key={faq.title}
          number={index}
          title={faq.title}
          currOpen={currOpen}
          onOpen={setCurrOpen}
        >
          {faq.text}
        </AccordionItem>
      ))}

      <AccordionItem
        number={22}
        title={'Thinking in React'}
        currOpen={currOpen}
        onOpen={setCurrOpen}
      >
        <p>Allows React developers to:</p>
        <ul>
          <li>Break UI into components</li>
          <li>Build a static version of the app</li>
          <li>Identify the minimal (but complete) representation of UI state</li>
          <li>Identify where your state should live</li>
          <li>Add inverse data flow</li>
        </ul>
      </AccordionItem>
    </div>
  )
}

function AccordionItem({ children, number, title, currOpen, onOpen }) {
  const isOpen = currOpen === number

  function handleToggle() {
    onOpen(isOpen ? null : number)
  }

  return (
    <div className={`item ${isOpen && 'open'}`} onClick={handleToggle}>
      <p className="number">{number < 9 ? `0${number + 1}` : number + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>

      {isOpen && <div className="content-box">{children}</div>}
    </div>
  )
}

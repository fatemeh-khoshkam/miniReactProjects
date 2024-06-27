import React, { useState } from "react";
import "./index.css";

interface faqsType {
  title: string;
  text: string;
}

const faqs : faqsType [] = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function App():React.JSX.Element {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

interface AccordionDataProp{
  data: faqsType[];
}

function Accordion({ data } : AccordionDataProp) {
  const [curOpen, setCurOpen] = useState<number | null>(null);

  return (
    <div className="accordion">
      {data.map((el:faqsType, i:number) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          key={el.title}
          num={i}
        >
          {el.text}
        </AccordionItem>
      ))}
    </div>
  );
}

interface AccordionItemProps {
  title: string;
  num: number;
  curOpen: number | null;
  onOpen: (num: number | null) => void;
  children: React.ReactNode;
}

function AccordionItem({ title, num, curOpen, onOpen, children } : AccordionItemProps) {
  const isOpen:boolean = curOpen === num;

  function toggleHandler():void {
    onOpen(isOpen ? null : num);
  }
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={toggleHandler}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? `-` : `+`}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

export default App;

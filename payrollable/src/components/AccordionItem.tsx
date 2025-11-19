import { type ReactNode } from "react";

type AccordionItemProps = {
  id: string;            
  title: string;         // text on the accordion button
  children: ReactNode;   // body content inside accordion
  defaultOpen?: boolean; // optional: open by default
};

export default function AccordionItem({
  id,
  title,
  children,
  defaultOpen = false
}: AccordionItemProps) {
  const collapseId = `collapse-${id}`;
  const headingId = `heading-${id}`;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={headingId}>
        <button
          className={`accordion-button ${defaultOpen ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded={defaultOpen}
          aria-controls={collapseId}
        >
          {title}
        </button>
      </h2>

      <div
        id={collapseId}
        className={`accordion-collapse collapse ${defaultOpen ? "show" : ""}`}
        aria-labelledby={headingId}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
}
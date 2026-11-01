import { contactContent } from "./content";

export default function Contact() {
  const { pagehead, label, note, email } = contactContent;
  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <div className="pagehead__kicker eyebrow">{pagehead.kicker}</div>
          <h1 className="pagehead__title">{pagehead.title}</h1>
        </div>
      </header>

      <section className="contact">
        <div className="wrap">
          <span className="contact__label eyebrow">{label}</span>
          <p className="contact__note">{note}</p>
          <div className="contact__direct">
            <span>Prefer email?</span>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
      </section>
    </>
  );
}

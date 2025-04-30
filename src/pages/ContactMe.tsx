import React from "react";
import emailjs from "emailjs-com";
import "../styles/contact.scss";

const ContactMe = () => {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("메일이 성공적으로 전송되었어요! ✨");
        },
        (error) => {
          alert("메일 전송 실패 😥: " + error.text);
        }
      );

    e.currentTarget.reset();
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Me</h2>
        <p className="contact-subtext">
          궁금한 점이나 협업 제안이 있다면 언제든지 연락해주세요 💌
        </p>
        <form className="contact-form" onSubmit={sendEmail}>
          <input
            type="text"
            name="from_name"
            placeholder="누가 작성하고 있나요?"
            required
          />
          <input
            type="email"
            name="reply_to"
            placeholder="이메일 적어주세요"
            required
          />
          <textarea
            name="message"
            rows={5}
            placeholder="궁금한 사항 있으시면 적어주세요"
            required
          />
          <button type="submit">문자 전송</button>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;

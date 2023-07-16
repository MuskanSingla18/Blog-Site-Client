import React, { useState } from "react";
import "./contact.css";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // You can use the name, email, and enquiry values to send the form data to your server or perform any other actions

    // Reset form fields
    setName("");
    setEmail("");
    setEnquiry("");

    // Set submitted state to true to show a success message or redirect to a thank you page
    setSubmitted(true);
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      {submitted ? (
        <p>Thank you for your enquiry! We'll Contact You Soon.</p>
      ) : (
        <section className="newPost">
        <div className="container boxItems">
          <br></br>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />    

            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={enquiry}
              onChange={(e) => setEnquiry(e.target.value)}
            ></textarea>

            <button className="button">Send</button>
          </form>
        </div>
      </section>
      )}
      <br></br>
    </div>
  );
};

import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { ChangeEvent, useState } from "react";

const EmailSignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmitClick = async () => {
    if (email === "") return;
    const response = await fetch(
      "https://emails.zeitgeist.pm/landing-subscribe",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    ).catch(() => {
      setResponseMessage("Signup failed please try again later");
    });

    if (response?.status === 201) {
      setResponseMessage("Thanks! We'll be in touch");
    } else if (response?.status === 204) {
      setResponseMessage("You are already registered");
    } else if (response?.status === 400) {
      setResponseMessage("Email address is invalid");
    } else {
      setResponseMessage("Signup failed please try again later");
    }
  };

  return (
  <section className={clsx('row', styles.newsletter)}>
    <div className={clsx('container', styles.newsletterForm)}>
      <input
        className={styles.input}
        onChange={handleEmailChange}
        value={email}
        type="email"
        placeholder="Sign up for the Zeitgeist Newsletter"
      />
      <button
        className='button button-primary'
        onClick={handleSubmitClick}
      >
        Send
      </button>
      {responseMessage !== undefined && (
        <div className={styles.newsletterMessage}>{responseMessage}</div>
      )}
    </div>
  </section>
  );
};

export default EmailSignUp;
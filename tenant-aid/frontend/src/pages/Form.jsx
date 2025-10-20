import React, { useState } from 'react';
import '../css/Form.css';

function Form() {
  const [formData, setFormData] = useState({
    email: '',
    response: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData); // ammaar you need to work on this later
    setFormData({ email: '', response: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="response">Your Message:</label>
      <textarea
        id="response"
        name="response"
        value={formData.response}
        onChange={handleChange}
        maxLength={1000}
        rows={20} // Adjust height
        required
      ></textarea>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
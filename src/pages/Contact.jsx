import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can integrate with backend or email service here
    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Thank you for contacting us!");
  };

  return (
    <div className="min-h-screen px-4 md:px-16 py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Contact Info */}
          <div className="flex flex-col justify-center gap-4">
            <h3 className="text-xl font-semibold mb-3">Our Information</h3>
            <p className="text-gray-700">
              Feel free to reach out to us for any questions or support. Our team
              is here to help you!
            </p>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-semibold">Address:</span> 123 Main Street, City, Country</p>
              <p><span className="font-semibold">Phone:</span> +123 456 7890</p>
              <p><span className="font-semibold">Email:</span> info@example.com</p>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 border rounded-lg"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

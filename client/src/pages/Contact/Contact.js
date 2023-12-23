import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Enter a Valid Email");
      }
    }
    if (!messages) {
      setErrMessages("Enter your Messages");
    }
    if (clientName && email && EmailValidation(email) && messages) {
      setSuccessMsg(
        `Thank you dear ${clientName}, Your messages has been received successfully. Futher details will sent to you by your email at ${email}.`
      );
    }
  };

  return (
    // <div className="max-w-container mx-auto px-4">
    //   <Breadcrumbs title="Contact" prevLocation={prevLocation} />
    //   {successMsg ? (
    //     <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
    //   ) : (
    //     <form className="pb-20">
    //       <h1 className="font-titleFont font-semibold text-3xl">
    //         Fill up a Form
    //       </h1>
    //       <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
    //         <div>
    //           <p className="text-base font-titleFont font-semibold px-2">
    //             Name
    //           </p>
    //           <input
    //             onChange={handleName}
    //             value={clientName}
    //             className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
    //             type="text"
    //             placeholder="Enter your name here"
    //           />
    //           {errClientName && (
    //             <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
    //               <span className="text-sm italic font-bold">!</span>
    //               {errClientName}
    //             </p>
    //           )}
    //         </div>
    //         <div>
    //           <p className="text-base font-titleFont font-semibold px-2">
    //             Email
    //           </p>
    //           <input
    //             onChange={handleEmail}
    //             value={email}
    //             className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
    //             type="email"
    //             placeholder="Enter your name here"
    //           />
    //           {errEmail && (
    //             <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
    //               <span className="text-sm italic font-bold">!</span>
    //               {errEmail}
    //             </p>
    //           )}
    //         </div>
    //         <div>
    //           <p className="text-base font-titleFont font-semibold px-2">
    //             Messages
    //           </p>
    //           <textarea
    //             onChange={handleMessages}
    //             value={messages}
    //             cols="30"
    //             rows="3"
    //             className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
    //             type="text"
    //             placeholder="Enter your name here"
    //           ></textarea>
    //           {errMessages && (
    //             <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
    //               <span className="text-sm italic font-bold">!</span>
    //               {errMessages}
    //             </p>
    //           )}
    //         </div>
    //         <button
    //           onClick={handlePost}
    //           className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
    //         >
    //           Post
    //         </button>
    //       </div>
    //     </form>
    //   )}
    // </div>
    //* new code
    <div className="mt-[75px]">
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29205.984753775258!2d90.34698099838684!3d23.791983051290924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c19fbd27ef77%3A0x1a4e687eb96f52a9!2sMUSLIN!5e0!3m2!1sen!2sbd!4v1700650111562!5m2!1sen!2sbd"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[300px]"
        ></iframe>
      </div>
      <div className="max-w-screen-2xl mx-auto py-10">
        <div>
          <h1 className="md:text-5xl text-2xl  font-bold pb-5 text-center">
            Our Offices
          </h1>

          <div className="w-full px-4 mb-2 text-center">
            <p className="flex items-start justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-4 h-4 mr-1  dark:text-gray-400 bi bi-geo-alt "
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"></path>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
              </svg>
              <span className=" dark:text-gray-400 -mt-1">
                55/8 Norh Pirerbag,60 Feet, Mirpur-2, Dhaka-1216
              </span>
            </p>
            <p className="flex items-center my-4 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-4 h-4 mr-2  dark:text-gray-400 bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"></path>
              </svg>
              <a
                href="mailto:"
                className="hover:scale-105 hover:translate-x-2 duration-500"
              >
                <span className=" dark:text-gray-400">
                  <a href="mailto:info@muslin.com.bd">info@muslin.com.bd</a>
                </span>
              </a>
            </p>
            <p className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-4 h-4 mr-2  dark:text-gray-400 bi bi-telephone"
                viewBox="0 0 16 16"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
              </svg>
              <a
                href="tel:+8801580799986"
                className="hover:scale-105 hover:translate-x-2 duration-500"
              >
                <span className=" dark:text-gray-400">01580799986</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

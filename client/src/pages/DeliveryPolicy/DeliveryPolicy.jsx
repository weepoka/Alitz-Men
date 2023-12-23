const DeliveryPolicy = () => {
  return (
    <div>
      <div className="px-4 py-20 lg:py-40 md:text-center  bg-stone-100">
        <div className="relative">
          <h1 className="absolute -top-14 left-0 right-0 lg:flex justify-center text-[20px] lg:text-[100px] text-gray-900 font-bold  opacity-5 md:block hidden">
            Alit Menz
          </h1>
          <h1 className="pl-2 text-3xl font-bold border-l-8 md:text-5xl text-[#1B3A71]">
            Delivery Policy
          </h1>
        </div>

        <div className="lg:text-base text-sm leading-7 text-gray-500 py-10 text-justify max-w-screen-md mx-auto">
          <p>
            We are committed to delivering your order accurately, in good
            condition and on time. Please note our shipping policy as follows:
          </p>
          <ul className="list-disc ml-10">
            <li>Delivery time within Dhaka: Within 3 working days</li>
            <li>Delivery time outside Dhaka: within 5 working days</li>
            <li>
              Delivery time may be up to 15 days due to stock issue, delivery
              issue or any other issue and the customer will be informed about
              this.
            </li>
            <li>Delivery charge within Dhaka City is Tk 70</li>
            <li>
              Delivery charge within Dhaka sub area is Tk 120 (Savar, Ghazipur,
              Narayanganj, Keraniganj)
            </li>
            <li> Delivery charge outside Dhaka is Tk 130</li>
            <li>
              In case of order confirmation in Dhaka sub area and outside Dhaka,
              shipping charge has to be advanced as security money, which is
              non-refundable after dispatch of order.
            </li>
            <li>
              Please note that we are associated with a shipping company for
              order delivery. Therefore, the shipping process is completely out
              of our control. We apologize for any loss and promise to
              compensate.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPolicy;

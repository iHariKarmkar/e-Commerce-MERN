import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="About Us Image"
          className="w-full md:max-w-[450px]"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Elegance is where fashion meets individuality. We create stylish,
            sustainable, and high-quality clothing for the modern trendsetter.
          </p>
          <p>
            Our designs blend current trends with timeless elegance, ensuring
            there’s something for everyone.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            To provide eco-friendly, stylish clothing that empowers confidence
            while maintaining ethical production and quality craftsmanship.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
          We guarantee top-quality materials and craftsmanship in every piece.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Effortless shopping with fast delivery and easy payment options.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Customer Service:</b>
          <p className="text-gray-600">We ensure a smooth shopping experience with dedicated support.</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default About;

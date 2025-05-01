import Image from "next/image"
import SectionHeader from "./section-header"

export default function HowItWorks() {
  return (
    <div className="memorial-hiw-container max-w-[1200px] mx-auto py-10 px-5">
      <SectionHeader
        title="HOW IT WORKS"
        subtitle="Create a beautiful memorial page in just a few simple steps to honor and remember your loved ones."
      />

      <div className="memorial-hiw-journey relative py-5">
        {/* Path line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold-primary to-gold-primary rounded-md z-[1]"></div>

        {/* Step 1 */}
        <div className="memorial-hiw-step flex mb-16 relative z-[2]">
          <div className="memorial-hiw-step-content w-[45%] bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-6 shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-hover mr-auto relative">
            <div className="memorial-hiw-step-number absolute top-[-20px] right-[-20px] w-10 h-10 bg-gradient-to-r from-gold-primary to-gold-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
              1
            </div>
            <h3 className="memorial-hiw-step-title text-gold-primary text-xl mb-4 font-semibold">
              Choose Your Package
            </h3>
            <p className="memorial-hiw-step-description text-gray-600 leading-relaxed">
              Select between our classic or premium memorial subscription options, each with unique features to honor
              your loved one.
            </p>
            <div className="memorial-hiw-heart-accent absolute bottom-[10px] left-[10px] w-[25px] h-[25px] opacity-60">
              <Image src="/images/heart.png" alt="" width={25} height={25} />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="memorial-hiw-step flex mb-16 relative z-[2] flex-row-reverse">
          <div className="memorial-hiw-step-content w-[45%] bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-6 shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-hover ml-auto relative">
            <div className="memorial-hiw-step-number absolute top-[-20px] left-[-20px] w-10 h-10 bg-gradient-to-r from-gold-primary to-gold-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
              2
            </div>
            <h3 className="memorial-hiw-step-title text-gold-primary text-xl mb-4 font-semibold">Select Page Type</h3>
            <p className="memorial-hiw-step-description text-gray-600 leading-relaxed">
              Choose the perfect format for your memorial: Autobiography, Biography, or Memorial page.
            </p>
            <div className="memorial-hiw-heart-accent absolute bottom-[10px] right-[10px] w-[25px] h-[25px] opacity-60">
              <Image src="/images/heart.png" alt="" width={25} height={25} />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="memorial-hiw-step flex mb-16 relative z-[2]">
          <div className="memorial-hiw-step-content w-[45%] bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-6 shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-hover mr-auto relative">
            <div className="memorial-hiw-step-number absolute top-[-20px] right-[-20px] w-10 h-10 bg-gradient-to-r from-gold-primary to-gold-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
              3
            </div>
            <h3 className="memorial-hiw-step-title text-gold-primary text-xl mb-4 font-semibold">Privacy Settings</h3>
            <p className="memorial-hiw-step-description text-gray-600 leading-relaxed">
              Decide whether your memorial page will be public for all to visit or private for invited guests only.
            </p>
            <div className="memorial-hiw-heart-accent absolute bottom-[10px] left-[10px] w-[25px] h-[25px] opacity-60">
              <Image src="/images/heart.png" alt="" width={25} height={25} />
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="memorial-hiw-step flex mb-16 relative z-[2] flex-row-reverse">
          <div className="memorial-hiw-step-content w-[45%] bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-6 shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-hover ml-auto relative">
            <div className="memorial-hiw-step-number absolute top-[-20px] left-[-20px] w-10 h-10 bg-gradient-to-r from-gold-primary to-gold-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
              4
            </div>
            <h3 className="memorial-hiw-step-title text-gold-primary text-xl mb-4 font-semibold">
              Add Honoree Details
            </h3>
            <p className="memorial-hiw-step-description text-gray-600 leading-relaxed">
              Enter information about your loved one, upload their photo, and create a personalized URL for their
              memorial.
            </p>
            <div className="memorial-hiw-heart-accent absolute bottom-[10px] right-[10px] w-[25px] h-[25px] opacity-60">
              <Image src="/images/heart.png" alt="" width={25} height={25} />
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="memorial-hiw-step flex mb-16 relative z-[2]">
          <div className="memorial-hiw-step-content w-[45%] bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-6 shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-hover mr-auto relative">
            <div className="memorial-hiw-step-number absolute top-[-20px] right-[-20px] w-10 h-10 bg-gradient-to-r from-gold-primary to-gold-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
              5
            </div>
            <h3 className="memorial-hiw-step-title text-gold-primary text-xl mb-4 font-semibold">Your Contact Info</h3>
            <p className="memorial-hiw-step-description text-gray-600 leading-relaxed">
              Provide your details as the page creator to manage the memorial and receive important updates.
            </p>
            <div className="memorial-hiw-heart-accent absolute bottom-[10px] left-[10px] w-[25px] h-[25px] opacity-60">
              <Image src="/images/heart.png" alt="" width={25} height={25} />
            </div>
          </div>
        </div>

        {/* Step 6 */}
        <div className="memorial-hiw-step flex mb-16 relative z-[2] flex-row-reverse">
          <div className="memorial-hiw-step-content w-[45%] bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-6 shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-hover ml-auto relative">
            <div className="memorial-hiw-step-number absolute top-[-20px] left-[-20px] w-10 h-10 bg-gradient-to-r from-gold-primary to-gold-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
              6
            </div>
            <h3 className="memorial-hiw-step-title text-gold-primary text-xl mb-4 font-semibold">Payment Method</h3>
            <p className="memorial-hiw-step-description text-gray-600 leading-relaxed">
              Choose from multiple secure payment options including Visa, Mastercard, PayPal, or Direct Debit.
            </p>
            <div className="memorial-hiw-heart-accent absolute bottom-[10px] right-[10px] w-[25px] h-[25px] opacity-60">
              <Image src="/images/heart.png" alt="" width={25} height={25} />
            </div>
          </div>
        </div>

        {/* Step 7 */}
        <div className="memorial-hiw-step flex mb-16 relative z-[2]">
          <div className="memorial-hiw-step-content w-[45%] bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-6 shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-hover mr-auto relative">
            <div className="memorial-hiw-step-number absolute top-[-20px] right-[-20px] w-10 h-10 bg-gradient-to-r from-gold-primary to-gold-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
              7
            </div>
            <h3 className="memorial-hiw-step-title text-gold-primary text-xl mb-4 font-semibold">Email Confirmation</h3>
            <p className="memorial-hiw-step-description text-gray-600 leading-relaxed">
              Check your inbox for login details and important information about your new memorial page.
            </p>
            <div className="memorial-hiw-heart-accent absolute bottom-[10px] left-[10px] w-[25px] h-[25px] opacity-60">
              <Image src="/images/heart.png" alt="" width={25} height={25} />
            </div>
          </div>
        </div>

        {/* Step 8 */}
        <div className="memorial-hiw-step flex mb-16 relative z-[2] flex-row-reverse">
          <div className="memorial-hiw-step-content w-[45%] bg-gradient-to-br from-white to-[#fffdf5] rounded-xl p-6 shadow-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-hover ml-auto relative">
            <div className="memorial-hiw-step-number absolute top-[-20px] left-[-20px] w-10 h-10 bg-gradient-to-r from-gold-primary to-gold-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
              8
            </div>
            <h3 className="memorial-hiw-step-title text-gold-primary text-xl mb-4 font-semibold">Personalize Design</h3>
            <p className="memorial-hiw-step-description text-gray-600 leading-relaxed">
              Make the memorial unique by selecting backgrounds, colors, fonts, and adding meaningful content.
            </p>
            <div className="memorial-hiw-heart-accent absolute bottom-[10px] right-[10px] w-[25px] h-[25px] opacity-60">
              <Image src="/images/heart.png" alt="" width={25} height={25} />
            </div>
          </div>
        </div>
      </div>

      {/* Final Step */}
      <div className="memorial-hiw-final-step text-center bg-gradient-to-br from-[#fffdf5] to-white p-10 rounded-2xl mt-5 relative border border-gold-primary/50 shadow-gold-final">
        <div className="flex justify-center mb-5">
          <Image src="/images/heart.png" alt="Golden Heart" width={60} height={60} className="object-contain" />
        </div>
        <h3 className="memorial-hiw-final-step-title text-gold-primary text-2xl mb-5 font-semibold">
          Share With Loved Ones
        </h3>
        <p className="memorial-hiw-final-step-description text-gray-600 leading-relaxed max-w-[700px] mx-auto">
          Invite family and friends to visit the memorial and contribute their own memories and tributes to create a
          lasting legacy.
        </p>
      </div>
    </div>
  )
}

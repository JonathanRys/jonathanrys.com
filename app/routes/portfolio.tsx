import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "Portfolio",
  };
};

const portfolioData = [
  {
    id: 1,
    title: "HealthVision",
    company: "HDAI",
    text: "Improved developer experience and worked on all aspects of the application available in hospitals throughout the country inside Epic. This app allows physicians and nurses to gain valuable insights into their patients' medical history using data science and AI tools.",
  },
  {
    id: 2,
    title: "PhysGPT",
    company: "Private Investor",
    text: "This project ingested millions of vectors of data from over 5000 PDFs that were OCRed, split into chunks, embedded, and uploaded to Pinecone. The vectors were then queried and fed to Chat GPT to answer questions about physics for a group of mad scientists. This was built with FastAPI and React then provisioned on AWS using Terraform.",
  },
  {
    id: 3,
    title: "jonathan.rys.com",
    company: "Personal Project",
    text: "I built this site using ReMix.",
  },
  {
    id: 4,
    title: "Queuing system",
    company: "BetterLesson",
    text: "Took ownership of the queuing system and managed setting up a FIFO queue as well as dead-letter queues. This was built in AWS Lambda(Python) and SQS.",
  },
  {
    id: 5,
    title: "Coaching Platform",
    company: "BetterLesson",
    text: "Worked on various features of our interactive coaching platform, from video integration with Zoom to user management consoles. This was Built on Flask and React.",
  },
  {
    id: 6,
    title: "Python 3 Upgrade",
    company: "BetterLesson",
    text: "Led the upgrade of our servers in all environments from Python 2.7 to Python 3.6 and updated the encoding and collation of some columns in MySQL to utf8 from latin1.",
  },
  {
    id: 7,
    title: "Arduino project for my parents",
    company: "Mom & Dad",
    text: "Wrote C++ code to control the lights on the stairs at my parent's house using motion sensors.  This required using a priority queue so that someone triggering one set of lights doesn't affect another set of previously triggered lights.",
  },
  {
    id: 8,
    title: "Mobile app to check product ingredients",
    company: "Personal Project",
    text: "Designed and build a mobile app for Android using React Native.  This app allows the user to set dietary preferences within the app and then scan food products at the store.  The app takes the barcode and calls the OpenFoodFacts.org API to get a list of ingredients and other dietary information.  Then it makes a call to my Python API to classify the ingredients.  Then, based on the user's preferences, it would let them know if the product met their approval.",
  },
  {
    id: 9,
    title: "OnSite",
    company: "American Tower",
    text: "This was an app to help technicians take inventory of the equipment on cell phone towers. The app needed to be available offline so they could upload the data when they returned to their homes. This app was built with jQuery, CSS, and HTML.  I was not initially the architect on this project, but I came to own the product.",
  },
  {
    id: 10,
    title: "Digits",
    company: "Pearson",
    text: "This was a digital learning platform that I helped work on. It was built with HTML, CSS, MathML, and Javascript.",
  },
  {
    id: 11,
    title: "Texaco Project",
    company: "Texaco",
    text: "Rewrote legacy FORTRAN code to work with the inputs and outputs of the flowcharting software Aspen.  Used the results to program EEPROM chips for use in refinery control systems.  This required rewriting all the loops to use a newer syntax and all I had was a dot-matrix printed FORTRAN manual to help me.  After getting the code working in the flowcharting software, we were able to run simulations and adjust the inputs to find the optimal solution.  We then took that solution and used it to program EEPROM chips for use in the refinery's control systems.",
  },
];

const Portfolio = () => {
  return (
    <div>
      <h1 className="mb-2 text-2xl">Portfolio</h1>
      <div>
        <h3 className="text-lg">Here are some of the projects I'm proud of:</h3>
        {portfolioData.map((folio) => (
          <div key={`folio-${folio.id}`} className="list-item-bubble my-10 p-5">
            <h5 className="mb-2 text-base font-semibold" title={folio.company}>
              {folio.title}
            </h5>
            <p>{folio.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;

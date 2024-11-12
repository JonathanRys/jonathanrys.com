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
    text: "Worked on all aspects of this application which is available in hospitals throughout the country inside Epic. This application allows physicians and nurses to gain valuable insights into their patients' medical history using data science and AI tools.",
  },
  {
    id: 2,
    title: "PhysGPT",
    company: "Private Investor",
    text: "This project ingested millions of vectors of data from over 5000 PDFs (some 100,000 pages long) that were OCRed, split into chunks, embedded, and uploaded to Pinecone. When the user enters a query, the query is converted to a vector and sent to pinecone.  Pinecone then takes that vector, and using cosine similarity (ignoring magnitude and focusing on the angle between the vectors), it finds the top 10 most similar vectors and returns them to me, I then query MongoDB to get the actual text and book metadata and I query an LLM to get an AI-generated summary of the topic given the returned texts as context. This was built with FastAPI and React then provisioned on AWS using Terraform.  User management and account info is stored in DynamoDB, vectors are stored in Pinecone (I also tested this in Milvus), and the actual text and associated metadata is stored in MongoDB.",
  },
  {
    id: 3,
    title: "jonathanrys.com",
    company: "Personal Project",
    text: "I built this site using ReMix.  I chose ReMix because I was interested in proxy state management in React, read Kent C. Dodd's article on ReMix and became interested, and I wanted to learn DynamoDB.  Design guidelines say to choose 3 colors for your brand and stick with those, so I chose black, white and gray.  I'm not really much of a designer, but I can build complex, pixel-perfect UIs.",
  },
  {
    id: 4,
    title: "Queuing system",
    company: "BetterLesson",
    text: "Took over ownership of the queuing system and the associated webhooks. I managed setting up and configuring a FIFO queue as well as dead-letter queues. This was built in AWS Lambda(Python) and SQS.",
  },
  {
    id: 5,
    title: "Coaching Platform",
    company: "BetterLesson",
    text: "Worked on various features of our interactive coaching platform, from video integration with Zoom to user management consoles. This application was built with Flask and React and pulled data from Zoom, Salesforce, CoachBase, and MySQL together to allow teachers and their coaches to lay out a learning plan, share milestones and feedback, and schedule and share clips from video meetings all within our platform.",
  },
  {
    id: 6,
    title: "Python 3 Upgrade",
    company: "BetterLesson",
    text: "Led the upgrade of our servers in all environments from Python 2.7 to Python 3.6 and updated the encoding and collation of character-based columns in MySQL to utf8 from latin1.",
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
    text: "Designed and built a mobile app for Android using React Native.  This app allows the user to set dietary preferences within the app and then scan food products at the store.  The app takes the barcode and calls the OpenFoodFacts.org API to get a list of ingredients and other dietary information.  Then it makes a call to my Python API to classify the ingredients.  Then, based on the user's preferences, the UI would let them know if the product met their approval.",
  },
  {
    id: 9,
    title: "OnSite",
    company: "American Tower",
    text: "This was an app to help technicians take inventory of the equipment on cell phone towers. The app needed to be available offline so they could upload the data when they returned to their homes so I made heavy use of localStorage and service workers. This app was built with jQuery, CSS, and HTML.  I was not initially the architect on this project, but I came to own the product.",
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
            <h5 className="mb-2 text-base font-semibold">
              {folio.title} (<span className="text-sm">{folio.company}</span>)
            </h5>
            <p>{folio.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;

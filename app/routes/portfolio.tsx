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
    text: (
      <>
        <p>
          I worked on all aspects of this application which is available in
          hospitals throughout the country (inside Epic). This application
          allows physicians and nurses to gain valuable insights into their
          patients' medical history using data science and AI tools. This app
          queries tables with hundreds of million to billions of rows, so we
          built an advanced filter selector to allow users to find the data
          they're looking for easily. I created the tables to save the column
          and filter selections in and connected much of that functionality from
          the front end to the database and back. I also built much of the UI
          for the custom saved view selector.
        </p>
        <p>
          Before that, I worked on linking three tables of nested data to
          display HCC gap information to help ACOs stay on top of their
          reporting. These pages had breadcrumbs and saved filter nad scroll
          state between navigation and complex table functionality using React
          Suite and Ant-D. Added patient scorecards including Google Maps
          integration, star ratings, and various data widgets.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "PhysGPT",
    company: "Private Investor",
    text: (
      <>
        <p>
          This project ingested millions of vectors of data from over 5000 PDFs
          (some 100,000 pages long) that were OCRed, split into chunks,
          embedded, and uploaded to Pinecone. When the user enters a query via
          the UI, the query is converted to a vector and sent to Pinecone (I
          also tested this with Milvus but Pinecone was more performant and
          easier than managing my own server). Pinecone then takes that vector,
          finds the top 10 closest (most semantically similar) vectors, and
          returns them. I query MongoDB to get the actual text and book metadata
          then I query the LLM with the text as well as an engineered prompt as
          context to get an AI-generated summary of the topic.
        </p>
        <p>
          This was built with FastAPI and React, then Dockerized and pushed to
          ECR. The infrastructure was provisioned on AWS using Terraform. User
          management and account info is stored in DynamoDB, vectors are stored
          in Pinecone, and text and metadata in MongoDB.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "jonathanrys.com",
    company: "Personal Project",
    text: (
      <p>
        I built this site using ReMix. I chose ReMix for a few reasons: I was
        interested in proxy state management using MobX in React, I had read
        Kent C. Dodd's article on ReMix and wanted to try it out, and I wanted
        to learn DynamoDB. ReMix comes with a basic home page design out of the
        box. I liked it better than any previous idea I had and didn't want to
        re-invent the wheel, so I modified it and added some pages of my own.
        Design guidelines say to choose 3 colors for your brand and stick with
        those; I chose black, white and gray ;). I'm not really much of a
        designer, but I can quickly build complex, pixel-perfect UIs.
      </p>
    ),
  },
  {
    id: 4,
    title: "Queuing system",
    company: "BetterLesson",
    text: (
      <p>
        Took over ownership of the queuing system and the associated webhooks. I
        managed setting up and configuring a FIFO queue as well as dead-letter
        queues. This was built in AWS Lambda(Python) and SQS. The queuing system
        handled webhook calls from Zoom and Salesforce and updated our app and
        data warehouse whenever a data source changed. This project was fun
        because all of the functions had to be idempotent for this to work.
      </p>
    ),
  },
  {
    id: 5,
    title: "Coaching Platform",
    company: "BetterLesson",
    text: (
      <p>
        Worked on various features of our interactive coaching platform, from
        video integration with Zoom to user management consoles. This
        application was built with Flask and React and pulled data from Zoom,
        Salesforce, CoachBase, and MySQL together to allow teachers and their
        coaches to lay out a learning plan, share milestones and feedback,
        schedule recurring meetings and event series, and share video clips from
        meetings all within our platform.
      </p>
    ),
  },
  {
    id: 6,
    title: "Python 3 Upgrade",
    company: "BetterLesson",
    text: (
      <p>
        Led the upgrade of our servers in all environments from Python 2.7 to
        Python 3.6 and updated the encoding and collation of character-based
        columns in MySQL from latin1 to utf8mb4. Upgraded libraries, updated
        syntax, fixed circular imports, and removed old code.
      </p>
    ),
  },
  {
    id: 7,
    title: "Arduino project for my parents",
    company: "Mom & Dad",
    text: (
      <p>
        Wrote C++ code to control the lights on the stairs at my parent's house
        using motion sensors. This required using a priority queue so that
        someone triggering one set of lights doesn't affect another set of
        previously triggered lights.
      </p>
    ),
  },
  {
    id: 8,
    title: "Mobile app to check product ingredients",
    company: "Personal Project",
    text: (
      <p>
        Designed and built a mobile app for Android using React Native. This app
        allows the user to set dietary preferences within the app and then scan
        food products at the store. The app takes the barcode and calls the
        OpenFoodFacts.org API to get a list of ingredients and other dietary
        information. Then it makes a call to my Python API to classify the
        ingredients. Then, based on the user's preferences, the UI would let
        them know if the product met their approval.
      </p>
    ),
  },
  {
    id: 9,
    title: "OnSite",
    company: "American Tower",
    text: (
      <p>
        This was an app to help technicians take inventory of the equipment on
        cell phone towers. The app needed to be available offline so they could
        upload the data when they returned to their homes so I made heavy use of
        localStorage and service workers. This app was built with jQuery, CSS,
        and HTML. I was not initially the architect on this project, but I came
        to own the product. I used event delegation to keep the number of event
        handlers to a reasonable number and built the interface for taking
        inventory of the equipment on the towers as well as most of the other
        functionality for surveying the site and site access.
      </p>
    ),
  },
  {
    id: 10,
    title: "Digits",
    company: "Pearson",
    text: (
      <p>
        This was a digital learning platform that I helped work on. It was built
        with HTML, CSS, MathML, and Javascript. This was my first time working
        with responsive/adaptive design in the workplace and learning that was a
        lot of fun.
      </p>
    ),
  },
  {
    id: 11,
    title: "Texaco Project",
    company: "Texaco",
    text: (
      <p>
        Rewrote legacy FORTRAN code to work with the inputs and outputs of the
        flowcharting software Aspen. Used the results to program EEPROM chips
        for use in refinery control systems. This required rewriting all the
        loops to use a newer syntax and all I had was a dot-matrix printed
        FORTRAN manual to help me. After getting the code working in the
        flowcharting software, we were able to run simulations and adjust the
        inputs to find the optimal solution. We then took that solution and used
        it to program EEPROM chips for use in the refinery's control systems.
      </p>
    ),
  },
];

const Portfolio = () => {
  return (
    <div className="portfolio">
      <h1 className="mb-2 text-2xl">Portfolio</h1>
      <div>
        <h3 className="text-lg">Here are some of the projects I'm proud of:</h3>
        {portfolioData.map((folio) => (
          <div key={`folio-${folio.id}`} className="list-item-bubble my-10 p-5">
            <h5 className="mb-2 text-base font-semibold">
              {folio.title} (<span className="text-sm">{folio.company}</span>)
            </h5>
            {folio.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;

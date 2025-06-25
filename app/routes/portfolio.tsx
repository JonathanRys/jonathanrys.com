import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { ReactNode } from "react";

export const meta: MetaFunction = () => {
  return {
    title: "Portfolio",
  };
};

type Portfolio = {
  id: number;
  title: string;
  company: string;
  year?: string;
  text: ReactNode;
};

const portfolioData: Portfolio[] = [
  // {
  //   id: 21,
  //   title: "LeetCode",
  //   company: "",
  //   text: (
  //     <>
  //       <p>
  //         I decided to try to level up some of my coding skills by practicing on
  //         LeetCode and I surprised myself by getting "Beats 100%" for speed on
  //         an easy, but popular, question. So I tried something a bit harder and
  //         found a medium-level question where I did the same. But LeetCode
  //         scores in buckets and so maybe those scores weren't that impressive
  //         and it was only a medium-level problem (although I didn't see another
  //         solution posted that I liked better).
  //       </p>
  //       <img
  //         src="/_static/tech/Leetcode_matrix_queries.png"
  //         alt="2718. Sum of matrix after queries - 152ms 78.31MB"
  //       ></img>
  //       <p>
  //         That night, as I was trying to fall asleep, I realized that there were
  //         still some inefficiencies with my code. So the next day, I came back
  //         and cut that time in half (I guess, maybe? LeetCode runtimes are
  //         pretty random) but I also got in the 100% bucket for memory usage too:
  //       </p>
  //       <img
  //         src="/_static/tech/Leetcode_matrix_queries_2.png"
  //         alt="76ms 73.64MB"
  //       ></img>
  //       <p>
  //         <span className="bold">My Solution</span>: I realized that I didn't
  //         need to track every change to the matrix and that I was rewriting the
  //         same elements over and over. So if I ran the data backwards, I
  //         wouldn't need to overwrite any elements that already contained a
  //         value.
  //       </p>
  //     </>
  //   ),
  // },
  {
    id: 20,
    title: "HealthVision",
    company: "HDAI",
    text: (
      <>
        <p>
          I worked on all aspects of this application which is available in
          hospitals throughout the country (inside Epic). This application
          allows physicians and nurses to gain valuable insights into their
          patients' medical history using data science and AI tools. We ingest
          healthcare data from BCDA, FHIR, and HL7 messages, parse that data and
          align records across patients to create patient profile data that we
          store in MongoDB. The frontend application calls our APIs written in
          NestJS and our backend is allowed via AWS to communicate with MongoDB
          Atlas and send the result to the frontend for presentation.
        </p>
        <p>
          This application allows users to sort and filter patient or encounter
          data based on various criteria and has some search capabilities as
          well. There is a portal to use an AI assistant to search patient notes
          and extract useful information about the patient easily. And export
          functionality that allows users to export data as a CSV. The AI team
          has various models that give predictions about these patients so users
          can sort by the prediction results by various statistical methods.
        </p>
      </>
    ),
  },
  {
    id: 19,
    title: "PhysGPT",
    company: "Private Investor",
    text: (
      <>
        <p>
          This project ingested millions of vectors of data from over 5000 PDFs
          (some 100,000 pages long) that were OCRed using Tessaract, split into
          one paragraph chunks, embedded, and uploaded to Pinecone. When the
          user enters a query via the UI, the query is converted to a vector and
          sent to Pinecone (I also tested this with Milvus but Pinecone was more
          performant and easier than managing my own server). Pinecone then
          takes that vector, finds the top 10 closest (most semantically
          similar) vectors, and returns them. I query MongoDB to get the actual
          text and book metadata then I query the LLM with the text as well as
          an engineered prompt as context to get an AI-generated summary of the
          topic.
        </p>
        <p>
          This was built with FastAPI and React, then Dockerized and pushed to
          ECR. The infrastructure was provisioned on AWS using Terraform. User
          management and account info is stored in DynamoDB, vectors are stored
          in Pinecone, and text and metadata in MongoDB.
        </p>
        Some of the more challenging bits about this project were:
        <h5 className="text-md mt-4 font-bold">
          Extracting meaningful text from PDFs
        </h5>
        <p>
          Tesseract was useful but setting the correct page segmentation mode
          was important for getting good results. The best page segmentation
          mode greatly depended on the text and there are things like image
          captions that would be better to keep with their associated images
          than pulled into the body mid-paragraph. I tried Scibeam parser and a
          few other solutions but none of them really worked for all my
          documents and I didn't want to pay for a solution like
          unstructured.oi. I'm currently working on a solution of my own for
          this sort of thing.
        </p>
        <h5 className="text-md mt-4 font-bold">
          Splitting text into one paragraph chunks
        </h5>
        <p>
          This was a little bit more challenging than it appeared at first
          glance. I know there are tools like Langchain out there, but I didn't
          really think it offered me much and I wanted more control over the
          process. I didn't like the idea of overlapping my text chunks because
          it meant more tokens and it means you're getting multiple matches for
          the same piece of text so I looked into other options. Text tiling
          seems like a promising solution and it may be where I end up, but for
          now, I wrote my own code to split paragraphs based on where the OCR
          split things and it seems to work well enough.
        </p>
      </>
    ),
  },
  {
    id: 18,
    title: "Personal website - jonathanrys.com",
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
        those; I chose black, white and gray. I'm not really much of a designer,
        but I can quickly build complex, pixel-perfect UIs.
      </p>
    ),
  },
  {
    id: 17,
    title: "Queuing system",
    company: "BetterLesson",
    text: (
      <p>
        I took over ownership of the queuing system and the associated webhooks.
        I managed setting up and configuring a FIFO queue as well as dead-letter
        queues. This was built in AWS Lambda(Python) and SQS. The queuing system
        handled webhook calls from Zoom and Salesforce and updated our app and
        data warehouse whenever a data source changed. This project was
        challenging because all of the functions had to be idempotent for this
        to work properly.
      </p>
    ),
  },
  {
    id: 15,
    title: "Random search results",
    company: "BetterLesson",
    text: (
      <p>
        I was tasked with returning random articles from our collection of
        articles in ElasticSearch when searching without any search term
        entered. We wanted teachers to be able to save and share their search
        results and we also wanted the results to be relevant to the user so I
        used a gaussian decay function to match articles on the grades the
        teacher taught and created a gradient to group related subjects. Then I
        used a salt in the url as a random seed to allow users to save and share
        their randomized search results.
      </p>
    ),
  },
  {
    id: 14,
    title: "Coaching Platform",
    company: "BetterLesson",
    text: (
      <>
        <p>
          I worked on various features of our interactive coaching platform,
          from video integration with Zoom to user management consoles. This
          application was built with Flask and React and pulled data from Zoom,
          Salesforce, CoachBase(our data warehouse), and MySQL together to allow
          teachers and their coaches to lay out a learning plan, share
          milestones and feedback, schedule recurring meetings and event series,
          and share video clips from meetings all within our platform.
        </p>
      </>
    ),
  },
  {
    id: 13,
    title: "Python 3 Upgrade",
    company: "BetterLesson",
    text: (
      <p>
        I led the upgrade of our servers in all environments from Python 2.7 to
        Python 3.6 and updated the encoding and collation of character-based
        columns in MySQL from latin1 to utf8mb4. Upgraded libraries, updated
        syntax, fixed circular imports, and removed old code. Python 2.7 had
        become unusable for us as pip stopped supporting Python 2.7. The details
        of that endeavor are captured{" "}
        <Link
          className="hyperlink"
          to="https://stackoverflow.com/questions/68382662/how-to-install-pip-on-python-2-7-in-2021/"
        >
          in this Stack Overflow post
        </Link>
        .
      </p>
    ),
  },
  {
    id: 12,
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
    id: 11,
    title: "Structural Analysis Tool",
    company: "American Tower",
    text: (
      <p>
        I wrote C++ code for the structural analysis software used to test the
        integrity of tower designs and to identify failure points within the
        structures so that bracing could be added to support proposed loads. No
        other structural design software met American Tower's costs and needs at
        the time so they built and maintained their own.
      </p>
    ),
  },
  {
    id: 10,
    title: "Arduino project for my parents",
    company: "Mom & Dad",
    text: (
      <p>
        I wrote Arduino C++ code to control the lights on the stairs at my
        parent's house using motion sensors. This required using a priority
        queue so that someone triggering one set of lights doesn't affect
        another set of previously triggered lights.
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
    id: 8,
    title: "Digits",
    company: "Pearson",
    text: (
      <p>
        This was a digital learning platform that I helped work on. It was built
        with HTML, CSS, MathML, and Javascript. This was my first time working
        with responsive/adaptive design in the workplace.
      </p>
    ),
  },
  {
    id: 4,
    title: "Personal projects",
    company: "",
    text: (
      <>
        <p>
          I built a personal site using Adobe Dreamweaver because I was doubtful
          in my abilities to create a cross-browser compatible nested menu
          system on my own and I wanted to see how their system worked. I ended
          up adapting their code to my needs and taking control back from the
          design software, but it was a great starting point.
        </p>
        <p>
          I built an H.P. Lovecraft-inspired Necronomicon text-based video game
          in C with some basic animated graphics on the splash screen. This was
          nothing special, but took a considerable about of skill to write in C.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "Various projects",
    company: "",
    text: (
      <>
        <p>
          Along with the many personal projects and school assignments I worked
          on, I worked as a consultant for{" "}
          <Link className="hyperlink" to="https://www.wesslingarchitects.com/">
            Steven J. Wessling Architects
          </Link>{" "}
          doing mostly networking and systems work. I also did various database,
          data science and web development work for various other companies
          including:{" "}
          <Link className="hyperlink" to="https://lifecyclepro.com">
            Lifecycle
          </Link>
          , Cambridge Lights, and{" "}
          <Link className="hyperlink" to="https://www.intelligentlabor.com/">
            Intelligent Labor and Moving
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: 1,
    title: "Texaco Project",
    company: "Texaco",
    year: "1994",
    text: (
      <p>
        I rewrote some legacy FORTRAN code that calculated the results of Cumene
        reactions to work with the inputs and outputs of the flowcharting
        software Aspen for my father. We used the results to program EEPROM
        chips for use in refinery control systems. This required rewriting all
        the loops to use a newer syntax as well as some other syntax changes and
        all I had was a dot-matrix printed FORTRAN manual to help me. After
        getting the code working in the flowcharting software, we were able to
        run simulations and adjust the inputs to find the optimal solution. We
        then took that solution and used it to program EEPROM chips for use in
        the refinery's control systems saving them more than $1M per year.
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
              {folio.title}{" "}
              {folio.company && (
                <span className="text-sm">({folio.company})</span>
              )}
            </h5>
            {folio.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;

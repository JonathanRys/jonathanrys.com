import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "Portfolio",
  };
};

const Portfolio = () => {
  return (
    <div className="portfolio">
      <h1 className="mb-2 text-2xl">Portfolio</h1>
      <div>
        <h3 className="text-lg">Here are some projects I'm proud of:</h3>
        <h5 className="mt-5 mb-2 text-base font-semibold">HealthVision</h5>
        <p>
          Improved developer experience and worked on all aspects of the
          application available through Epic. This app allows physicians and
          nurses to gain valuable insights in to their patients medical history
          using data science and AI tools.
        </p>
        <h5 className="mt-5 mb-2 text-base font-semibold">PhysGPT</h5>
        <p>
          This project ingested millions of vectors of data from over 5000 PDFs
          that were OCRed, split into chunks, embedded, and uploaded to
          Pinecone. The vectors were then queried and fed to Chat GPT to answer
          questions about physics for a group of mad scientists. This was built
          with FastAPI and React then provisioned on AWS using Terraform.{" "}
        </p>
        <h5 className="mt-5 mb-2 text-base font-semibold">jonathan.rys.com</h5>
        <p>I built this site using ReMix.</p>
        <h5 className="mt-5 mb-2 text-base font-semibold">Queuing system</h5>
        <p>
          Took ownership of the queuing system and managed setting up a FIFO
          queue as well as dead-letter queues. This was build in Python and SQS.
        </p>
        <h5 className="mt-5 mb-2 text-base font-semibold">
          BetterLesson web site
        </h5>
        <p>
          Worked on various features of our interactive coaching platform, from
          video integration with Zoom to user management consoles. This was
          Built on Flask and React.
        </p>
        <h5 className="mt-5 mb-2 text-base font-semibold">Python 3 Upgrade</h5>
        <p>
          Led the upgrade of our servers in all environments from Python 2.7 to
          Python 3.6
        </p>
        <h5 className="mt-5 mb-2 text-base font-semibold">OnSite</h5>
        <p>
          This was an app to help technicians take inventory of the equipment on
          cell phone towers. The app needed to be available offline so they
          could upload the data when they returned to their homes. This app was
          built with jQuery, CSS, and HTML.
        </p>
        <h5 className="mt-5 mb-2 text-base font-semibold">Digits</h5>
        <p>
          This was a digital learning platform that I helped work on. It was
          built with HTML, CSS, MathML, and Javascript.
        </p>
      </div>
    </div>
  );
};

export default Portfolio;

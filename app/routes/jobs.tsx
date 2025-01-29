import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return {
    title: "Work Experience",
  };
};

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Sr. Software Engineer",
      companyName: "Health Data Analytics Institute",
      companyLogo: "/_static/logos/hdai_logo1.png",
      location: "Dedham, MA",
      startDate: "2023",
      endDate: "present",
      description:
        "Worked with NestJS, React, React Query, and TypeScript to build APIs and application features.  Helped with the configuration and rollout of a new testing initiative using Playwright.  Migrated the frontend unit testing framework from Jest to Vitest.  Created database diagrams for the frontend teams.  Wrote documentation, participated in story design, helped design new DB tables.  Performed code reviews, mentored junior developers, helped define coding standards, etc.  Led the upgrade of Node, React, Typescript, ESlint, and numerous other libraries.  Configured Vite/Rollup, ESLint, Typescript, and node.  Aligned the configuration systems between the front and back end.  Significantly reduced time spent starting the app locally and switching environments.  Moved the backend app to a containerized deployment with Docker to be deployed to ECS.  Set up GitHub actions to build and deploy both the backend(ECR) and the frontend(S3) of the app.",
    },
    {
      id: 2,
      title: "Lead Software Engineer",
      companyName: "Self-employed",
      companyLogo: "",
      location: "Remote",
      startDate: "2023",
      endDate: "2023",
      description:
        "Ingested data from a collection of several thousand PDFs producing millions of vectors.  Split the data into chunks based on token count because the token limit restriction prevented effective texttiling.  I’m looking into building a hybrid solution.  Applied NLP techniques using nltk.  Created vector embeddings from the text chunks and saved them in Pinecone/Milvus.  Built a RAG-based GPT chatbot using the data in the vector DB for semantic search, then provided that result as context to the generative language model to create a summary about the topic.  Developed and deployed the architecture around these systems to AWS using terraform.  Created mockups in Balsamiq and used Trello for project management.",
    },
    {
      id: 3,
      title: "Sr. Software Engineer",
      companyName: "BetterLesson",
      companyLogo: "/_static/logos/BL-Logo-Inline.svg",
      location: "Cambridge, MA",
      startDate: "2018",
      endDate: "2021",
      description:
        "Used Git and Jira, daily for project management. Used Python and Flask in tandem with SQLAlchemy to bring data to the front-end.  Used ElasticSearch, Alembic/MySQL, PostgreSQL, Quickbase, and Salesforce to store and retrieve data. Used JavaScript and React to build Front-end UIs.  Lead the adoption of automated testing using Jest, Enzyme and RTL. Implemented code-quality standards using ES-lint and Pylint in our CI/CD pipeline. Configured webpack. Used serverless to test AWS lambdas locally.  Set up systems involving webhooks, AWS lambdas, S3 and supervisor processes to poll SQS to collect messages added by the lambda. Used packer to build a new Docker container for our local environments to facilitate a Python3 upgrade.  Built and deployed new Linux servers using packer and Terraform. Used the AWS Console to manage our systems.  Configured NginX for local routing and proxying.  Set up and polled standard, FIFO, and dead-letter queues in SQS.",
    },
    {
      id: 4,
      title: "Software Engineer",
      companyName: "American Tower",
      companyLogo: "/_static/logos/atc_logo.png",
      location: "Woburn, MA",
      startDate: "2015",
      endDate: "2018",
      description:
        "Built enterprise applications using HTML5, CSS3, JavaScript and ES6. While there I used node.js and Express.js to expose REST services which supply data from Oracle or MSSQL to the front-end as JSON.  Used React, npm, webpack, etc. to build single-page apps with authentication and authorization that consume data from REST services. Also used many packages from npm including socket.io, reactstrap, babel, axios and Sass.  Configured build automation using CircleCI, Travis CI and Jenkins. Built several responsive, dynamic widgets for the _static web site including some using the Google Maps API.  Taught design patterns, lead code reviews and gave presentations on React, npm, webpack, Git, and Redux.  Used HOCs, currying and composition to refactor code to make it more modular and maintainable.",
    },
    {
      id: 5,
      title: "Web Developer",
      companyName: "Pearson Inc.",
      companyLogo: "/_static/logos/pearson_logo_white_bg.png",
      location: "Boston, MA",
      startDate: "2012",
      endDate: "2015",
      description:
        "Employed HTML5, XML, CSS3, JavaScript, jQuery, and Bootstrap to build and modify responsive web-pages in Backbone for both distributed content and internal use. Used object-oriented JavaScript in Google AppScripts with JSON objects and various APIs to automate Google sheets. Wrote UNIX shell-scripts to sort and manage files, and Perl scripts to parse documents and extract text.  Responsible for dynamically creating data used to link PDF, image, and video files to create various digital products containing 35,000+ files. Used Documentum for content management.",
    },
  ];

  return (
    <>
      <h1 className="text-2xl">Work Experience</h1>
      <ul>
        {jobs.map((job) => {
          return (
            <li className="list-item-bubble my-10 p-5" key={`job-${job.id}`}>
              <h4 className="py-1">
                <Link
                  className="text-lg font-medium"
                  to={{
                    pathname: `/jobs/${job.id}`,
                    search: "company",
                  }}
                >
                  {job.companyName} - {job.location}
                  {job.companyLogo && (
                    <div className="float-right">
                      <img
                        height={40}
                        width={120}
                        src={job.companyLogo}
                        alt="Company logo"
                      />
                    </div>
                  )}
                </Link>{" "}
              </h4>
              <div>
                <span className="font-bold">{job.title}</span> ({job.startDate}{" "}
                - {job.endDate}): {job.description}
              </div>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </>
  );
};

export default Jobs;

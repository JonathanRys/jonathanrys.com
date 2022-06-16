import { Link, Outlet, useLoaderData } from '@remix-run/react';

export const loader = () => {
  const data = {
    jobs: [
      {
        id: 1,
        title: 'Sr. Software Engineer',
        companyName: 'BetterLesson',
        location: 'Cambridge, MA',
        startDate: '2018',
        endDate: '2021',
        description: 'Used Git and Jira, daily for project management. Used Python and Flask in tandem with SQLAlchemy to bring data to the front-end.  Used ElasticSearch, Alembic/MySQL, PostgreSQL, Quickbase, and Salesforce to store and retrieve data. Used JavaScript and React to build Front-end UIs.  Lead the adoption of automated testing using Jest, Enzyme and RTL. Implemented code-quality standards using ES-lint and Pylint in our CI/CD pipeline. Configured webpack. Used serverless to test AWS lambdas locally.  Set up systems involving webhooks, AWS lambdas, S3 and supervisor processes to poll SQS to collect messages added by the lambda. Used packer to build a new Docker container for our local environments to facilitate a Python3 upgrade.  Built and deployed new Linux servers using packer and Terraform. Used the AWS Console to manage our systems.  Configured NginX for local routing and proxying.  Set up and polled standard, FIFO, and dead-letter queues in SQS.'
      },
      {
        id: 2,
        title: 'Software Engineer',
        companyName: 'American Tower',
        location: 'Woburn, MA',
        startDate: '2015',
        endDate: '2018',
        description: 'Built enterprise applications using HTML5, CSS3, JavaScript and ES6. While there I used node.js and Express.js to expose REST services which supply data from Oracle or MSSQL to the front-end as JSON.  Used React, npm, webpack, etc. to build single-page apps with authentication and authorization that consume data from REST services. Also used many packages from npm including socket.io, reactstrap, babel, axios and Sass.  Configured build automation using CircleCI, Travis CI and Jenkins. Built several responsive, dynamic widgets for the public web site including some using the Google Maps API.  Taught design patterns, lead code reviews and gave presentations on React, npm, webpack, Git, and Redux.  Used HOCs, currying and composition to refactor code to make it more modular and maintainable.'
      },
      {
        id: 3,
        title: 'Web Developer',
        companyName: 'Pearson Inc.',
        location: 'Boston, MA',
        startDate: '2012',
        endDate: '2015',
        description: 'Employed HTML5, XML, CSS3, JavaScript, jQuery, and Bootstrap to build and modify responsive web-pages in Backbone for both distributed content and internal use. Used object-oriented JavaScript in Google AppScripts with JSON objects and various APIs to automate Google sheets. Wrote UNIX shell-scripts to sort and manage files, and Perl scripts to parse documents and extract text.  Responsible for dynamically creating data used to link PDF, image, and video files to create various digital products containing 35,000+ files.'
      },
    ]
  };

  return data;
};

interface Job {
  id: number,
  title: string,
  companyName: string,
  location: string,
  startDate: string,
  endDate: string,
  description: string
}

const Jobs = () => {    
    const { jobs } = useLoaderData();

    return (
      <>
        <h1 className="text-xl">Work Experience</h1>
        <ul>
          {
            jobs.map( (job: Job) => {
              return (
                <li className="my-10 p-5 rounded-md bg-zinc-200" key={`job-${job.id}` }>
                    <h4 className="py-1">
                      <Link className="font-medium text-lg" to={{
                        pathname: `/jobs/${job.id}`,
                        search: 'company'
                      }}>{ job.companyName }</Link> - { job.location }
                    </h4>
                    <div>
                      <span className="font-bold">{ job.title }</span> ({ job.startDate } - { job.endDate }): { job.description }
                    </div>
                </li>
              );
            })
          }            
        </ul>
        <Outlet />
      </>
    );
};

export default Jobs;

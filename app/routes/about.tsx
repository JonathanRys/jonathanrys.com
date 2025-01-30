import dayjs from "dayjs";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return {
    title: "About Jonathan",
  };
};

const vegStart = dayjs("2008-10-15");
const veganStart = dayjs("2015-10-15");
const now = dayjs();

const About = () => {
  const data = [
    {
      id: 1,
      title: "Interests",
      text: `I enjoy studying science and mathematics of all kinds.  I've been vegan for ${now.diff(
        veganStart,
        "years"
      )} years and vegetarian for ${now.diff(
        vegStart,
        "years"
      )}.  I love hiking and camping any time of year and have hiked all 48 of the 4000-footers in NH in all 4 seasons.`,
    },
    {
      id: 2,
      title: "Hobbies",
      text: "Hiking, Rock/Ice Climbing, Kayaking, Cooking, Foraging, Microscopy, Physics, Speed cubing",
    },
    // {
    //   id: 3,
    //   title: "Who I am",
    //   text: (
    //     <>
    //       <p>
    //         I work hard, have good work ethic, I'm rarely sick, and show up on
    //         time every day. I'm not particularly humble but it's difficult when
    //         I've worked with people with a masters degree or PhD in computer
    //         science who don't know how to design and build a scalable,
    //         maintainable, well-tested software system. I never liked doing
    //         homework, but always got 100% on my tests. I learn fast, I move
    //         fast, and I don't break things.
    //       </p>
    //       <p>
    //         I don't reach out for endorsements or try to earn certifications or
    //         generally spend a lot of time on things that don't build knowledge.
    //         I took a Scrum Master certification course and had the whole study
    //         guide memorized, but never bothered to take the open book exam
    //         because I already knew I could ace it.  I push myself to learn new things and
    //       </p>
    //     </>
    //   ),
    // },
    {
      id: 4,
      title: "Career history",
      text: (
        <>
          <p>
            I've lived in the Boston area my whole life. I learned to use a
            computer so I could play video games at a very young age. I remember
            using DOS 3.0 on a 16 GHz machine and booting from a floppy disk to
            play Zork, King's Quest, and Hitchhiker's Guide to the Galaxy. I
            learned how to use a command line and write batch files. I also set
            up TCP/IP and NetBEUI networks for playing Warcraft, Command &
            Conquer, and other early multiplayer games.
          </p>
          <p>
            I learned BASIC in High school and I taught myself C to write an
            H.P. Lovecraft-inspired, text-based video game with some animated
            graphics. Then I helped my father to rewrite some FORTRAN code that
            calculated the reactions in the gasoline blending process and used
            the results to program EEPROM chips for refineries. I took a
            VisualBASIC course at Northeastern University and got a 4.0. My
            father also showed me how to work with data in Excel and MSAccess
            and I had to take a course on it in college, but I don't remember
            learning anything from that course.
          </p>
          <p>
            I started going to college for computer science but got a job doing
            tech support for Microsoft Windows NT Server where we went through a
            month of training that made the school seem easy, so I started to
            follow an MCSE certification route while working there. So I studied
            and read the top engineering books and found work with various
            companies while studying. Major universities were making their
            course syllabi available online and so I bought the books and
            followed the syllabi as a guide as to what I should learn and
            studied those subjects more deeply than many of the students going
            to those classes. After watching some lectures, I don't think a lot
            of the teachers even understood what those books were saying in the
            first place.
          </p>
          <p>
            Then I crashed my car, got stranded, and came home the next day to
            my house burned down. I didn't own a cell phone at this point so it
            was a difficult time. Then the dot-com bubble burst and there really
            wasn't really a lot of work for someone without a foot in the door
            and no degree or certification. So I worked doing carpentry and
            electrical work on the new house. I continued doing this for long
            enough to learn how to fix a house on my own. Then I helped a friend
            start a couple of companies before getting married.
          </p>
          <p>
            After getting married, I started going back to school. But then, my
            wife lost her job and I had to find work. That's when I found a job
            as a contractor at Pearson where I used VBA to automate their
            spreadsheets, I fixed the visual formatting of their product by
            using MathML properly, and I wrote Perl scripts to take an input
            structure and a collection of files and then move 35,000 files into
            that structure to package their online product. This got them to
            hire me as a direct employee building webpages some of which were
            using the MVC pattern in BackboneJS.
          </p>
          <p>
            I started building web apps of my own using Angular 1.3, but then
            everything about Angular changed, so I learned React instead. Please
            visit my <Link to="/portfolio">portfolio</Link> and{" "}
            <Link to="/jobs">job history</Link> for more details and the rest of
            my story.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <h1 className="mb-2 text-2xl">About Me</h1>
      <ul>
        {data.map((item) => (
          <li key={`about-${item.id}`} className="list-item-bubble my-10 p-5">
            <h5 className="mb-2 text-base font-semibold">{item.title}</h5>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default About;

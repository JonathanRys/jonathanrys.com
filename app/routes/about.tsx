import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "About Jonathan",
  };
};

const About = () => {
  const data = [
    {
      id: 1,
      title: "Interests",
      text: `I enjoy studying science and mathematics of all kinds.  I've been vegan for ${9} years and vegetarian for ${20}.`, // @todo: make this dynamic 10/15/15
    },
    {
      id: 2,
      title: "Hobbies",
      text: "Hiking, Rock/Ice Climbing, Kayaking, Cooking, Foraging, Mycology, Speed cubing",
    },
    {
      id: 3,
      title: "About Me",
      text: "I've lived in the Boston area my whole life. I learned to use a computer so I could play video games at a very young age.  I remember using DOS 3.0 on a 16 GHz machine.  I learned BASIC in High school and I taught myself C and wrote a text-based video game with some animated graphics.  Then one summer I helped my father to rewrite some FORTRAN code and used the results to program EEPROM chips.  This got me excited about a career in computer science.",
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

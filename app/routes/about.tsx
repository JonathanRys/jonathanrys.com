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
      text: "Hiking, Rock Climbing, Kayaking, Cooking, Foraging, Mycology, Speed cubing",
    },
  ];

  return (
    <>
      <h1 className="mb-2 text-xl">About Me</h1>
      <ul>
        {data.map((item) => (
          <li key={`about-${item.id}`}>
            <div className="my-2">
              <h3 className="font-bold">{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default About;

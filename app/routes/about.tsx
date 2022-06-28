import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return {
    title: "About Jonathan",
  };
};

const About = () => {
  const data = [
    {
      id: 1,
      title: 'Interests',
      text: 'I enjoy science of all kinds.  I\'m vegan.'
    }, {
      id: 2,
      title: 'Hobbies',
      text: 'Hiking, Cooking, Foraging, Mycology, Skateboarding'
    }
  ];

  return (
    <>
      <h1 className="text-xl mb-2">About Me</h1>
      <ul>
        {
          data.map((item) => (
            <li key={ `about-${item.id}` }>
              <div className="my-2">
                <h3 className="font-bold">{ item.title }</h3>
                <p>{ item.text }</p>
              </div>
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default About;

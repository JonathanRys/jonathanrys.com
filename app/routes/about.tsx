const data = [
  {
    id: 1,
    title: 'Interests',
    text: 'I enjoy science of all kinds.  I\'m vegan.'
  }, {
    id: 2,
    title: 'Hobbies',
    text: 'Skateboarding, Hiking, Cooking, Foraging, Mycology'
  }
];

const About = () => {
  return (
    <>
      <h1 className="text-xl mb-2">About Me</h1>
      <ul>
        {
          data.map((item) => (
            <li key={ `about-${item.id}` }>
              <div className="my-2">
                <h4 className="font-bold">{ item.title }</h4>
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

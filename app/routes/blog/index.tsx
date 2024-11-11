// import { Outlet } from "@remix-run/react";

const articles = [
  {
    id: 1,
    title: "Agile",
    subTitle: "Myths and misunderstandings",
    summary:
      "Agile is one of the most widely used and widely misunderstood frameworks out there. Let's try to clear things up.",
    link: "/blog/agile",
  },
  {
    id: 2,
    title: "CSS and JS",
    subTitle: "Star-crossed lovers",
    summary:
      "CSS was not designed with JS in mind.  JS was not designed with CSS in mind.  Should we try to mix the two?",
    link: "/blog/css-and-js",
  },
  {
    id: 3,
    title: "Testing",
    subTitle: "When to test, what to test, and how to test",
    summary:
      "Should we write unit tests or e2e tests?  How much coverage is too much coverage?",
    link: "/blog/testing",
  },
  {
    id: 4,
    title: "Bugs",
    subTitle: "Where they come from and how to keep them out",
    summary:
      "Bugs don't just appear out of nowhere.  We create them by giving them good places to form, by not testing properly, and by not having the processes in place to prevent them from recurring.",
    link: "/blog/bugs",
  },
  {
    id: 5,
    title: "Functional Programming Paradigms",
    subTitle: "From group theory to type systems",
    summary:
      "A brief overview of the functional programming landscape and why it makes sense.  Explore concepts like the Y-combinator, Monads, Options, and Eithers",
    link: "/blog/functional-programming",
  },
];

const Blog = () => {
  return (
    <div>
      <h1 className="text-2xl">Blog Posts</h1>
      {articles.map((article) => (
        <div
          key={`blog-article-${article.id}`}
          className="list-item-bubble my-10 p-5"
        >
          <div className="mb-2 flex items-baseline">
            <h1 className="mr-2 text-lg font-bold">{article.title}:</h1>{" "}
            <h2 className="text-base">{article.subTitle}</h2>
          </div>
          {article.summary}
        </div>
      ))}
    </div>
  );
};

export default Blog;

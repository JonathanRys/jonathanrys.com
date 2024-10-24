import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "Portfolio",
  };
};

const Portfolio = () => {
  return (
    <>
      <h1 className="mb-2 text-xl">Portfolio</h1>
      <div>
        <h3>Some projects I'm proud of</h3>
        <h4>PhysGPT</h4>
        <h4>jonathan.rys.com</h4>
        <h4>Queuing system</h4>
        <h4>Python 3 Upgrade</h4>
        <h4>OnSite</h4>
        <h4>Digits</h4>
      </div>
    </>
  );
};

export default Portfolio;

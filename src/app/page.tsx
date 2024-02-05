import fs from "fs";
import Head from "next/head"
import path from 'node:path';
import matter from "gray-matter";
import yaml from "js-yaml";

const homeContentPath = path.join(process.cwd(), "content/home.md");

export type HomeContent = {
  readonly title: string;
  readonly date: string;
  readonly cats: { description: string; name: string }[];
};

async function getData() {
  const fileContents = fs.readFileSync(homeContentPath, "utf8");

  const matterResult = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });

  const home = matterResult.data as HomeContent;

  return home;
};

export default async function Home() {
  const home = await getData();
  return (
    <>
      <Head>
        <script async src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <article>
        <h1>{home.title}</h1>
        <ul>
          {home.cats.map((cat, k) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </article>
    </>
  )
}

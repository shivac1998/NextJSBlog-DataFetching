import { useEffect, useState } from "react";

export default function Fetch({ allPostsData }) {
  return (
    <ul>
      {allPostsData.map(({ userId, title }) => (
        <li key={userId}>
          {userId}
          <br />
          {title}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const allPostsData = await res.json();

  return {
    props: {
      allPostsData,
    },
  };
}

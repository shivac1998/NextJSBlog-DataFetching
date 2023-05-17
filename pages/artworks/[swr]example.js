import Link from "next/link";
import useSWR from "swr";

const ArtworkDetails = ({ searchTerm }) => {
  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Could not retrieve artwork");
    }
    const data = await res.json();
    return data.data.length > 0 ? data.data[0] : null;
  };

  const { data: artwork, error } = useSWR(
    `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`,
    fetcher
  );

  if (error) {
    console.error(error);
    return (
      <div>
        <p>Error occurred during data fetching</p>
        <div>
          <Link href="/">Return Home</Link>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div>
        <p>Artwork not found</p>
        <div>
          <Link href="/">Return Home</Link>
        </div>
        <div>
          <Link href="/artwork">Search for more artwork</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>{artwork.title}</h1>
      <h2>ID: {artwork.id}</h2>
      <h2>Score: {artwork._score}</h2>
      <div>
        <Link href="/">Return Home</Link>
      </div>
      <div>
        <Link href="/artwork">Search for more artwork</Link>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const searchTerm = context.query.art;
  return {
    props: {
      searchTerm,
    },
  };
}

export default ArtworkDetails;

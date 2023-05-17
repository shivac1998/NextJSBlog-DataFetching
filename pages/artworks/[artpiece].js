import { useRouter } from "next/router";
import Link from "next/link";

export async function getServerSideProps(context) {
  const searchTerm = context.query.artpiece; // Get the dynamic parameter from the URL

  try {
    const res = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`
    );
    if (!res.ok) {
      throw new Error("Could not retrieve artwork");
    }

    const data = await res.json();
    if (data.data.length > 0) {
      return {
        props: {
          artwork: data.data[0],
        },
      };
    } else {
      return {
        props: {
          artwork: null, // Artwork not found
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        artwork: null, // Error occurred during data fetching
      },
    };
  }
}

const ArtworkDetails = ({ artwork }) => {
  if (!artwork) {
    return (
      <div>
        <p>Artwork not found</p>
        <div>
          <Link href="/">Return Home</Link>
        </div>
        <div>
          <Link href="/artworks">Search for more artwork</Link>
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
        <Link href="/artworks">Search for more artwork</Link>
      </div>
    </div>
  );
};

export default ArtworkDetails;

import { useRouter } from "next/router";
import Link from "next/link";

const ArtworkDetail = ({ artwork }) => {
  const router = useRouter();
  const { art } = router.query; // Get the dynamic parameter from the URL

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
      <p>ID: {artwork.id}</p>
      <p>Score: {artwork._score}</p>
      {/* Add more artwork details as needed */}
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
  const searchTerm = context.query.art; // Get the dynamic parameter from the URL

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
          artwork: data.data[0], // Get the first artwork
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

export default ArtworkDetail;

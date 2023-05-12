import React, { useEffect, useState } from "react";
import Link from "next/link";

const Artwork = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`
        );
        if (!res.ok) {
          throw new Error("Could not retrieve artwork");
        }

        const data = await res.json();
        if (data.data.length > 0) {
          setArtwork(data.data[0]); // Get the first artwork
        } else {
          setArtwork(null); // Artwork not found
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm) {
      fetchArtwork();
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      // Redirect to the dynamic art page with the search term as the parameter
      window.location.href = `/artwork/${searchTerm}`;
    }
  };

  return (
    <div>
      <h1>Artwork Information</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          // value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter artwork title"
        />
        <button type="submit">Search</button>
      </form>
      {artwork ? (
        <div>
          <ul>
            <li>Title: {artwork.title}</li>
            <li>Link: {artwork.api_link}</li>
            <li>Score: {artwork._score}</li>
            <li>Date: {artwork.date_display}</li>
            <li>Artist: {artwork.artist_display}</li>
          </ul>
          <Link href="/">Return Home</Link>
        </div>
      ) : (
        <div>
          <p>No artwork under this title was found</p>
          <Link href="/">Return Home</Link>
        </div>
      )}
    </div>
  );
};

export default Artwork;

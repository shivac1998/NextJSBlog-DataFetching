import { useRouter } from "next/router";

const Account = () => {
  const router = useRouter();
  const { searchQuery } = router.query;
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`account/${e.target.search.value}`);
  };

  const fetchResults = async () => {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/search?q=${searchQuery}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Account;


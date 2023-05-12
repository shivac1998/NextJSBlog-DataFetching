import { useEffect, useState } from "react";
import { loadAccount } from "../../lib/accountFetch";
import Link from "next/link";
import Account from "../account";
import { useRouter } from "next/router";
import { getAccountId } from "../../lib/fetch";

export default function Accounts() {
  const [accountData, setAccountData] = useState(null);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`${e.target.search.value}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadAccount();
      setAccountData(data);
    };

    fetchData();
  }, []);



  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="search" />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div>
        {accountData ? (
          <pre>{JSON.stringify(accountData, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}

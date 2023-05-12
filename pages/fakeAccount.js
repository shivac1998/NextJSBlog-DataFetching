import { getAccountId } from "../lib/fetch";

export async function getStaticProps() {
  const accountData = getAccountId();
  return {
    props: {
      accountData,
    },
  };
}

export default function fakeAccount() {
  <ul>
    {accountData.map(({ id, createdOn }) => (
      <li>
        {id}
        <br />
        {createdOn}
      </li>
    ))}
  </ul>;
}

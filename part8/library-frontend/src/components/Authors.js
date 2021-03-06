import React from "react";
import { useQuery, gql } from "@apollo/client";
import BirthyearForm  from "./BirthyearForm";
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return (
      <div>
        <p>fetching authors from server</p>
      </div>
    );
  }

  const authors = result.data.allAuthors;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthyearForm authors={authors} />
    </div>
  );
};

export default Authors;

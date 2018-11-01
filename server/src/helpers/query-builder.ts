import { SQLStatement } from "sql-template-strings";

export default (query: SQLStatement, ...appendees: SQLStatement[]) => {
  return appendees.reduce((acc: SQLStatement, str: SQLStatement) => {
    return acc.append(str);
  }, query);
};

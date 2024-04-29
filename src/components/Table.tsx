/* eslint-disable @typescript-eslint/no-unused-vars */
import numeral from "numeral";

const Table = ({
  countries,
}: {
  countries: { flag: string; country: string; cases: number }[];
}) => {
  return (
    <table className="w-auto">
      <thead>
        <tr className="border-b-2 border-gray-300">
          <th className="px-4 py-2 text-left">Country</th>
          <th className="px-4 py-2 text-right">Cases</th>
        </tr>
      </thead>
      <tbody>
        {countries.map(({ flag, country, cases }, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
          >
            <td className="px-4 py-2">{country}</td>
            <td className="px-4 py-2 text-right">
              <strong>{numeral(cases).format("0,0")}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

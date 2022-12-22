import { useEffect, useState } from "react";
import { useReadCypher } from "use-neo4j";

export const App: React.FC = () => {
  const [diseases, setDisease] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  const { loading, records, run, error, result } =
    useReadCypher("MATCH (n) RETURN n");

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="error">{error.message}</div>;

  // const itens = result?.records.map((row) => row.get("n"));
  // console.log(itens);

  if (result) {
    const data = result?.records
      .map((row) => row.get("n"))
      .reduce(
        (accumulator, currentValue) => {
          // console.log(currentValue);
          if (currentValue.labels.includes("Symptom")) {
            return {
              ...accumulator,
              symptom: [...accumulator.symptom, currentValue.properties.name],
            };
          } else if (currentValue.labels.includes("Disease")) {
            return {
              ...accumulator,
              disease: [...accumulator.disease, currentValue.properties.name],
            };
          }
          return {};
        },
        {
          symptom: [],
          disease: [],
        }
      );

    // setSymptoms(data.symptom);
    // setDisease(data.disease);

    return (
      <>
        <h1>DATA</h1>
        <div style={{ display: "flex" }}>
          symptom
          <ul>
            {data.symptom.map((s) => (
              <li>{s}</li>
            ))}
          </ul>
          disease
          <ul>
            {data.disease.map((d) => (
              <li>{d}</li>
            ))}
          </ul>
        </div>
      </>
    );
  } else {
    return <div>sem result</div>;
  }

  // useEffect(() => {
  //   setDisease([]);
  // }, []);
};

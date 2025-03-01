import React, { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";

const GraphVisualizer = () => {
  const [data, setData] = useState("");
  const [elements, setElements] = useState([]);

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const parseData = () => {
    const lines = data.trim().split("\n");
    const nodes = new Set();
    const edges = [];

    lines.forEach((line) => {
      const [source, target] = line.split(",").map((item) => item.trim());
      if (source && target) {
        nodes.add(source);
        nodes.add(target);
        edges.push({ data: { id: `${source}-${target}`, source, target } });
      }
    });

    setElements([
      ...Array.from(nodes).map((node) => ({ data: { id: node, label: node } })),
      ...edges,
    ]);
  };

  return (
    <div className="p-4">
      <textarea
        rows="5"
        cols="50"
        value={data}
        onChange={handleInputChange}
        placeholder="Enter data as: DataA, DataB\nExample:\nApple,Fruit\nDog,Animal"
        className="border p-2 w-full"
      ></textarea>
      <button onClick={parseData} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Generate Graph
      </button>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "500px", marginTop: "10px" }}
        layout={{ name: "cose" }}
        stylesheet={[
          {
            selector: "node",
            style: {
              label: "data(label)",
              "background-color": "#3498db",
              color: "white",
              "text-valign": "center",
              "text-halign": "center",
            },
          },
          {
            selector: "edge",
            style: {
              width: 2,
              "line-color": "#ccc",
              "target-arrow-color": "#ccc",
              "target-arrow-shape": "triangle",
            },
          },
        ]}
      />
    </div>
  );
};

export default GraphVisualizer;

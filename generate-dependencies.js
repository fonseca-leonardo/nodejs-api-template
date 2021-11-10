const package = require("./package.json");
const fs = require("fs");

const { dependencies, devDependencies } = package;

const generatedDependencies = [];
const generatedDevDependencies = [];

Object.keys(dependencies).forEach((el, index) => {
  generatedDependencies[index] = {
    ...generatedDependencies[index],
    Nome: el,
  };
});

Object.values(dependencies).forEach((el, index) => {
  generatedDependencies[index] = {
    ...generatedDependencies[index],
    Versão: el,
  };
});

Object.keys(devDependencies).forEach((el, index) => {
  generatedDevDependencies[index] = {
    ...generatedDevDependencies[index],
    Nome: el,
  };
});

Object.values(devDependencies).forEach((el, index) => {
  generatedDevDependencies[index] = {
    ...generatedDevDependencies[index],
    Versão: el,
  };
});

console.log({ generatedDependencies, generatedDevDependencies });

fs.writeFile(
  "./data.json",
  JSON.stringify(generatedDevDependencies),
  { encoding: "utf-8" },
  () => {
    console.log("feito");
  }
);

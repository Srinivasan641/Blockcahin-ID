async function main() {
  console.log("Hello, Hardhat!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

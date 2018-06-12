process.on('unhandledRejection', (err: Error) => {
  /*eslint-disable */
  console.log(err.stack);
  process.exit(1);
  /*eslint-enable */
});

process.on('uncaughtException', exception => {
  /*eslint-disable */
  console.log(exception.stack); // to see your exception details in the console
  process.exit(1);
  /*eslint-enable */
});

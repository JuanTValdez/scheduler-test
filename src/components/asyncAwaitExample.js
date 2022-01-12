async function run() {
  console.log('1. The calm before async');

  try {
    const data = await setTimeoutPromise();

    console.log(`3. Promise Resolved with ${data}`);
  } catch (error) {
    console.log(`3. Promise Rejected with ${error}`);
  }
}

/* We can invoke the async function like any other */
run().then(() => {
  console.log('4. Use Pomises at the top level');
});

/* This prints immediately after run() is called */
console.log('2. Careful, this prints before the timeout is complete');

/*
1. The calm before async
2. Careful, this prints before completing the timeout
3. Promise Resolved with Resolved Data
4. Use Promises at the top level
*/

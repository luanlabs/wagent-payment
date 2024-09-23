const timeout = (waiter: number) => new Promise((resolve) => setTimeout(resolve, waiter));

export default timeout;

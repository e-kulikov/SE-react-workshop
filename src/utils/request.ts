export const request = async <T>(
  ...args: Parameters<typeof fetch>
): Promise<T> => {
  try {
    return fetch(...args).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json() as T
    })
  } catch (err) {
    console.error(err);
    throw err;
  }
};

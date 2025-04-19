export const loadState = () => {
  try {
    return sessionStorage.getItem("userId");
  } catch (err) {
    console.error("Could not load session state", err);
    return undefined;
  }
};

export const saveState = (userId) => {
  try {
    sessionStorage.setItem("userId", userId);
  } catch (err) {
    console.error("Could not save session state", err);
  }
};

export const clearState = () => {
  try {
    sessionStorage.clear();
    // sessionStorage.removeItem("userId");
  } catch (err) {
    console.error("Could not clear session state", err);
  }
};

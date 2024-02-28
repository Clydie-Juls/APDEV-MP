if (!sessionStorage.getItem("tempState")) {
  sessionStorage.setItem(
    "tempState",
    JSON.stringify({
      isLoggedIn: true,
    }),
  );
}

const actualTempState = JSON.parse(sessionStorage.getItem("tempState"));

export const TempState = {
  get(name) {
    return actualTempState[name];
  },

  set(name, value) {
    actualTempState[name] = value;
    sessionStorage.setItem("tempState", JSON.stringify(actualTempState));
  },
};

export let username;

export function isAuth(req, res, next) {
  if (username) {
    next();
  } else {
    res.redirect("/login");
  }
}

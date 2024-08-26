const form = document.querySelector("#formAction");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = window.location.pathname;
  const path = url.split("/")[3];
  const username = form["username"].value;
  const password = form["password"].value;
  const user = {
    username: username,
    password: password,
  };

  if (path === "signup") {
    const confirm = form["password2"].value;

    if (password !== confirm) {
      alert("Mật khẩu xác nhận không trùng khớp");
    } else {
      sessionStorage.setItem("user", JSON.stringify(user));
      alert(`Đã đăng ký thành công tài khoản ${user.username}!`);
      window.location.href = "../login/index.html";
    }
  } else if (path === "login") {
    const userSession = JSON.parse(sessionStorage.getItem("user"));

    if (
      userSession &&
      userSession.username === username &&
      userSession.password === password
    ) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
      alert("Đăng nhập thành công!");
    } else {
      alert("Tài khoản hoặc mật khẩu không đúng");
    }
  }
});

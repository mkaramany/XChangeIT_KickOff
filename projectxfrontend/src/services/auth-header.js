
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const socialLogintoken = localStorage.getItem("accessToken");

  if (user && user.jwt) {
    return {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.jwt,
    };
  } else if (socialLogintoken) {
    return {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + socialLogintoken,
    };
  } else {
    return {};
  }
}

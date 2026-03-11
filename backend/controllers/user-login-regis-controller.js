import loginRegisUser from "../services/auth-service.js";
import { responseFormat } from "../utils/helper.js";
async function loginUser(req, res) {
  console.log(req.body, "test");
  const { email, password } = req.body;
  const result = await loginRegisUser.loginUser(email, password);

  if (!result.success) {
    return res.status(401).json(result);
  }

  res.json(result);

  if (!result) {
    res
      .status(500)
      .json(responseFormat("error", undefined, "User login failed"));
  }

  res
    .status(200)
    .json(responseFormat("success", result, "User logged in successfully"));
}

async function registerUser(req, res) {
  console.log("regis");
  console.log(req.body);
  const { email, password, nama, telepon } = req.body;
  console.log(email, password, nama, telepon);
  const result = await loginRegisUser.registerUser(
    email,
    password,
    nama,
    telepon,
  );
  if (!result)
    res
      .status(500)
      .json(responseFormat("error", null, "User registration failed"));
  res
    .status(201)
    .json(responseFormat("success", result, "User registered successfully"));
}

export default { loginUser, registerUser };

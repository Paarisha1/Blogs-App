import User from "../model/User.js";
import bcrypt from "bcryptjs";
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
    console.log("Users found:", users); // Debug log
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "No Users Found" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error finding user" });
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists! Login instead" });
  }
  const hashedPassword=bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password:hashedPassword,
    blogs:[]
  });

  try {
    await user.save();
    console.log("User saved:", user); // Debug log
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error saving user" });
  }

  return res.status(201).json({ user });
};



export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email }).populate('blogs');
    console.log(existingUser); // Log the user object
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error finding user" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "Couldn't find user with this email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  return res.status(200).json({
    message: "Login Successful",
    user: existingUser // Include blogs in the response
  });
};



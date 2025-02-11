import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error.message);
    throw new Error("Error hashing password");
  }
};

export default hashPassword;
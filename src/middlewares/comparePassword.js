import bcrypt from "bcryptjs";

const comparePassword = async (enteredPassword, storedHash) => {
  try {
    return await bcrypt.compare(enteredPassword, storedHash);
  } catch (error) {
    console.error("Error comparing passwords:", error.message);
    return false;  //* In case of an error, return false
  }
};

export default comparePassword;
import Users from '../modals/Users.js';
import bcrypt from 'bcryptjs';

// Controller to create a new user
export const createUser = async (req, res) => {
  const { lastName, firstName, age, gender, email, password } = req.body;

  try {
    // Hash the password before saving it
    const saltRounds = 10; // You can adjust the salt rounds (higher is more secure but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new Users({ lastName, firstName, age, gender, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};




export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({ email });

    // If no user found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};



const GetUser = async (req, res) => {
  try {
      const courses = await Users.find();  // Using Courses model
      res.status(200).json(courses);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};


export { GetUser };
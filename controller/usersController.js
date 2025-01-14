import Users from '../modals/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
const generateAuthToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY, // Secret key from .env
    { expiresIn: '1h' }
  );
};

export const createUser = async (req, res) => {
  const { lastName, firstName, age, gender, email, password } = req.body;

  try {
     // Check email
     const existingUser = await Users.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ message: 'Email already exists' });
     }
 
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new Users({ lastName, firstName, age, gender, email, password: hashedPassword });
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

    // Generate auth token
    const token = generateAuthToken(user);
    // const token = jwt.sign({ user_id: user.user_id, user_email: user.user_email }, 'your-secret-key', { expiresIn: '1h' });


    res.status(200).json({
      message: 'Login successful',
      token: token,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      gender: user.gender,
      user_role: user.user_role

    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

const GetUser = async (req, res) => {
  try {
    const courses = await Users.find(); 
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export { GetUser };
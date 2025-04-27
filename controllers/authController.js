const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({
      email,
      password: await bcrypt.hash(password, 10),
      role: role || 'user',
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user: user });
  } catch (err) {
    console.log('err', err)
    res.status(500).json({ message: 'Server error', err: err });
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { email, password, role } = req.body;

  try {
    // Find the user to update
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check permissions
    if (req.user.userId !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to update this user' });
    }

    // Prepare update object
    const updateData = {};
    if (email) {
      // Check if new email already exists for another user
      const emailExists = await User.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      updateData.email = email;
    }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    if (role) {
      // Only admins can update roles
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can update roles' });
      }
      updateData.role = role;
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'User updated successfully',
      user: { id: updatedUser._id, email: updatedUser.email, role: updatedUser.role },
    });
  } catch (err) {
    next(err);
  }
};
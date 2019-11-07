const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

    if(!profile){
      return res.status(400).json({msg: 'There is no profile for this user'});

    }
  } catch (err) {
    console.error(err.message);
    res.status.send('Server Error');
  }
});

module.exports = router;
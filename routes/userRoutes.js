
// const express = require('express');
// const User = require('../models/User');

// let userIdCounter = 1;

// const router = express.Router();
// router.post('/register', async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       birthday,
//       gender,
//       password,
//       image,
//     } = req.body;

//     if (req.files && req.files.image) {
//       const imageFile = req.files.image;

//       if (imageFile.mimetype.startsWith('image/')) {
//         image = imageFile.data.toString('base64');
//       } else {
//         return res
//           .status(400)
//           .json({ error: 'Invalid file type. Please upload an image.' });
//       }
//     }

//     const id = userIdCounter++;

//     const newUser = new User({
//       id,
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       birthday: new Date(birthday), // Convert birthday to a Date object
//       gender,
//       password,
//       image,
//     });

//     const savedUser = await newUser.save();
//     res.json(savedUser);
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// router.get('/getUsers', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.delete('/deleteUser/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const deletedUser = await User.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({ message: 'User deleted successfully', deletedUser });
//   } catch (error) {
//     console.error('Error during user deletion:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// router.put('/updateUser/:id', async (req, res) => {
//   const userId = req.params.id;
//   let updatedUserData = req.body;

//   try {
   
//     if (updatedUserData.birthday) {
//       updatedUserData.birthday = new Date(updatedUserData.birthday);
//     }

  
//     const formattedBirthday = updatedUserData.birthday
//       ? `${(updatedUserData.birthday.getMonth() + 1).toString().padStart(2, '0')}/` +
//         `${updatedUserData.birthday.getDate().toString().padStart(2, '0')}/` +
//         `${updatedUserData.birthday.getFullYear()}`
//       : null;

//     const updatedUser = await User.findByIdAndUpdate(userId, { ...updatedUserData, birthday: formattedBirthday }, { new: true });

//     if (updatedUser) {
//       res.status(200).json({ message: 'User data updated successfully', user: updatedUser });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error updating user data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;











const express = require('express');
const User = require('../models/User');

let userIdCounter = 1;

const router = express.Router();
router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      birthday,
      gender,
      password,
      image,
    } = req.body;

    if (req.files && req.files.image) {
      const imageFile = req.files.image;

      if (imageFile.mimetype.startsWith('image/')) {
        image = imageFile.data.toString('base64');
      } else {
        return res
          .status(400)
          .json({ error: 'Invalid file type. Please upload an image.' });
      }
    }

    const id = userIdCounter++;

    const newUser = new User({
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      birthday: new Date(birthday).toLocaleDateString('en-CA'), // Format date as "MM-DD-YYYY"
      gender,
      password,
      image,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/deleteUser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error during user deletion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updateUser/:id', async (req, res) => {
  const userId = req.params.id;
  let updatedUserData = req.body;

  try {
    if (updatedUserData.birthday) {
      updatedUserData.birthday = new Date(updatedUserData.birthday);
    }

    const formattedBirthday = updatedUserData.birthday
      ? `${(updatedUserData.birthday.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/` +
        `${updatedUserData.birthday.getDate().toString().padStart(2, '0')}/` +
        `${updatedUserData.birthday.getFullYear()}`
      : null;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...updatedUserData, birthday: formattedBirthday },
      { new: true }
    );

    if (updatedUser) {
      res
        .status(200)
        .json({ message: 'User data updated successfully', user: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

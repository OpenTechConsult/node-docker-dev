const bcrypt = require('bcryptjs')

const User = require('../models/userModel')


exports.signUp = async (req, res) => {
  const { username, password } = req.body
  
  try {
    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      username,
      password: hashPassword
    })
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  } catch (e) {
    res.status(400).json({
      status: 'fail',
    })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body

  
  try {

    const user = await User.findOne({username})
    console.log(user)

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'user not found'
      })
    }

    //if the user is found we want to compare the password
    const isCorrect = await bcrypt.compare(password, user.password)
    console.log(isCorrect)

    if (isCorrect) {
      res.status(200).json({
        status: 'success'
      })
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'incorrect username or password'
      })
    }

  } catch (e) {
    res.status(400).json({
      status: 'fail',
    })
  }
}


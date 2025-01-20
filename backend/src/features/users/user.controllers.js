import prisma from '../../configs/db.js'

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' })
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({ where: { id } })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch user' })
  }
}

export const createUser = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body
    const newUser = await prisma.user.create({
      data: { username, email, password },
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id, firstName, username, lastName, password, email } = req.body
    const dataToUpdate = {}
    if (firstName) dataToUpdate.firstName = firstName
    if (username) dataToUpdate.username = username
    if (lastName) dataToUpdate.lastName = lastName
    if (password) dataToUpdate.password = password
    if (email) dataToUpdate.email = email
    console.log(dataToUpdate)

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    })

    res.status(201).json(updatedUser)
  } catch (err) {
    res.status(400).json({ error: 'Unable to update user' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.user.delete({ where: { id } })
    res.status(204).end()
  } catch (err) {
    res.status(400).json({ error: 'Unable to delete user' })
  }
}

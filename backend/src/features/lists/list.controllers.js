import prisma from '../../configs/db.js'

export const getLists = async (req, res) => {
  try {
    const userId = req.user.id
    const { sortBy = 'createdAt', order = 'desc', status, search } = req.query

    const validSortFields = {
      newest: { createdAt: 'desc' },
      oldest: { createdAt: 'asc' },
      alphabetical: { name: 'asc' },
      reverseAlphabetical: { name: 'desc' },
      publicFirst: { isPrivate: 'asc' },
      privateFirst: { isPrivate: 'desc' },
      mostItems: { _count: { Items: 'desc' } },
      fewestItems: { _count: { Items: 'asc' } },
    }

    const orderBy = validSortFields[sortBy] || {
      createdAt: order === 'desc' ? 'desc' : 'asc',
    }
    const statusFilter = status ? { status: { in: status.split(',') } } : {}

    const lists = await prisma.list.findMany({
      where: {
        userId,
        OR: search && [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { user: { username: { contains: search, mode: 'insensitive' } } },
        ],
        ...statusFilter,
      },
      orderBy,
    })

    res.json(lists)
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch lists' })
  }
}

export const getPublicLists = async (req, res) => {
  try {
    const userId = req.user.id

    const { sortBy = 'createdAt', order = 'desc', status, search } = req.query
    const validSortFields = {
      newest: { createdAt: 'desc' },
      oldest: { createdAt: 'asc' },
      alphabetical: { name: 'asc' },
      reverseAlphabetical: { name: 'desc' },
      publicFirst: { isPrivate: 'asc' },
      privateFirst: { isPrivate: 'desc' },
      mostItems: { _count: { Items: 'desc' } },
      fewestItems: { _count: { Items: 'asc' } },
    }

    const orderBy = validSortFields[sortBy] || {
      createdAt: order === 'desc' ? 'desc' : 'asc',
    }
    const statusFilter = status ? { status: { in: status.split(',') } } : {}

    const publicLists = await prisma.list.findMany({
      where: {
        isPrivate: false,
        NOT: { userId },
        OR: search && [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { user: { username: { contains: search, mode: 'insensitive' } } },
        ],
        ...statusFilter,
      },
      include: { user: { select: { id: true, username: true } } },
      orderBy,
    })

    return res.status(200).json(publicLists)
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch public lists' })
  }
}

export const getList = async (req, res) => {
  try {
    const { id } = req.params

    const list = await prisma.list.findUnique({ where: { id } })

    if (!list) {
      return res.status(404).json({ error: 'List not found' })
    }
    return res.status(200).json(list)
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch list' })
  }
}

export const createList = async (req, res) => {
  try {
    const {
      name,
      description = '',
      status = 'pending',
      isPrivate = false,
      userId,
    } = req.body

    const newList = await prisma.list.create({
      data: { name, description, status, isPrivate, userId },
    })
    return res.status(201).json(newList)
  } catch (error) {
    res.status(400).json({ error: 'Unable to create list' })
  }
}

export const deleteList = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.list.delete({ where: { id } })
    res.status(204).end()
  } catch {
    res.status(400).json({ error: 'Unable to delete list' })
  }
}

export const updateList = async (req, res) => {
  try {
    const { id } = req.params
    const currentUserId = req.user.id

    const { name, description, status, isPrivate } = req.body
    const author = await prisma.list.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (author.userId !== currentUserId) {
      return res
        .status(403)
        .json({ error: "Unable to update another user's list" })
    }
    const updatedList = await prisma.list.update({
      where: { id },
      data: {
        name,
        description,
        status,
        isPrivate,
      },
    })
    res.status(200).json(updatedList)
  } catch (error) {
    res.status(400).json({ error: 'Unable to update list' })
  }
}

export const deleteAllLists = async (req, res) => {
  try {
    const { userId } = req.params
    await prisma.list.deleteMany({ where: { userId } })
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete lists' })
  }
}

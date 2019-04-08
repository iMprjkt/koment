const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const assert = chai.assert
const should = chai.should

chai.use(chaiHttp)

const url = 'http://localhost:3000'
const requester = chai.request.agent(url)

const server = require('../server')
const app = require('../app')
const db = require('../app/model/db')
const Comment = require('../app/model/comment')
const User = require('../app/model/user')

const CommentRouter = require('../app/routes/comment')
const UserRouter = require('../app/routes/user')

const UserController = require('../app/controller/user')
const commentController = require('../app/controller/comment')

const access = require('../app/middleware/access')

describe('Testing the app', done => {
  const newUser = {
    name: 'Mwangi',
    role: 1
  }

  it('Add new user to database via controller', done => {
    requester
      .post('/users/')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201)
        done()
      })
  })

  const id = 1
  it('Get user from database via controller', done => {
    requester.get('/users/1').end((err, res) => {
      expect(res).to.have.status(200)
      done()
    })
  })

  it('User login via controller', done => {
    requester.post('/users/login/' + id).end((err, res) => {
      expect(res).to.have.status(200)
      done()
    })
  })

  const newComment = {
    comment: 'Lorem Ipsum lorem',
    author: 1,
    created_at: new Date()
  }

  it('Insert a comment to a database', done => {
    Comment.createComment(newComment, (err, res) => {
      expect(res.affectedRows).is.greaterThan(0)
      done()
    })
  })

  it('Get comments by user Id', done => {
    Comment.getCommentByUser(1, (err, res) => {
      expect(res.length).is.greaterThan(0)
      done()
    })
  })

  it('Returns None if User Id has nothing', done => {
    Comment.getCommentByUser('test', (err, res) => {
      done()
    })
  })

  const updateComment = {
    comment: 'Lorem Ipsum Lorem test'
  }

  it('Edit a Comment ', done => {
    Comment.editById(1, updateComment, (err, res) => {
      expect(res.affectedRows).is.greaterThan(0)
      done()
    })
  })

  it(' Deleting a Comment', done => {
    Comment.remove(1, (err, res) => {
      expect(res.affectedRows).is.greaterThan(0)
      done()
    })
  })

  const newComment2 = {
    comment: 'test lorem ipsum',
    author: 2
  }

  it('Add comment to list via controller', done => {
    requester
      .post('/comments/')
      .send(newComment2)
      .end((err, res) => {
        expect(res).to.have.status(201)
        done()
      })
  })

  it('Get comments by author', done => {
    requester.get('/comments/user/1').end((err, res) => {
      expect(res).to.have.status(200)
      done()
    })
  })

  it('Delete a comment from database ', done => {
    requester.delete('/comments/4/1').end((err, res) => {
      if (err) done(err)
      expect(res).to.have.status(200)
      done()
    })
  })
})

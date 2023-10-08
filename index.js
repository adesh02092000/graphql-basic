import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'

import db from './_db.js'

const resolvers = {
  // For entry points
  Query: {
    games() {
      return db.games
    },
    game(_, args) {
      return db.games.find(game => game.id === args.id)
    },
    reviews() {
      return db.reviews
    },
    review(_, args) {
      return db.reviews.find(review => review.id === args.id)
    },
    authors() {
      return db.authors
    },
    author(_, args) {
      return db.authors.find(author => author.id === args.id)
    },
  },
  // For nested Query
  Game: {
    reviews(parent) {
      return db.reviews.filter(review => review.game_id === parent.id)
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter(review => review.author_id === parent.id)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`Server ready at port`, 4000)

const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, {username}) => {
            return User.findOne({username})
            .select('-__v')
            .populate('savedBooks')
        },
        getAllUsers: async () => {
            return User.find({})
            .select('-__v')
            .populate('savedBooks')
        }


    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const token = signToken(user);
            return { token, user }
        },
        saveBook: async (parent, { bookID }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookID }},
                    { new: true, runValidators: true })
                    .populate('savedBooks');
    
                return updatedUser;
            }

            throw new AuthenticationError('You must be logged in')
            
        },
        deleteBook: async (parent, { bookID }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: {bookId: bookID} }},
                    { new: true, runValidators: true })
                    .populate('savedBooks');
    
                return updatedUser;
            }

            throw new AuthenticationError('You must be logged in')
        }
    }
}

module.exports = resolvers;
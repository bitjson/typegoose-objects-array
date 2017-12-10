console.log('Trying to save a User without using the existingMongoose option.')
import * as mongoose from 'mongoose'
import { prop, Typegoose } from 'typegoose'

mongoose.connect('mongodb://localhost:27017/typegoosebug')

class User extends Typegoose {
  @prop() name?: string
}

const UserModel = new User().getModelForClass(User)

console.log('Setup complete.')
;(async () => {
  const u = new UserModel({
    name: 'Gimli'
  })
  await u.save()
  const user = await UserModel.findOne()
  console.log(user)
})()

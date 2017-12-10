import * as mongoose from 'mongoose'
import { arrayProp, prop, Typegoose } from 'typegoose'

mongoose.connect('mongodb://localhost:27017/typegoosebug')

class Inventory extends Typegoose {
  @prop() public id: string
  // @prop() public value?: string
}

class User extends Typegoose {
  @prop() name?: string
  @arrayProp({ items: Inventory })
  public inventory?: Inventory[]
}

const UserModel = new User().getModelForClass(User, {
  existingMongoose: mongoose
})

console.log('Setup complete.')

// UserModel is a regular Mongoose Model with correct types
;(async () => {
  const u = new UserModel({
    name: 'Gimli',
    inventory: [{ id: 'one' }, { id: 'two' }, { id: 'axe' }]
  })
  await u.save()
  const user = await UserModel.findOne()

  // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
  console.log(user)
})()
